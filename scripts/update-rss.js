#!/usr/bin/env node

/**
 * update-rss.js // (fr0st.xyz)
 * [RUN THE SCRIPT WITH : node scripts/update-rss.js]
 * ------------------------------------------------------------------------------------------------------
 * Builds and updates rss.xml from blog/articles.json
 * 
 * NOTE:
 * This script must be run manually or as part of your build step.
 * It does not run automatically in production.
*/

"use strict";

/**
 * NODE IMPORTS
 */
const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");

/**
 * COLORS :)
 */
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    dim: "\x1b[2m",
};

const logInfo = (msg) => console.log(`${colors.green}${msg}${colors.reset}`);
const logWarn = (msg) => console.log(`${colors.yellow}${msg}${colors.reset}`);
const logMuted = (msg) => console.log(`${colors.dim}${msg}${colors.reset}`);

/**
 * PATHS AND CONSTANTS
 */
const REPO_ROOT = join(__dirname, "..");
const ARTICLES_JSON = join(REPO_ROOT, "blog", "articles.json");
const RSS_PATH = join(REPO_ROOT, "rss.xml");
const SITE_URL = "https://fr0st.xyz";
const AUTHOR = "yo@fr0st.xyz (fr0st)";

/**
 * ESCAPE XML SPECIAL CHARACTERS
 */
const xmlEscape = (value) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&apos;");

/**
 * READ AND PARSE ARTICLES.JSON
 */
const parseArticles = () => {
    const raw = readFileSync(ARTICLES_JSON, "utf8");
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
        throw new Error("Articles JSON is not an array.");
    }
    return data;
};

/**
 * PARSE BLOG DATE STRING
 * expected format: Month Day, Year
 */
const parseBlogDate = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.replace(",", "").split(" ");
    if (parts.length !== 3) return null;

    const [monthName, dayString, yearString] = parts;
    const months = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11,
    };

    const monthIndex = months[monthName];
    const day = Number(dayString);
    const year = Number(yearString);

    if (Number.isNaN(day) || Number.isNaN(year) || monthIndex === undefined) {
        return null;
    }

    return new Date(Date.UTC(year, monthIndex, day, 0, 0, 0));
};

/**
 * CONVERT DATE TO RFC 822 FORMAT
 */
const toRfc822 = (date) => date.toUTCString();

/**
 * NORMALIZE DATE TO MIDNIGHT UTC
 */
const toMidnightUtc = (date) =>
    new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0));

/**
 * ENSURE LINK IS ABSOLUTE
 */
const ensureAbsolute = (link) => {
    if (!link) return null;
    if (/^https?:\/\//i.test(link)) return link;
    return `${SITE_URL}/${link.replace(/^\//, "")}`;
};

/**
 * DEFAULT RSS TEMPLATE
 */
const defaultRss = () => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>fr0st.xyz</title>
        <link>${SITE_URL}</link>
        <description>Recent content in fr0st's Webpage</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <managingEditor>${AUTHOR}</managingEditor>
        <webMaster>${AUTHOR}</webMaster>
    </channel>
</rss>
`;

/**
 * LOAD EXISTING RSS FILE
 * falls back to default if missing or invalid
 */
const loadRss = () => {
    try {
        const contents = readFileSync(RSS_PATH, "utf8");
        if (!contents.trim()) {
            return defaultRss();
        }
        if (!contents.includes("<channel>")) {
            return defaultRss();
        }
        return contents;
    } catch (error) {
        return defaultRss();
    }
};

/**
 * EXTRACT EXISTING GUIDS FROM RSS
 */
const extractExistingGuids = (rss) => {
    const matches = rss.match(/<guid>([^<]+)<\/guid>/g) || [];
    return new Set(matches.map((entry) => entry.replace(/<\/?guid>/g, "").trim()));
};

/**
 * INSERT ITEMS INTO RSS CHANNEL
 */
const insertItems = (rss, itemsMarkup) => {
    const itemIndex = rss.indexOf("<item>");
    if (itemIndex !== -1) {
        const before = rss.slice(0, itemIndex).replace(/\s*$/, "");
        return `${before}\n\n${itemsMarkup}\n\n        ${rss.slice(itemIndex)}`;
    }

    return rss.replace("</channel>", `\n\n${itemsMarkup}\n    </channel>`);
};

/**
 * UPDATE RSS LAST BUILD DATE
 */
const updateLastBuildDate = (rss, date) => {
    const formatted = toRfc822(toMidnightUtc(date));
    if (rss.includes("<lastBuildDate>")) {
        return rss.replace(/<lastBuildDate>[^<]*<\/lastBuildDate>/, `<lastBuildDate>${formatted}</lastBuildDate>`);
    }
    return rss.replace(
        "</language>",
        `</language>\n        <lastBuildDate>${formatted}</lastBuildDate>`
    );
};

/**
 * MAIN SCRIPT ENTRY
 */
const main = () => {
    const articles = parseArticles();
    const rss = loadRss();
    const allItems = articles
        .map((article) => {
            const link = ensureAbsolute(article.link);
            const date = parseBlogDate(article.date);
            if (!link || !date) {
                return null;
            }
            return {
                title: article.title || "",
                description: article.description || "",
                link,
                pubDate: toRfc822(toMidnightUtc(date)),
                pubDateRaw: date,
                guid: link,
            };
        })
        .filter(Boolean);

    if (allItems.length === 0) {
        logWarn("No articles found to build RSS items.");
        return;
    }

    /**
     * SORT ITEMS BY NEWEST FIRST
     */
    allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    /**
     * BUILD RSS ITEM MARKUP
     */
    const itemsMarkup = allItems
        .map(
            (item) => `        <item>
            <title>${xmlEscape(item.title)}</title>
            <link>${xmlEscape(item.link)}</link>
            <description>${xmlEscape(item.description)}</description>
            <author>${xmlEscape(AUTHOR)}</author>
            <pubDate>${item.pubDate}</pubDate>
            <guid>${xmlEscape(item.guid)}</guid>
        </item>`
        )
        .join("\n\n");

    const itemsWithTrailingBreak = `${itemsMarkup}\n\n`;
    
    /**
     * REMOVE OLD ITEMS AND INSERT NEW ONES
     */
    let updated = rss.replace(/\s*<item>[\s\S]*?<\/item>\s*/g, "\n\n");
    updated = insertItems(updated, itemsWithTrailingBreak);

    /**
     * UPDATE LAST BUILD DATE USING LATEST ARTICLE
     */
    const latestDate = allItems
        .map((item) => item.pubDateRaw)
        .sort((a, b) => b - a)[0] || new Date();
    updated = updateLastBuildDate(updated, latestDate);

    /**
     * CLEAN UP FORMATTING
     */
    updated = updated
        .replace(/<\/webMaster>\s*<item>/, "</webMaster>\n\n        <item>")
        .replace(/<\/item>\s*<item>/g, "</item>\n\n        <item>");

    if (updated === rss) {
        logMuted("RSS already up to date.");
        return;
    }

    writeFileSync(RSS_PATH, updated, "utf8");
    logInfo(`RSS updated with ${allItems.length} item(s).`);
};

main();
