#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Fill missing Spotify metadata directly in music/music-script.js.
 * Requires SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars.
 *
 * This updates the artistData array in-place:
 * - title, thumbnail, duration if missing
 * - trackCount for albums (total tracks)
 * - trackCount for tracks (1)
 */

const fs = require('fs/promises');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_PATH = path.join(ROOT, 'music', 'music-script.js');

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const colors = {
    dim: '\x1b[2m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    reset: '\x1b[0m'
};

function logInfo(message) {
    console.log(`${colors.green}${message}${colors.reset}`);
}

function logWarn(message) {
    console.log(`${colors.yellow}${message}${colors.reset}`);
}

function logError(message) {
    console.error(`${colors.red}${message}${colors.reset}`);
}

function parseSpotifyUrl(url) {
    if (!url || typeof url !== 'string') return null;
    const cleaned = url.trim();
    const match = cleaned.match(/open\.spotify\.com\/(track|album)\/([a-zA-Z0-9]+)/);
    if (match) {
        return { type: match[1], id: match[2] };
    }
    const uriMatch = cleaned.match(/^spotify:(track|album):([a-zA-Z0-9]+)$/);
    if (uriMatch) {
        return { type: uriMatch[1], id: uriMatch[2] };
    }
    return null;
}

function formatDuration(ms) {
    if (!Number.isFinite(ms)) return '';
    const totalSeconds = Math.round(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (value) => String(value).padStart(2, '0');
    if (hours > 0) {
        return `${hours}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${minutes}:${pad(seconds)}`;
}

async function getAccessToken() {
    if (!CLIENT_ID || !CLIENT_SECRET) {
        logError('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET.');
        process.exit(1);
    }

    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Spotify auth failed: ${res.status} ${body}`);
    }

    const data = await res.json();
    return data.access_token;
}

async function fetchJson(url, token) {
    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        const body = await res.text();
        throw new Error(`Spotify API error ${res.status}: ${body}`);
    }
    return res.json();
}

async function fetchAllAlbumTracks(albumId, token) {
    const tracks = [];
    let nextUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`;
    while (nextUrl) {
        const data = await fetchJson(nextUrl, token);
        tracks.push(...(data.items || []));
        nextUrl = data.next;
    }
    return tracks;
}

function pickImage(images) {
    if (!images || !images.length) return '';
    return images[0].url || '';
}

async function enrichEntry(entry, token) {
    const parsed = parseSpotifyUrl(entry.spotifyUrl);
    if (!parsed) {
        logWarn(`Skipping invalid Spotify URL: ${entry.spotifyUrl}`);
        return entry;
    }

    if (parsed.type === 'track') {
        const data = await fetchJson(`https://api.spotify.com/v1/tracks/${parsed.id}`, token);
        return {
            ...entry,
            title: entry.title || data.name,
            thumbnail: entry.thumbnail || pickImage(data.album?.images),
            duration: entry.duration || formatDuration(data.duration_ms),
            trackCount: 1
        };
    }

    const album = await fetchJson(`https://api.spotify.com/v1/albums/${parsed.id}`, token);
    const tracks = await fetchAllAlbumTracks(parsed.id, token);
    const totalMs = tracks.reduce((sum, track) => sum + (track.duration_ms || 0), 0);
    const trackCount = album.total_tracks || tracks.length || 0;
    return {
        ...entry,
        title: entry.title || album.name,
        thumbnail: entry.thumbnail || pickImage(album.images),
        duration: entry.duration || formatDuration(totalMs),
        isAlbum: entry.isAlbum ?? true,
        trackCount: trackCount || entry.trackCount
    };
}

function serializeJs(value, indent = 0) {
    const pad = ' '.repeat(indent);
    if (Array.isArray(value)) {
        if (!value.length) return '[]';
        const items = value.map((item) => `${' '.repeat(indent + 4)}${serializeJs(item, indent + 4)}`);
        return `[\n${items.join(',\n')}\n${pad}]`;
    }
    if (value && typeof value === 'object') {
        const keys = Object.keys(value);
        if (!keys.length) return '{}';
        const entries = keys.map((key) => {
            const val = value[key];
            const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
            return `${' '.repeat(indent + 4)}${safeKey}: ${serializeJs(val, indent + 4)}`;
        });
        return `{\n${entries.join(',\n')}\n${pad}}`;
    }
    return JSON.stringify(value);
}

async function run() {
    const source = await fs.readFile(SOURCE_PATH, 'utf-8');
    const match = source.match(/const\s+artistData\s*=\s*(\[[\s\S]*?\n\]);/);
    if (!match) {
        logError('Could not find const artistData = [...] in music-script.js');
        process.exit(1);
    }

    const sandbox = {};
    const script = new vm.Script(`result = ${match[1]};`);
    const context = vm.createContext(sandbox);
    script.runInContext(context);

    const data = Array.isArray(sandbox.result) ? sandbox.result : [];
    if (!data.length) {
        logWarn('No artists found in artistData.');
    }

    const token = await getAccessToken();
    let updatedCount = 0;

    for (const artist of data) {
        const songs = Array.isArray(artist.songs) ? artist.songs : [];
        const enrichedSongs = [];
        for (const song of songs) {
            try {
                const enriched = await enrichEntry(song, token);
                if (JSON.stringify(enriched) !== JSON.stringify(song)) {
                    updatedCount += 1;
                }
                enrichedSongs.push(enriched);
            } catch (err) {
                logWarn(`${artist.name}: failed to enrich ${song.spotifyUrl}`);
                logWarn(String(err.message || err));
                enrichedSongs.push(song);
            }
        }
        artist.songs = enrichedSongs;
    }

    const replacement = `const artistData = ${serializeJs(data, 0)};`;
    const updatedSource = source.replace(/const\s+artistData\s*=\s*\[[\s\S]*?\n\];/, replacement);
    await fs.writeFile(SOURCE_PATH, updatedSource, 'utf-8');
    logInfo(`Updated ${updatedCount} song entry(ies) in music-script.js`);
}

run().catch((err) => {
    logError(err.stack || String(err));
    process.exit(1);
});
