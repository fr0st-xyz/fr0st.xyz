/**
 * MUSIC-SCRIPT.JS
 * ----------------------------------------------------------------------
 * Handles functionality for the music.html page
*/

import '/src/js/components/base.js';

const LANYARD_USER_ID = '805553723597389866';
const LANYARD_API_URL = 'https://api.lanyard.rest/v1/users';
const LANYARD_SOCKET_URL = 'wss://api.lanyard.rest/socket';
const DEFAULT_NOW_PLAYING_ART = '/src/media/PFPs/pfp-2.png';
const LISTENING_DISPLAY_NAME = 'fr0st';
const SPOTIFY_PROFILE_URL = 'https://open.spotify.com/user/sfz4qpew7rrx9e4tgacwlig9l';
const LANYARD_CARD_CACHE_KEY = 'music:lanyard-card-state';
const LANYARD_LOADING_DELAY_MS = 220;
const LANYARD_OFFLINE_DELAY_MS = 1200;

const ARTIST_CONFIG = {
    "$uicideboy$": 287,
    "Stromae": 40,
    "Bakar": 45,
    "fakemink": 67,
    "Artemas": 54,
    "Killa Fonic": 116,
    "Mareux": 27,
    "Joji": 38
};

const artistData = [
    {
        name: "$uicideboy$",
        popularSongs: [
            {
                title: "Antarctica",
                videoUrl: "https://files.catbox.moe/ovuw6x.mp4"
            },
            {
                title: "1000 Blunts",
                videoUrl: "https://files.catbox.moe/pgf22d.mp4"
            },
            {
                title: "And to those i love thanks for sticking around",
                videoUrl: "https://files.catbox.moe/u8wdc1.mp4"
            },
        ],
        songs: [
            {
                title: "THY WILL BE DONE",
                spotifyUrl: "https://open.spotify.com/album/28YFhAjRnmhlhKIuTupUv2?si=-nVLjZKcQqCnlnyYxMd2UQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f1b0aaa9ec3c0c71766721d0",
                duration: "29:46",
                isFavorite: false,
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "THY KINGDOM COME",
                spotifyUrl: "https://open.spotify.com/album/7HxLze2RiYrM9f2un8HZUp?si=M8-Do8eNSgiGVAOE9DodaA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f5ce8190f3b88f7825dad11d",
                duration: "29:02",
                isFavorite: false,
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "New World Depression",
                spotifyUrl: "https://open.spotify.com/album/1lKWIQuLHxdlifTuudutTl?si=bSqMB7I-TyO_oVYcCu_04g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27335d777c5fa4a353b87ad62bd",
                duration: "34:15",
                isFavorite: false,
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Sing Me a Lullaby, My Sweet Temptation",
                spotifyUrl: "https://open.spotify.com/album/3elJRIffdqvypuxoDND2Q3?si=Px-YbeMqS9G5sR4AtzJIMQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273db20089661aff3a8070600ca",
                duration: "36:06",
                isFavorite: false,
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Long Term Effects of SUFFERING",
                spotifyUrl: "https://open.spotify.com/album/3dgsCZMswt6TWbsKcMgoO2?si=ms58UH3OQnew4GiNreUa_g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b25093d7ccdce4a848988f9e",
                duration: "33:02",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Stop Staring At the Shadows",
                spotifyUrl: "https://open.spotify.com/album/7rKmLxCFlmtIxGpX4HYgs4?si=otKn7o6NTm2QKexZdRZJSw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273e2bab14ce82f78a4160376a1",
                duration: "26:07",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "I Want to Die In New Orleans",
                spotifyUrl: "https://open.spotify.com/album/2ivOxIKDHxEo6WMD9m3ytn?si=9XV3uzX-TK6u5e9QBKf6cQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2739db03c8368f127291ced4263",
                duration: "42:29",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Eternal Grey",
                spotifyUrl: "https://open.spotify.com/album/2hAoB9uIsHVFABuuOREFmB?si=XzhaDkJ7Q_-a0RnbSfkQYw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27309c67f4a00626c5dfacbdf6f",
                duration: "31:06",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Dark Side of the Clouds",
                spotifyUrl: "https://open.spotify.com/album/3blujlZ2W1BZAM9KcHrbP8?si=CJ5YjIC_ROeH9qcmq2K_xA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27354c0c1ea300d471e9eb90ae9",
                duration: "25:31",
                isObsessed: true,
                isAlbum: true
            },
            
            {
                title: "Grey Sheep II",
                spotifyUrl: "https://open.spotify.com/album/1aVnxqszPG45yn2nFsVQRS?si=USs-O-5QQ4-P9-l6pQe4-Q",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738abb1b7abadd031c551aaa8c",
                duration: "16:15",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Now the Moon's Rising",
                spotifyUrl: "https://open.spotify.com/album/12RWpV5WUjYo4SisuFWMNK?si=o6XMttVYQKShed5LZZSN8g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273eede8ca62134dd7bdecb6085",
                duration: "20:07",
                isFavorite: false,
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "My Liver Will Handle What My Heart Can't",
                spotifyUrl: "https://open.spotify.com/album/2VrpzWjnsiELWKXOJAFhme?si=-XovTpmARoSfnqDX8zY5YA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273dcff3103179d992594a227db",
                duration: "29:22",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Grey Sheep",
                spotifyUrl: "https://open.spotify.com/album/3bZ9pTGwh1vPskRRf9uymq?si=e8pRCax1RQS5BIrJfiqFgA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737e977572c5271666dc76cb9a",
                duration: "14:51",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "High Tide in the Snake's Nest",
                spotifyUrl: "https://open.spotify.com/album/7gMzKwKAsbooGeKgDlX2TL?si=2-2cCMUASguifBu6Qkkvnw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2739170408b39b66a6185f6534a",
                duration: "25:51",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "YUNGDEATHLILLIFE",
                spotifyUrl: "https://open.spotify.com/album/4CUUYKJvxsH5E18kkPQofa?si=AOw1ahp_QC63go24KkpDkg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27308459c90026555f846559fcc",
                duration: "28:03",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "7th or St. Tammany",
                spotifyUrl: "https://open.spotify.com/album/4BqLJSu0S1KEsA6DBbJ9L4?si=tU7kB5xMRVyQLD0jqNgZOw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2732417400ddf7445276814eeb6",
                duration: "27:40",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Gray/Grey",
                spotifyUrl: "https://open.spotify.com/album/3uOjCKXJFyF5hbWz7mGYrr?si=vi9Bpy5qRvmcXzHt8L5rQQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273828e3c89d67979fc678be0bb",
                duration: "39:33",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "YIN YANG TAPES: Summer Season (1989-1990)",
                spotifyUrl: "https://open.spotify.com/album/6hRJl2spj8CQ7PRLdyNc3f?si=0W_tPYYOSn2HJd_HCzY1Vw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2732889122750969ea1da920379",
                duration: "12:24",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "I No Longer Fear The Razor Guarding My Heel (V)",
                spotifyUrl: "https://open.spotify.com/album/5HV1423uFq5uNui7tZBBas?si=WGndD6Q9Q7uBOzdGHym_Aw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2739ae2d5f3220065aaf33ad145",
                duration: "7:34",
                isFavorite: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part I: The $uicide Saga",
                spotifyUrl: "https://open.spotify.com/album/4g8hUhboWsPGn0mzRWtneS?si=xUbcLgfHTTqwLUKEakD5sg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2739f84f46d5f97a954ded6d079",
                duration: "17:29",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part II: The Black Suede Saga",
                spotifyUrl: "https://open.spotify.com/album/160wKL8ToSj86SmU6yF9bQ?si=10DW6zLtSxWx8YrQZpdkGg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27375404246c0f6d2f9985355cb",
                duration: "7:53",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part III: The Budd Dwyer Saga",
                spotifyUrl: "https://open.spotify.com/album/763MgGtSgjC4mRxGKU7MPX?si=7Mh-m5tYSLmTA7YVN5qmHA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2731ff638d8a65327699aa79dba",
                duration: "18:13",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part IV: The Trill Clinton Saga",
                spotifyUrl: "https://open.spotify.com/album/1CfmjMXQtYDHMN3MzkTCkP?si=FCbZh_6vSmKCMxMYN-Smww",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fbc974279c3da95e37a6fae1",
                duration: "16:05",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part V: The Fuck Bitches, Get Death Saga",
                spotifyUrl: "https://open.spotify.com/album/3u6Hj5bT6hDGQyJFTY3H5O?si=majSyCWVQqGi17JibwUiag",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27318fd4eff60ddd70c3fdc67d8",
                duration: "11:33",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part VI: The Tsunami Saga",
                spotifyUrl: "https://open.spotify.com/album/6I7fZ1MfvXz38j2qSmxshv?si=QxE7fNiVTIuIDkAxX_a33g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273547dd05a3c59de38fe62dd32",
                duration: "17:12",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part VII: The Fuck God Saga",
                spotifyUrl: "https://open.spotify.com/album/76xmioDynjnDufXs3KUmdP?si=3q9ns1utSH2fvcxautBwRQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a7c1f1dca26c7ccf25d26cb9",
                duration: "18:41",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "KILL YOURSELF Part VIII: The Seppuku Saga",
                spotifyUrl: "https://open.spotify.com/album/5zM8f8uilt4a77oZUZ4zVp?si=mRhJ84lZQJeVFRy9SjOLDg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ceca1161551919e6c572292d",
                duration: "9:53",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part XII: The Dark Glacier Saga",
                spotifyUrl: "https://open.spotify.com/album/0Jbf4eYSaqLj4OW0xCrJlj?si=8JtSVk4_QOGP53v77aAwaA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b53ec3f3f09f8b19a5e0235d",
                duration: "6:15",
                isFavorite: false,
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part XIII: The Atlantis Saga",
                spotifyUrl: "https://open.spotify.com/album/1jDAnHgqCfYMNsRj63Dd7u?si=rvNxF1V9R16BaqwiFQowbA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27307bba1f8abbeb68e5d0c3477",
                duration: "6:57",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part XVI: The Faded Stains Saga",
                spotifyUrl: "https://open.spotify.com/album/1VJbqV5tHd4wP7n5iJhYIY?si=z07FWj42RI23FUQ2fe4BsA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273af1033945c0e113118ec5e05",
                duration: "7:12",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part XVIII: The Fall of Idols Saga",
                spotifyUrl: "https://open.spotify.com/album/0EvGBNEwjHND7km7tRuctQ?si=kzBdHiZORaasd7XpbpXDYw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734a4885ff6a0c0d4ca9c299a7",
                duration: "6:12",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "KILL YOURSELF Part XIX: The Deep End Saga",
                spotifyUrl: "https://open.spotify.com/album/6zFDOD1SXs27ERSlm1q7kY?si=FA1TZ6n9TDC1fkUQZuGy0w",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273949dea13d2de4215e8c16314",
                duration: "6:03",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "I No Longer Fear the Razor Guarding My Heel",
                spotifyUrl: "https://open.spotify.com/album/5QvM8XR1GooXrA7TgIr6Ok?si=BWy1FgQARKSGw1gfQINg3g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273774096669395b9d64fa2fcbe",
                duration: "7:08",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "I No Longer Fear the Razor Guarding My Heel (II)",
                spotifyUrl: "https://open.spotify.com/album/4mPlRdH5ZL0BppctJqjVoR?si=cBccvEvlTdS2YFjl1Okq_Q",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273bf0108d97740e68e4d4c4b49",
                duration: "6:59",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "$outh $ide $uicide",
                spotifyUrl: "https://open.spotify.com/album/1p8YahLiju8skFYWBJTEOl?si=zeILctIfTqWihD2rZ6dgDA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a3abea866819645928a0b3f2",
                duration: "16:01",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Radical $uicide",
                spotifyUrl: "https://open.spotify.com/album/1W7VBnHCvLa2cG9yWZT52t?si=8QtXjj9bSJWV2mYSDpU50Q",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273993b06c184a1f8ee1f070cbe",
                duration: "10:17",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Black $uicide",
                spotifyUrl: "https://open.spotify.com/album/3ZGK4y6cOXAsWYO9bYAYDm?si=25HIAVKOTWqlDGXBiB51kg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273d060318e0c8cb5730a215386",
                duration: "18:40",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Black $uicide Side C: The Seventh Seal",
                spotifyUrl: "https://open.spotify.com/album/2kx2zE6RYdyZ1IRhVz70xC?si=kj1C0oAGRd2ezjYfOn04mg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27348fc9636a3877a1f9bf7e39f",
                duration: "15:23",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "G.R.E.Y.G.O.D.S.I.I.",
                spotifyUrl: "https://open.spotify.com/album/5JPMrbyhWdReHLXNa0V1Vs?si=4kXn1P5HRCSG0udZxnGaDQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273cca7bd4bd84247cbe790ca3b",
                duration: "15:54",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Antarctica",
                spotifyUrl: "https://open.spotify.com/album/2uSbIkeZ2TszTDfbzmkhyL?si=sjZJkCzoSF6ysAstdeqorA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fed01cae4350805103c24cc7",
                duration: "2:06",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Soul",
                spotifyUrl: "https://open.spotify.com/track/2XlfXMpWi3d07qmfmouX6x?si=7d32e0bb15d54f4d",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2731bd6fcff112891502437b2c0",
                duration: "3:47",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Dipped In Gold",
                spotifyUrl: "https://open.spotify.com/track/1ZPyyeKeh7rhHNS7A9jdUC?si=c4b7f70705b9480b",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273d52f151073399d6f02a5a265",
                duration: "2:32",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "I Can't Fold (feat. $uicideboy$)",
                spotifyUrl: "https://open.spotify.com/track/6tFF3vvVVYSHJahwBEQwly?si=d0ccc150062a40c0",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734f18aa99bf9119df5acf6fdc",
                duration: "3:10",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Scrape",
                spotifyUrl: "https://open.spotify.com/album/3sgiP6GpKFy0Vo1TzVjcDo?si=jUIVk51HTj26ExZeHbOvrA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738bd49fc9d49f8251ba58b1a2",
                duration: "1:43",
                isObsessed: true,
            },
            {
                title: "HUNG UP ON THE COME UP",
                spotifyUrl: "https://open.spotify.com/album/3EfQ14xG8NNIakzIn8h2ar?si=Kqb1W79DT0WNudIP8bmRxA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273eeb83ddd0fcfe67cb08284b7",
                duration: "1:29",
                isObsessed: true,
            },
            {
                title: "Either Hated or Ignored",
                spotifyUrl: "https://open.spotify.com/album/3EjT7eLhdQ4VqlJFSJVHOZ?si=iDocb8s-Trmrl_pwe7MfjQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273d7fa82ff4010814fac7c3170",
                duration: "2:33",
                isObsessed: true,
            },
            {
                title: "FUCKALLOFYOU2K18",
                spotifyUrl: "https://open.spotify.com/album/5tNhTXfldKPoTERG8BUoXa?si=RjYG3BvtTJuXdXFDSqvL-A",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ffa5895a19d8b40082967f54",
                duration: "1:58",
                isObsessed: true,
            },
            {
                title: "Psychedelic $uicide",
                spotifyUrl: "https://open.spotify.com/album/3MIm3KXRmdu7U5yS1LzRq5?si=V9O4xcR8Q-KzzPfvLsV-4A",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a43a24ee7c3e0c4692f9869a",
                duration: "3:03",
                isObsessed: true,
            },
            {
                title: "Suicide Bay",
                spotifyUrl: "https://open.spotify.com/album/1ySIijavk4gdqDTeBPiVOz?si=y5CXcAmeScGenIysWaWQsQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27332a223ef2d3552ce538b4697",
                duration: "3:40",
                isObsessed: true,
            },
            {
                title: "G Double O D",
                spotifyUrl: "https://open.spotify.com/track/3AFjeh1izw06u17JBeRoej?si=a0305eaed3e14708",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273af484517eba8aba63d95c894",
                duration: "5:54",
                isObsessed: true,
            },
        ]
    },
    {
        name: "fakemink",
        popularSongs: [
            {
                title: "LV Sandals",
                videoUrl: "https://files.catbox.moe/k3u8mu.mp4"
            },
            {
                title: "Music and Me",
                videoUrl: "https://files.catbox.moe/o04951.mp4"
            },
            {
                title: "Easter Pink",
                videoUrl: "https://files.catbox.moe/1tfmaa.mp4"
            },
        ],
        songs: [
            {
                title: "London's Saviour",
                spotifyUrl: "https://open.spotify.com/album/5SknXhmjHijD0uU1Pm2HBr?si=lLVMZyXBTGenP_ETjgppIg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273e09e5aed7d747f5692b183ea",
                duration: "21:20",
                isObsessed: true,
                isAlbum: true,
            },
            {
                title: "Wild One",
                spotifyUrl: "https://open.spotify.com/album/6GOsZS2XRJeJwxk0l3AFJ3?si=EYW5MMmjT-Cruwn7Vknv_g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2736bea1667b951efcc4eeda596",
                duration: "9:03",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Furever",
                spotifyUrl: "https://open.spotify.com/album/3p39fzFsJMJ9mvZM6mLeZE?si=S6rJYrF7RE61Ho0bFj-jkw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27365d692dc8d1f6ed03c28df1e",
                duration: "9:33",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "real hospitality",
                spotifyUrl: "https://open.spotify.com/album/4DvoSlOZQXlWbxpqcFvOHB?si=PiC6sXBiS_24KBthr2gElA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b5edc7253e7b97a8a99bf9ec",
                duration: "7:36",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Disco Biscuit",
                spotifyUrl: "https://open.spotify.com/album/1VtFAfp7IW8lvjbS6UQnQH?si=tSiVtU34Tmqd8y7wTHzFdQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2735a833d896ab915ebc7bd77aa",
                duration: "3:54",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Galaxy Pavillion Club",
                spotifyUrl: "https://open.spotify.com/album/028BlkCXx1oCcwO1zyWKRq?si=cVYSfS_4RCm1GiubKuKF4Q",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ad1286a98b860e02daf5881b",
                duration: "3:41",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Music and Me",
                spotifyUrl: "https://open.spotify.com/track/23c1TrkpPPYOcJT6DYRRPH?si=79790c9203024bf1",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27336a8fb79afac6c3b25274dd3",
                duration: "2:06",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Easter Pink",
                spotifyUrl: "https://open.spotify.com/track/5GI8S1pM7nbGHyZUUIpE1k?si=362fed0d23a547c3",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fe3b5fe7b2b624c60bcbfa54",
                duration: "1:24",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Pink Picasso",
                spotifyUrl: "https://open.spotify.com/track/7EXrmPagZvHUMdkdPkBNCF?si=c76724b8249f42f9",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738cb2486628de0d69abbeb20e",
                duration: "1:49",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Oud For Greatness",
                spotifyUrl: "https://open.spotify.com/track/2Vu17e6VBkrLDiJmcseOCP?si=6ea1c632f1724312",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2731638df4d3ab841d8f8b93926",
                duration: "2:18",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Sniffany",
                spotifyUrl: "https://open.spotify.com/track/75UJPRNbkeryVR9aBcJQQ2?si=27da46587d0a46a1",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27346df2dd19d9b7204bd120465",
                duration: "1:28",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Posh That",
                spotifyUrl: "https://open.spotify.com/track/0fBlelJkTI3s90u9dJitu1?si=e58594f02b2b4cd0",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27344b5bfb0c0c2b4dc13b82bc0",
                duration: "1:47",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Lemon Cherry Escort",
                spotifyUrl: "https://open.spotify.com/track/2HypQV2tkWKeIMpw8z4jKj?si=a44a1b2042df405a",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273789a97fd002a664ba3697cfa",
                duration: "1:13",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "War Clothes",
                spotifyUrl: "https://open.spotify.com/track/5A2HshnXVxzjxxAGRbF6jV?si=35e0673d2d34469f",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ebe58edcbb93e0845a60e725",
                duration: "1:37",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "MAKKA",
                spotifyUrl: "https://open.spotify.com/track/4JxgNwic9PMF1c87TKWZOr?si=922de3cabc3b4e27",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27365ee509885af9d1e59ed7b55",
                duration: "3:00",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Under Your Skin",
                spotifyUrl: "https://open.spotify.com/track/7GCI295l4PvM9TmVhlxRWH?si=93de65117ca74241",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f55a61f09473a7870bafe5a4",
                duration: "2:12",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "HEY",
                spotifyUrl: "https://open.spotify.com/track/5RyF6ZV16RS8vdQ7fbj5W7?si=95ccff9c55d84d55",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273c38ed139c09b4c3abaf54759",
                duration: "2:02",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Im Just Bait",
                spotifyUrl: "https://open.spotify.com/track/61PzpWoMXezcYZgAZsjfkh?si=d44aa96194304f70",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a745c12224dc9b4adc7a7069",
                duration: "2:25",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "YM",
                spotifyUrl: "https://open.spotify.com/track/4x9jR1Df5vHzzzZ056luDI?si=83ee2311bb834968",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2736c09e8c5ed893cf6a74c7bb9",
                duration: "2:11",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "MEDICINE",
                spotifyUrl: "https://open.spotify.com/track/5ktWHguGn8B6Jko3Cvgvm2?si=f227df982b8f4105",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ba1e27ed395f2f08be17ef63",
                duration: "2:34",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Die Till You Live",
                spotifyUrl: "https://open.spotify.com/track/502OTzPyXSd6F9K9kyWSdr?si=740e5e36042c4a20",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2736cb4fc86aaca0feb6ff3cd7d",
                duration: "2:29",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "FREEBASE",
                spotifyUrl: "https://open.spotify.com/track/1viuAfTMyesN3b04zhdkuj?si=34c0d2419e0d4069",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273e2bcd8692a00defd17058dbe",
                duration: "2:04",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Hi, I'm blessed",
                spotifyUrl: "https://open.spotify.com/track/1aexU3MIX3vYkglStDTp5L?si=c526a335be3c4c9a",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27318b065809312f78f248e5585",
                duration: "2:03",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Royal",
                spotifyUrl: "https://open.spotify.com/track/7yB0hhS6QZGxNOhH4Rp1PB?si=d3e447f2f0f34d12",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273961e4a23cf4c82e0a93cc823",
                duration: "2:27",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Naughty Or Nice",
                spotifyUrl: "https://open.spotify.com/track/1lAaYJeGy1m0eAaQ8ujbxA?si=6cc2a4cfbf5a4608",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737fdbec1b46530a487ae591e6",
                duration: "1:23",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Face to Face",
                spotifyUrl: "https://open.spotify.com/track/4u3Aajaq6TYC9tElKr3p6C?si=b30d8a8a49a141c5",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2731850700c85d1ecbdc44b4834",
                duration: "1:36",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Die Today",
                spotifyUrl: "https://open.spotify.com/track/40ZGkmvAePnYUf2K9R1rYe?si=cf757d357e644d34",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b0dab9b23af15dda4d0c8e57",
                duration: "1:27",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Not Today",
                spotifyUrl: "https://open.spotify.com/track/5aFBpbLefB4up5oShA5SfZ?si=1f776c37a5bf403d",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273010b662c4102be0b1faa295a",
                duration: "1:25",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Fur Coat Life",
                spotifyUrl: "https://open.spotify.com/track/6tUdNGR3a1GS6gdjQ5FYR3?si=c898b36ccf234344",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273209ecd392ad312f8a01fe0fd",
                duration: "1:18",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "RS11",
                spotifyUrl: "https://open.spotify.com/track/3JH8j6UAmbWLfU5lt2Ur7S?si=d1660fd76afc4c50",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27383388e11b7471d9300b943ec",
                duration: "1:58",
                isObsessed: false,
                isFavorite: true,
                isAlbum: false,
            },
            {
                title: "Heartbroken",
                spotifyUrl: "https://open.spotify.com/track/2XdKhEeM6XzUfNCS20fp9I?si=e44b704e9d0742a8",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fb003a8c08347ec1aaaacaa5",
                duration: "1:05",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Little",
                spotifyUrl: "https://open.spotify.com/track/6Ef8NJCHxj1K6MF21sgLId?si=37b5754c5feb497a",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27371724991003a840416544876",
                duration: "3:57",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "I'm So Peng",
                spotifyUrl: "https://open.spotify.com/track/6Ef8NJCHxj1K6MF21sgLId?si=37b5754c5feb497a",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738a90bdf8f619f33aec1a521c",
                duration: "1:30",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Mink",
                spotifyUrl: "https://open.spotify.com/track/0Xj0caImLW8nYBjumTxIeI?si=5395a7a273644c33",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2730b9c9e45606f2e812588b817",
                duration: "1:57",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Oreoz",
                spotifyUrl: "https://open.spotify.com/album/0BcniNIrsS6hCmlqD8swxg?si=cNZmHp31Qq-QiZnwplJi9g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ad43bf08c3540e0d09e86848",
                duration: "0:52",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Nobody",
                spotifyUrl: "https://open.spotify.com/track/5cShcGVc2tl7WMs9G3z6Pl?si=5465a9da85b44d11",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27374b41684d4163ed0e37368bc",
                duration: "2:13",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Bhad Bhabie 2",
                spotifyUrl: "https://open.spotify.com/track/3N2zXVYFixTfR0d2qqKCRk?si=b39b618e368c4f0e",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734ee519a99bd6104ad86d4cd9",
                duration: "2:01",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Dust Freestyle",
                spotifyUrl: "https://open.spotify.com/track/5gyqC50TOXElAEFEXXlcFS?si=b4af45e361b74c9c",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27397bdd924a8829fd6f713d0db",
                duration: "1:32",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Lemon",
                spotifyUrl: "https://open.spotify.com/track/1vuKGI7LzJ4Sw6XT9bf0PL?si=e1a51f9c672f423b",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273cf5ea17b1fd2e3af7e8d94bb",
                duration: "1:32",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "PillowFight",
                spotifyUrl: "https://open.spotify.com/track/4bGWL6Z9f9BCmgJtLpnX6Y?si=411206231dca4774",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273dcf9cbb0b92b61bd594a1189",
                duration: "1:56",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Bambi",
                spotifyUrl: "https://open.spotify.com/track/2BxJeHSwr1F9TO9H3Kh6Fa?si=832f132615e2481e",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2732c50165392d7defcd85fc313",
                duration: "1:58",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Kacey Lola",
                spotifyUrl: "https://open.spotify.com/track/53ck6FTnVsYUPN2FZCa48W?si=007ff214a8d34b30",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f24dd13791ef59d8b5028c44",
                duration: "1:36",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "So Blown",
                spotifyUrl: "https://open.spotify.com/track/3UXkuCTQzSrlv9WhP4UbDs?si=e312e441295c442e",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273d1d1110baf33ef43b8036814",
                duration: "1:15",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Dont Look Back",
                spotifyUrl: "https://open.spotify.com/track/4JXZkPUttjXHCNyseaISXc?si=e052fb0cddfc438f",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f2a8a70dabcba2d333e0eb87",
                duration: "1:15",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "I'm Dead",
                spotifyUrl: "https://open.spotify.com/track/5tEmmUGSNwdYrrnsyqyMie?si=86391ba3199b4fd5",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27324d81de4e6e7ffac1829e9a4",
                duration: "2:33",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Milk",
                spotifyUrl: "https://open.spotify.com/track/5J5Tw78xBk5YoALN83OQXM?si=a070f59a5bde47f1",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737af7fb772ed154bceb06c3d1",
                duration: "1:45",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Tropical Remix",
                spotifyUrl: "https://open.spotify.com/track/2LE68RMpXjzqHiiFrF7zSP?si=ce73cc7fcc664db5",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2730871783de5e014c604c15e02",
                duration: "1:43",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Wookies",
                spotifyUrl: "https://open.spotify.com/track/0AQdSEdjRLeswiMTySKWjy?si=2be62bca87074a48",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27348cd382a6032d8c1afad5b93",
                duration: "2:04",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Same Mistakes",
                spotifyUrl: "https://open.spotify.com/album/4Ej4bhQqg7rJyFXI2hyXSG?si=Bhto9XUvTZ-0zFadbNpPxg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a71618c1fa49306653d7def9",
                duration: "1:09",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Chipped Tooth Ballerinas",
                spotifyUrl: "https://open.spotify.com/track/263szbVO9ISHklmrIXRfTX?si=4f05f11072e543f5",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2733db6870bc72c8cbdaa3d2c39",
                duration: "1:56",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Exotic Pop",
                spotifyUrl: "https://open.spotify.com/track/5mMdmnfJSagNBqoAJKNIvn?si=7d524863686e49f1",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b376d02efa0a477359ab8801",
                duration: "1:55",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Slurricane",
                spotifyUrl: "https://open.spotify.com/track/61hzhp8mv2RFxVXau1iWP4?si=54587ca28b2f4f16",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2733d25002432da3f08796f3b39",
                duration: "1:46",
                isObsessed: true,
                isAlbum: false,
            },
            {
                title: "Plush",
                spotifyUrl: "https://open.spotify.com/track/5zADr1jL9WfNrnZ1k0GnWj?si=85210445d8d44860",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273e9a31dec46f6d19c1261e719",
                duration: "2:54",
                isObsessed: true,
                isAlbum: false,
            },
        ]
    },
    {
        name: "Stromae",
        popularSongs: [
            {
                title: "Papaoutai",
                videoUrl: "https://files.catbox.moe/rascbo.mp4"
            },
            {
                title: "Alors on danse",
                videoUrl: "https://files.catbox.moe/ycp9xr.mp4"
            },
            {
                title: "tous les mêmes",
                videoUrl: "https://files.catbox.moe/anbbl6.mp4"
            },
        ],
        songs: [
            {
                title: "Cheese (2010)",
                spotifyUrl: "https://open.spotify.com/album/4kEbcH3VT6NYfpv8Wkkk80?si=WfLz0kPnS7SA3pPcvH5Apw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ae373174b14e3eac81554402",
                duration: "41:55",
                isObsessed: true,
                isAlbum: true,
            },
            {
                title: "Racine Carrée (2013)",
                spotifyUrl: "https://open.spotify.com/album/6uyslsVGFsHKzdGUosFwBM?si=YjVtBXvbRICIciGcKoQwgw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273ab580fab750cc9baf0d52b5c",
                duration: "45:31",
                isObsessed: true,
                isNostalgic: true,
                isAlbum: true
            },
            {
                title: "Multitude (2022)",
                spotifyUrl: "https://open.spotify.com/album/6EwTLRHMROD853Kv1lAMex?si=RBMfZFvnTyyenywowgLG1Q",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2736af3a93773dcb59a67ab2953",
                duration: "38:53",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Ma Meilleure Ennemie",
                spotifyUrl: "https://open.spotify.com/track/2LwsunYgfRoqyIsNtgOCQx?si=c4b3ac7773184a55",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734aaf2413384c1efcc38353c6",
                duration: "2:28",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Pardon",
                spotifyUrl: "https://open.spotify.com/track/053gEEIZpXxEOpIycmlyqA?si=83a1faf0aeae42d3",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27393415428cdab6268718079bf",
                duration: "2:53",
                isObsessed: true,
                isAlbum: false
            }
        ]
    },
    {
        name: "Bakar",
        popularSongs: [
            {
                title: "Hell N Back",
                videoUrl: "https://files.catbox.moe/si3pb8.mp4"
            },
            {
                title: "Big Dreams",
                videoUrl: "https://files.catbox.moe/pmxt92.mp4"
            },
            {
                title: "The Mission",
                videoUrl: "https://files.catbox.moe/3p7r99.mp4"
            },
        ],
        songs: [
            {
                title: "Halo",
                spotifyUrl: "https://open.spotify.com/album/3xGVAgbCAxl2c40vRVRjoe?si=1pj4fmk4TCuV77avcXlLRw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2736f61ea5fff15872b314468e8",
                duration: "34:04",
                isObsessed: true,
                isAlbum: true,
            },
            {
                title: "Nobody's Home",
                spotifyUrl: "https://open.spotify.com/album/231jpal5NKt2c1QFN1D6AZ?si=uqTrq5FpTBGFssi6uzCviA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273388fbcd53f6d4647cbf10451",
                duration: "47:40",
                isObsessed: true,
                isAlbum: true,
            },
            {
                title: "Badkid",
                spotifyUrl: "https://open.spotify.com/album/2QaQGxQuEV9hZYMhpS6Zax?si=bCLrennDTX-ZQgffMyixTQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fe7dd6de1fa0853b5a0701a9",
                duration: "29:38",
                isObsessed: true,
                isAlbum: true,
            },
            {
                title: "Will You Be My Yellow?",
                spotifyUrl: "https://open.spotify.com/album/12nH1R4NqEtaOQ5M7RA63p?si=ml9UywqfS-yRaELDYCiJOw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2735bbe47313dfc5a6d6249a487",
                duration: "15:54",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Chill",
                spotifyUrl: "https://open.spotify.com/album/4Pj5Ytw6QtM5lPJSZnpII7?si=A-b-14Z2TWOcw4T7FbENMA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737c1ca5a38521b23b0c15f99c",
                duration: "6:00",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Small Town Girl",
                spotifyUrl: "https://open.spotify.com/track/7tbpHQMGcySPP07HlhWcBQ?si=88d374fb2f004a44",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a86d416227e9aeb68255e9f0",
                duration: "3:05",
                isFavorite: true,
                isAlbum: false
            }
        ]
    },
    {
        name: "Artemas",
        popularSongs: [
            {
                title: "i like the way you kiss me",
                videoUrl: "https://files.catbox.moe/54tu4x.mp4"
            },
            {
                title: "if u think i'm pretty",
                videoUrl: "https://files.catbox.moe/a1bix7.mp4"
            },
            {
                title: "cross my heart",
                videoUrl: "https://files.catbox.moe/9ywdg5.mp4"
            },
        ],
        songs: [
            {
                title: "yustyna",
                spotifyUrl: "https://open.spotify.com/album/5nzSCZ7NhKvAysI0tmNOdD?si=M0EZRBCUSua9H75nwewu5g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738fe69d8df304ff053693653e",
                duration: "34:29",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "pretty",
                spotifyUrl: "https://open.spotify.com/album/2xpgb8R0BXVS2e1XnXI9xZ?si=eygM_mECR-OWnO7SXRD7Wg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273fabe0943f6dd962a792b42a1",
                duration: "30:13",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "LOVERCORE",
                spotifyUrl: "https://open.spotify.com/album/75FM00r9Lgdi0YHv7vvzzB?si=Ivzb56nEQAWVnMSdeZ6aVQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273da3289aebc6af6e12d089c6d",
                duration: "35:54 ",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "southbound / test drive",
                spotifyUrl: "https://open.spotify.com/album/4Uh9XOh5hmX0Cw7JREc0AU?si=6PmDrvWZT8yLo9uC5dqC3A",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738ae0235c22283aa1a54ddfb2",
                duration: "5:26 ",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "i guess u never really cared about me",
                spotifyUrl: "https://open.spotify.com/track/2hyyp0mZc5QFY5YQeyv7oP?si=aced79247a6a4bac",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27350dc97f510a52976be03de1f",
                duration: "3:11 ",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "fancy / xvideos",
                spotifyUrl: "https://open.spotify.com/album/073p1oabjQBPOYrAMWOrge?si=Gr9ZL-wkQTW3Tr0K3zQSiQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a5d1584c74776a69ad4991cc",
                duration: "4:04 ",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "So Stunning",
                spotifyUrl: "https://open.spotify.com/track/0U2h15q7cbWWzVJjFPnWxY?si=6520705a47f04666",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b86bb44d0c0f7fcfc460c4e0",
                duration: "2:18 ",
                isObsessed: true,
                isAlbum: false
            },
            {
                title: "Don't You Start",
                spotifyUrl: "https://open.spotify.com/album/1BMINfqQpH1PD4fEecGQfc?si=iGy6UpZPQgWinuWkUuEKpw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273315ed2288941faafa7bb29c0",
                duration: "3:03",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "You Were a Dream",
                spotifyUrl: "https://open.spotify.com/album/3TguXmUsKx3W6JUrQ2du3E?si=YHZSFWS5TU2lTIKjzf5k7A",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2739b82900f73c2393e53a73709",
                duration: "2:28",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "Tattoos",
                spotifyUrl: "https://open.spotify.com/album/2tp9gMf7LcerH6OK5pFWIe?si=mqo1XYdITGuSv8chQYw_8w",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27350f924e816266728a069f5e9",
                duration: "2:45",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "I'll Make You Miss Me",
                spotifyUrl: "https://open.spotify.com/album/3yRIVBkRxCMyhkwklUk25Z?si=41w9dRbuTtWZL1ygjGBH0g",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27307ca2674866ff3bcc4ac7342",
                duration: "3:00",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "Sink or Swim",
                spotifyUrl: "https://open.spotify.com/album/0QHzmTrTtLggERAjEX70CY?si=Qa21SZY1SRyySErsBsQOrw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737ab403e717752dcf3b1468e8",
                duration: "3:09",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "Can't Stop Loving You",
                spotifyUrl: "https://open.spotify.com/album/5cljaSxDCinxKScVYnFzXe?si=clBPsaAHR3WviN2XS3ClTg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273c6237a022a47caf73b67eb8d",
                duration: "3:49",
                isFavorite: false,
                isObsessed: true
            },
            {
                title: "Me n My Girl",
                spotifyUrl: "https://open.spotify.com/album/5zod1g9FgDO4eNNpjLMDPT?si=e1KvvDu2TFK35d_qXWEAfA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27332ff4230fd62db9e62d260dd",
                duration: "2:10",
                isFavorite: false,
                isObsessed: true
            },
        ]
    },
    {
        name: "Killa Fonic",
        popularSongs: [
            {
                title: "Niciun Glont Nu Doare Cat Doare Dragostea",
                videoUrl: "https://files.catbox.moe/xw3mva.mp4"
            },
            {
                title: "Bambolina",
                videoUrl: "https://files.catbox.moe/bwr2tx.mp4"
            },
            {
                title: "Miami Bici",
                videoUrl: "https://files.catbox.moe/0xth1t.mp4"
            },
        ],
        songs: [
            {
                title: "Ramses 1989",
                spotifyUrl: "https://open.spotify.com/album/5h65FxZ1eUm9ib3MHGL07U?si=HtpbR4uTTw6VRl1Tyxi4zg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273679fc2b0f6fb5f000805ef77",
                duration: "57:49",
                isObsessed: true,
                isNostalgic: true,
                isAlbum: true
            },
            {
                title: "Lama Crima",
                spotifyUrl: "https://open.spotify.com/album/34KJBztKyAou1TfOyt2TQM?si=PihOzAJPTwuyRVOy587oLA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27331cb97ed068ca83619513aa9",
                duration: "1:09:00",
                isObsessed: true,
                isNostalgic: true,
                isAlbum: true
            },
            {
                title: "Emotiv Munteana",
                spotifyUrl: "https://open.spotify.com/album/5tXcDWPG3RI80OFInNx9h2?si=EGVl9ZDwRg6Wjq0V4DOI9w",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2732f4c03c4b8885bb5f7867d96",
                duration: "22:21",
                isObsessed: true,
                isNostalgic: true,
                isAlbum: true
            },
            {
                title: "2089",
                spotifyUrl: "https://open.spotify.com/album/6ke5zdv0C3F1GAKVdjFIhk?si=bN1FwedPRNaZGuE_eI6ppw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2735633b411498d84061a3b290c",
                duration: "31:40",
                isFavorite: true,
                isNostalgic: false,
                isAlbum: true
            },
            {
                title: "Terra Vista",
                spotifyUrl: "https://open.spotify.com/album/2QscibxUEEmNLVfSi1b2mo?si=MeJh4V3eRoKQvefpSYBEtA",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273348cf9323fd43e3bc384d628",
                duration: "30:32",
                isObsessed: true,
                isNostalgic: false,
                isAlbum: true
            },
            {
                title: "Osvaldo",
                spotifyUrl: "https://open.spotify.com/album/6dupAMHCVqLmjNxIHJlfPV?si=xG-7nZ7LQ2K5VcNsAmPuWQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734682c8ad2c586c7b25406ab8",
                duration: "52:44",
                isObsessed: true,
                isNostalgic: false,
                isAlbum: true
            },
            {
                title: "RADIOFONIC",
                spotifyUrl: "https://open.spotify.com/album/28TjBMndTDtdBNWHbgtcbL?si=1DjBe46aQIeFcFRAyDFi1A",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734fd341bc0f2e3935f10c85a0",
                duration: "1:00:00",
                isFavorite: true,
                isObsessed: false,
                isNostalgic: false,
                isAlbum: true
            },
            {
                title: "2milinblunt",
                spotifyUrl: "https://open.spotify.com/album/2H0iTVABQYxdu9MUWCbkSt?si=1B5FAym3Rb-yC4ZNejI7tg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b2442e4001a6f4b71d883d8c",
                duration: "2:17",
                isObsessed: true,
                isNostalgic: true,
            },
            {
                title: "Exodus",
                spotifyUrl: "https://open.spotify.com/track/1lrNlXAROp03pnJ24sc2Z0?si=f77ac53aa8a245d8",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273082a215136db5f64c09c49d9",
                duration: "4:28",
                isObsessed: true,
                isNostalgic: true
            },
            {
                title: "9 Ciori",
                spotifyUrl: "https://open.spotify.com/track/5X2kx9dd6cMLJUHbVemEoF?si=1b2e928a3f854ca2",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2735b9e5f222ba2dd6f8944c1d4",
                duration: "3:04",
                isFavorite: true,
                isNostalgic: true
            },
            {
                title: "Adorm",
                spotifyUrl: "https://open.spotify.com/track/4dKIj32okCArIY5w12O9Xg?si=bcbbfe5b5a8841a3",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738f4a423a90544cfbf276f6b5",
                duration: "3:28",
                isObsessed: true,
                isNostalgic: true
            },
            {
                title: "Lolita",
                spotifyUrl: "https://open.spotify.com/album/0YU2RBv1qulav4l9aUGFMo?si=MtmtZvK2QhyvtXGzvGwuVg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273a0a058d4de8ccf322f9074d2",
                duration: "2:42",
                isFavorite: true,
                isNostalgic: false
            },
        ]
    },
    {
        name: "Mareux",
        popularSongs: [
            {
                title: "The Perfect Girl",
                videoUrl: "https://files.catbox.moe/5hj9o8.mp4"
            },
            {
                title: "Killer",
                videoUrl: "https://files.catbox.moe/kef3ch.mp4"
            },
            {
                title: "Summertime",
                videoUrl: "https://files.catbox.moe/ghqdh3.mp4"
            },
        ],
        songs: [
            {
                title: "Lovers From The Past",
                spotifyUrl: "https://open.spotify.com/album/6Z4eMptTUBwtdJHQeNV91N?si=bwulXjxySAm53ry6NwLsQg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2737cd3768fecefe743c5465b57",
                duration: "34:58",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Nonstop Romance",
                spotifyUrl: "https://open.spotify.com/album/15NaFl1G4oj4aP6x7o7Tza?si=V6wzDh-qSu2NpKg67VnqdQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273b885da0e907572ed8f1e9da0",
                duration: "26:20",
                isFavorite: false,
                isAlbum: true,
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Decade",
                spotifyUrl: "https://open.spotify.com/album/5nVWi9N2LrOLIZ1aKBmqwe?si=-gis0Cv9SnWxuHPKIYKEzw",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27384de0e7589ec2b06f3df4d84",
                duration: "10:57",
                isFavorite: false,
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Leech",
                spotifyUrl: "https://open.spotify.com/track/1E6AyRgbhDllNzYQXeS4iL?si=df028eb6e2c94993",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273088e9fde007c85411435b38e",
                duration: "4:30",
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Scorpio",
                spotifyUrl: "https://open.spotify.com/album/7g0ipnMIsC5CqlHkAh5rEj?si=NzQSH1BxROCA3ZoVtD0d9w",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273d0590d6416fb26ed4ae54730",
                duration: "3:41",
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Blackout",
                spotifyUrl: "https://open.spotify.com/track/7HMPSmje7Q1wu4XvfuvJZp?si=3f45d326ccd04f59",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b27322de2f10c176dc8152047c17",
                duration: "5:17",
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Dance Floor Dolor",
                spotifyUrl: "https://open.spotify.com/track/0ocImbYiDNIiayVE2nE6PA?si=cd6dff20dfce4d68",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738e2950353b3867e559a6d308",
                duration: "5:09",
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Inamorata",
                spotifyUrl: "https://open.spotify.com/track/5wpljkskGv4spHoubqPLZz?si=3bd31d4f0b02451c",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2730137858b064b65146f94b16d",
                duration: "3:13",
                isFavorite: true,
                isNostalgic: false
            },
        ]
    },
    {
        name: "Joji",
        popularSongs: [
            {
                title: "SLOW DANCING IN THE DARK",
                videoUrl: "https://files.catbox.moe/u39p0t.mp4"
            },
            {
                title: "Glimpse Of Us",
                videoUrl: "https://files.catbox.moe/3am1kw.mp4"
            },
            {
                title: "Sanctuary",
                videoUrl: "https://files.catbox.moe/siauj8.mp4"
            },
        ],
        songs: [
            {
                title: "BALLADS 1",
                spotifyUrl: "https://open.spotify.com/album/5mIImcsuqpiSXg8XvFr81I?si=vv2uhnuSTMG1_ioZus9qHg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734cc52cd7a712842234e4fce2",
                duration: "35:11",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "Nectar",
                spotifyUrl: "https://open.spotify.com/album/65edimIChzNNK8VGn56pIK?si=LsGeQmqfRH6F4MOMkx_mVQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2738da6404284573219a9b1e2f4",
                duration: "53:14",
                isObsessed: true,
                isAlbum: true
            },
            {
                title: "In Tongues",
                spotifyUrl: "https://open.spotify.com/album/3dtSst4EXjGeZVQ5Sco315?si=vaR3QD6OSheZfZ4oN5jWXQ",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2733a927e16c14f2aeb7c004e19",
                duration: "16:39",
                isFavorite: false,
                isObsessed: true,
                isNostalgic: false
            },
            {
                title: "Think About U (feat. Joji)",
                spotifyUrl: "https://open.spotify.com/track/3tZZvB5AlpLyZ378K4iC44?si=e41d53218a3c40b7",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b273f2bb993c6c4a85f74ecca0b6",
                duration: "2:49",
                isFavorite: true,
            },
            {
                title: "PIXELATED KISSES",
                spotifyUrl: "https://open.spotify.com/album/3FLlai6YTV9IwCU0KolG1w?si=LN66kRFpQguo2uMI-IzJhg",
                thumbnail: "https://i.scdn.co/image/ab67616d0000b2734a66ee1a8cdd72378eb56765",
                duration: "1:50",
                isFavorite: true,
            },
        ]
    },
];

function calculateTotalDuration() {
    let totalMinutes = 0;
    artistData.forEach(artist => {
        artist.songs.forEach(song => {
            // Handle all durations in the format "MM:SS" or "HH:MM:SS"
            const parts = song.duration.split(':').map(Number);
            
            if (parts.length === 2) {
                // Format is MM:SS
                totalMinutes += parts[0] + (parts[1] / 60);
            } else if (parts.length === 3) {
                // Format is HH:MM:SS
                totalMinutes += (parts[0] * 60) + parts[1] + (parts[2] / 60);
            }
        });
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = Math.round(totalMinutes % 60);
    
    // Always use the compact format
    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
}

function createArtistStats() {
    const totalArtists = artistData.length;
    
    // Calculate total songs using the ARTIST_CONFIG
    const totalSongs = artistData.reduce((sum, artist) => {
        // If the artist has a configured song count, use that
        if (ARTIST_CONFIG[artist.name]) {
            return sum + ARTIST_CONFIG[artist.name];
        }
        // Otherwise use the actual count of songs in the array
        return sum + artist.songs.length;
    }, 0);
    
    const duration = calculateTotalDuration();
    
    return `
        <div class="stats-container">
            <div class="stats-box">
                <span class="stats-number">${totalArtists}</span>
                <span class="stats-label">Artists</span>
            </div>
            <div class="stats-box">
                <span class="stats-number">${totalSongs}</span>
                <span class="stats-label">Songs</span>
            </div>
            <div class="stats-box">
                <span class="stats-number">${duration}</span>
                <span class="stats-label">of Music</span>
            </div>
        </div>
    `;
}

function createArtistSection(artist) {
    // Get song count from configuration or use actual song count
    let songCount;
    if (ARTIST_CONFIG[artist.name]) {
        songCount = `${ARTIST_CONFIG[artist.name]} songs`;
    } else {
        songCount = `${artist.songs.length} songs`;
    }
    
    return `
        <section class="artist-section">
            <div class="artist-header">
                <div class="artist-header-left">
                    <h2 class="artist-name">${artist.name}</h2>
                    ${artist.popularSongs && artist.popularSongs.length > 0 ? 
                        `<div class="popular-songs-trigger" data-artist="${artist.name}">
                            <i class="fas fa-play-circle"></i>
                            <span class="tooltip">Popular songs you might know</span>
                        </div>` 
                    : ''}
                </div>
                <span class="song-count">${songCount}</span>
            </div>
            <ul class="song-list">
                ${artist.songs.map((song, index) => `
                    <li class="song-item">
                        <div class="song-item-left">
                            <span class="song-number">#${index + 1}</span>
                            <img src="${song.thumbnail}" alt="${song.title}" class="song-thumbnail">
                            <div class="song-info">
                                <span class="song-title">${song.title}</span>
                                ${song.isFavorite ? '<span class="favorite-badge"><i class="fas fa-star"></i> Solid</span>' : ''}
                                ${song.isObsessed ? '<span class="obsessed-badge">❤️ Obsessed</span>' : ''}
                                ${song.isNostalgic ? '<span class="nostalgic-badge">🕰️ Nostalgic</span>' : ''}
                                ${song.isAlbum ? '<span class="album-badge">💿 Album</span>' : ''}
                            </div>
                        </div>
                        <div class="song-item-right">
                            <span class="song-duration">${song.duration}</span>
                            <a href="${song.spotifyUrl}" target="_blank" class="song-link" title="Listen on Spotify">
                                <i class="fab fa-spotify"></i>
                            </a>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </section>
    `;
}

function createYoutubeModal() {
    const modal = document.createElement('div');
    modal.className = 'youtube-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="nav-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
            <div class="video-container">
                <video 
                    id="my-video"
                    class="video-js vjs-default-skin"
                    controls
                    preload="auto"
                    width="640"
                    height="360"
                    data-setup="{}"
                >
                    <p class="vjs-no-js">
                        To view this video please enable JavaScript, and consider upgrading to a
                        web browser that supports HTML5 video
                    </p>
                </video>
            </div>
            <button class="nav-btn next-btn"><i class="fas fa-chevron-right"></i></button>
            <button class="close-btn"><i class="fas fa-times"></i></button>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

function initializeVideoPlayer() {
    let currentArtist = null;
    let currentSongIndex = 0;
    let modal = null;
    let player = null;

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.popular-songs-trigger');
        if (trigger) {
            const artistName = trigger.dataset.artist;
            const artist = artistData.find(a => a.name === artistName);
            
            if (!modal) {
                modal = createYoutubeModal();
                setupModalControls();
            }

            currentArtist = artist;
            currentSongIndex = 0;
            modal.classList.add('active');
            loadVideo(currentArtist.popularSongs[currentSongIndex].videoUrl);
        }
    });

    function setupModalControls() {
        const closeBtn = modal.querySelector('.close-btn');
        const prevBtn = modal.querySelector('.prev-btn');
        const nextBtn = modal.querySelector('.next-btn');

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            if (player) {
                player.pause();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSongIndex > 0) {
                currentSongIndex--;
                loadVideo(currentArtist.popularSongs[currentSongIndex].videoUrl);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentSongIndex < currentArtist.popularSongs.length - 1) {
                currentSongIndex++;
                loadVideo(currentArtist.popularSongs[currentSongIndex].videoUrl);
            }
        });
    }

    function loadVideo(url) {
        if (!player) {
            player = videojs('my-video');
        }
        player.src({
            type: 'video/mp4',
            src: url
        });
        player.load();
        player.play();
    }
}

function initializeMusicPage() {
    const mainContainer = document.querySelector('.music-container');
    if (!mainContainer) return;

    const listeningCard = createListeningCard();
    const welcomeSection = createWelcomeSection();

    // Create filter and navigation menu
    const filterMenu = createFilterMenu();
    
    // Create artist stats
    const artistStats = createArtistStats();
    
    // Create artist sections
    const artistSections = artistData.map(artist => createArtistSection(artist)).join('');
    
    // Create Spotify footer
    const spotifyFooter = `
        <div class="spotify-footer">
            <a href="${SPOTIFY_PROFILE_URL}" target="_blank" rel="noopener noreferrer" class="spotify-link">
                <i class="fab fa-spotify"></i> Follow My Spotify Account
            </a>
        </div>
    `;
    
    // Combine everything
    mainContainer.innerHTML = `
        ${welcomeSection}
        ${listeningCard}
        ${filterMenu}
        ${artistStats}
        <div class="artist-sections-container">
            ${artistSections}
        </div>
        ${spotifyFooter}
    `;
    
    initializeFilters();
    initializeLanyardCard();
}

function createListeningCard() {
    return `
        <section class="now-playing-card" id="now-playing-card" aria-live="polite">
            <div class="now-playing-art-wrap">
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" class="now-playing-art-link" id="now-playing-link">
                    <img
                        id="now-playing-art"
                        class="now-playing-art"
                        src="${DEFAULT_NOW_PLAYING_ART}"
                        alt="Album art"
                    >
                </a>
            </div>
            <div class="now-playing-copy">
                <p class="now-playing-kicker">Listening To Spotify</p>
                <h3 class="now-playing-title" id="now-playing-title">Loading Spotify status...</h3>
                <p class="now-playing-artist" id="now-playing-artist">Waiting for Lanyard...</p>
                <div class="now-playing-progress" id="now-playing-progress" hidden>
                    <div class="now-playing-progress-times">
                        <span id="now-playing-elapsed">0:00</span>
                        <span id="now-playing-duration">0:00</span>
                    </div>
                    <div class="now-playing-progress-track" aria-hidden="true">
                        <span class="now-playing-progress-fill" id="now-playing-progress-fill"></span>
                    </div>
                </div>
                <p class="now-playing-meta" id="now-playing-meta">This card updates live when Spotify activity changes.</p>
            </div>
        </section>
    `;
}

function createWelcomeSection() {
    return `
        <div class="welcome-section">
            <div class="welcome-content">
                <div class="welcome-title">
                    <h2>Welcome to my Music Page!</h2>
                </div>
                <p>This is where I share my favorite artists and songs. You'll find a mix of different genres and styles that I enjoy listening to. Feel free to explore my music taste and discover some great tunes!</p>
                <div class="last-updated">
                    Last updated: December 24, 2025
                </div>
            </div>
        </div>
    `;
}

function createFilterMenu() {
    const artistOptions = artistData.map(artist => 
        `<option value="${artist.name}">${artist.name}</option>`
    ).join('');
    
    return `
        <div class="filter-menu">
            <div class="filter-section">
                <label class="section-title">Jump to Artist</label>
                <select id="artist-select">
                    <option value="">All Artists</option>
                    ${artistOptions}
                </select>
            </div>
            <div class="filter-section">
                <label class="section-title">Filter by Tags</label>
                <div class="tag-filters">
                    <label class="tag-filter-item">
                        <input type="checkbox" value="favorite" checked> 
                        <span class="filter-badge favorite-badge"><i class="fas fa-star"></i> Solid</span>
                    </label>
                    <label class="tag-filter-item">
                        <input type="checkbox" value="obsessed" checked> 
                        <span class="filter-badge obsessed-badge">❤️ Obsessed</span>
                    </label>
                    <label class="tag-filter-item">
                        <input type="checkbox" value="nostalgic" checked> 
                        <span class="filter-badge nostalgic-badge">🕰️ Nostalgic</span>
                    </label>
                    <label class="tag-filter-item">
                        <input type="checkbox" value="album" checked> 
                        <span class="filter-badge album-badge">💿 Album</span>
                    </label>
                    <!-- <label class="tag-filter-item">
                        <input type="checkbox" value="untagged" checked> 
                        <span class="filter-badge untagged-badge">Untagged</span>
                    </label> -->
                </div>
            </div>
            <div class="filter-section">
                <label class="section-title">View Mode</label>
                <div class="view-mode-controls">
                    <button id="view-all-artists" class="view-mode-btn active">
                        <i class="fas fa-th-list"></i> All Artists
                    </button>
                    <button id="view-selected-artist" class="view-mode-btn" disabled>
                        <i class="fas fa-user"></i> Selected Artist
                    </button>
                </div>
            </div>
        </div>
    `;
}

function updateLanyardCard(state = {}) {
    const card = document.getElementById('now-playing-card');
    const art = document.getElementById('now-playing-art');
    const link = document.getElementById('now-playing-link');
    const kicker = document.querySelector('.now-playing-kicker');
    const title = document.getElementById('now-playing-title');
    const artist = document.getElementById('now-playing-artist');
    const progress = document.getElementById('now-playing-progress');
    const progressFill = document.getElementById('now-playing-progress-fill');
    const elapsed = document.getElementById('now-playing-elapsed');
    const duration = document.getElementById('now-playing-duration');
    const meta = document.getElementById('now-playing-meta');

    if (!card || !art || !link || !kicker || !title || !artist || !progress || !progressFill || !elapsed || !duration || !meta) return;

    const {
        mode = 'loading',
        song = '',
        artistName = '',
        albumArtUrl = DEFAULT_NOW_PLAYING_ART,
        trackId = '',
        statusText = '',
        elapsedLabel = '0:00',
        durationLabel = '0:00',
        progressPercent = 0
    } = state;

    const setTextIfChanged = (element, value) => {
        if (!element) {
            return;
        }
        if (element.textContent !== value) {
            element.textContent = value;
        }
    };

    card.dataset.state = mode;
    art.src = albumArtUrl;
    link.href = trackId ? `https://open.fixspotify.com/track/${trackId}` : SPOTIFY_PROFILE_URL;

    if (mode === 'playing') {
        setTextIfChanged(kicker, 'Listening To Spotify');
        art.alt = `${song} album art`;
        setTextIfChanged(title, song);
        setTextIfChanged(artist, artistName);
        progress.hidden = false;
        setTextIfChanged(elapsed, elapsedLabel);
        setTextIfChanged(duration, durationLabel);
        progressFill.style.width = `${progressPercent}%`;
        setTextIfChanged(meta, statusText || '');
        sessionStorage.setItem(LANYARD_CARD_CACHE_KEY, JSON.stringify(state));
        return;
    }

    art.alt = 'Spotify status artwork';
    progress.hidden = true;
    elapsed.textContent = '0:00';
    duration.textContent = '0:00';
    progressFill.style.width = '0%';

    if (mode === 'config') {
        setTextIfChanged(kicker, 'Listening To Spotify');
        setTextIfChanged(title, 'Lanyard card is not configured yet.');
        setTextIfChanged(artist, 'Add your Discord user ID in music/music-script.js.');
        setTextIfChanged(meta, 'After that, this card will update automatically.');
        return;
    }

    if (mode === 'offline') {
        setTextIfChanged(kicker, 'Listening To Spotify');
        setTextIfChanged(title, 'Could not reach Lanyard right now.');
        setTextIfChanged(artist, 'The card will retry automatically.');
        setTextIfChanged(meta, statusText || 'Spotify activity is temporarily unavailable.');
        sessionStorage.setItem(LANYARD_CARD_CACHE_KEY, JSON.stringify(state));
        return;
    }

    if (mode === 'idle') {
        setTextIfChanged(kicker, '');
        setTextIfChanged(title, `${LISTENING_DISPLAY_NAME} is not listening to spotify right now.`);
        setTextIfChanged(artist, '');
        setTextIfChanged(meta, '');
        sessionStorage.setItem(LANYARD_CARD_CACHE_KEY, JSON.stringify(state));
        return;
    }

    setTextIfChanged(kicker, 'Listening To Spotify');
    setTextIfChanged(title, 'Loading Spotify status...');
    setTextIfChanged(artist, 'Waiting for Lanyard...');
    setTextIfChanged(meta, 'Checking your current Discord presence.');
}

function getCachedLanyardCardState() {
    try {
        const rawState = sessionStorage.getItem(LANYARD_CARD_CACHE_KEY);
        if (!rawState) {
            return null;
        }

        const parsedState = JSON.parse(rawState);
        if (!parsedState || !['playing', 'idle', 'offline'].includes(parsedState.mode)) {
            return null;
        }

        return parsedState;
    } catch {
        return null;
    }
}

function mapPresenceToCardState(presence) {
    const spotify = presence?.spotify;
    if (!presence?.listening_to_spotify || !spotify) {
        return { mode: 'idle' };
    }

    const normalizeTypography = (value) => {
        return String(value || '')
            .replace(/[‘’]/g, "'")
            .replace(/[“”]/g, '"');
    };

    const timestamps = spotify.timestamps || {};
    const start = Number(timestamps.start);
    const end = Number(timestamps.end);
    const normalizedArtist = normalizeTypography(spotify.artist || 'Unknown artist')
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .join(', ');

    const formatTime = (ms) => {
        if (!Number.isFinite(ms) || ms < 0) {
            return '0:00';
        }
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${String(seconds).padStart(2, '0')}`;
    };

    const totalMs = Number.isFinite(start) && Number.isFinite(end) ? Math.max(0, end - start) : 0;
    const elapsedMs = Number.isFinite(start) ? Math.max(0, Date.now() - start) : 0;
    const safeElapsed = totalMs ? Math.min(elapsedMs, totalMs) : elapsedMs;
    const progressPercent = totalMs > 0 ? Math.min(100, (safeElapsed / totalMs) * 100) : 0;

    return {
        mode: 'playing',
        song: normalizeTypography(spotify.song || 'Unknown song'),
        artistName: normalizedArtist,
        albumArtUrl: spotify.album_art_url || DEFAULT_NOW_PLAYING_ART,
        trackId: spotify.track_id || '',
        statusText: '',
        elapsedLabel: formatTime(safeElapsed),
        durationLabel: formatTime(totalMs),
        progressPercent
    };
}

function initializeLanyardCard() {
    if (LANYARD_USER_ID === 'PUT_YOUR_DISCORD_USER_ID_HERE') {
        updateLanyardCard({ mode: 'config' });
        return;
    }

    let heartbeatTimer = null;
    let reconnectTimer = null;
    let progressTimer = null;
    let loadingTimer = null;
    let offlineTimer = null;
    let socket = null;
    let latestPresence = null;

    const clearTimers = () => {
        if (heartbeatTimer) {
            clearInterval(heartbeatTimer);
            heartbeatTimer = null;
        }
        if (reconnectTimer) {
            clearTimeout(reconnectTimer);
            reconnectTimer = null;
        }
        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }
        if (loadingTimer) {
            clearTimeout(loadingTimer);
            loadingTimer = null;
        }
        if (offlineTimer) {
            clearTimeout(offlineTimer);
            offlineTimer = null;
        }
    };

    const scheduleReconnect = () => {
        clearTimers();
        reconnectTimer = window.setTimeout(connectSocket, 5000);
    };

    const applyPresence = (presence) => {
        latestPresence = presence;
        if (loadingTimer) {
            clearTimeout(loadingTimer);
            loadingTimer = null;
        }
        if (offlineTimer) {
            clearTimeout(offlineTimer);
            offlineTimer = null;
        }
        updateLanyardCard(mapPresenceToCardState(presence));

        if (progressTimer) {
            clearInterval(progressTimer);
            progressTimer = null;
        }

        if (presence?.listening_to_spotify && presence?.spotify?.timestamps?.start && presence?.spotify?.timestamps?.end) {
            progressTimer = window.setInterval(() => {
                updateLanyardCard(mapPresenceToCardState(latestPresence));
            }, 1000);
        }
    };

    const fetchInitialState = async () => {
        try {
            const response = await fetch(`${LANYARD_API_URL}/${LANYARD_USER_ID}`, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const payload = await response.json();
            applyPresence(payload?.data || null);
        } catch (error) {
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            offlineTimer = window.setTimeout(() => {
                updateLanyardCard({
                    mode: 'offline',
                    statusText: 'Initial Lanyard request failed.'
                });
                offlineTimer = null;
            }, LANYARD_OFFLINE_DELAY_MS);
        }
    };

    const connectSocket = () => {
        if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
            return;
        }

        socket = new WebSocket(LANYARD_SOCKET_URL);

        socket.addEventListener('message', (event) => {
            let payload;
            try {
                payload = JSON.parse(event.data);
            } catch {
                return;
            }

            if (payload.op === 1) {
                const heartbeatInterval = Number(payload.d?.heartbeat_interval) || 30000;
                clearTimers();
                heartbeatTimer = window.setInterval(() => {
                    if (socket?.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify({ op: 3 }));
                    }
                }, heartbeatInterval);

                socket.send(JSON.stringify({
                    op: 2,
                    d: { subscribe_to_id: LANYARD_USER_ID }
                }));
                return;
            }

            if (payload.op !== 0) {
                return;
            }

            if (payload.t === 'INIT_STATE') {
                applyPresence(payload.d || null);
                return;
            }

            if (payload.t === 'PRESENCE_UPDATE') {
                applyPresence(payload.d || null);
            }
        });

        socket.addEventListener('close', () => {
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            if (offlineTimer) {
                clearTimeout(offlineTimer);
            }
            offlineTimer = window.setTimeout(() => {
                updateLanyardCard({
                    mode: 'offline',
                    statusText: 'Realtime connection lost. Retrying...'
                });
                offlineTimer = null;
            }, LANYARD_OFFLINE_DELAY_MS);
            scheduleReconnect();
        });

        socket.addEventListener('error', () => {
            if (socket) {
                socket.close();
            }
        });
    };

    const cachedState = getCachedLanyardCardState();
    if (cachedState) {
        updateLanyardCard(cachedState);
    } else {
        loadingTimer = window.setTimeout(() => {
            updateLanyardCard({ mode: 'loading' });
            loadingTimer = null;
        }, LANYARD_LOADING_DELAY_MS);
    }

    fetchInitialState();
    connectSocket();
}

function applyFilters() {
    const selectedFilters = Array.from(document.querySelectorAll('.tag-filter-item input:checked')).map(input => input.value);
    const viewSelectedBtn = document.getElementById('view-selected-artist');
    const artistSelect = document.getElementById('artist-select');
    
    if (viewSelectedBtn && viewSelectedBtn.classList.contains('active')) {
        const selectedArtist = artistSelect.value;
        const artistElements = document.querySelectorAll('.artist-name');
        for (let element of artistElements) {
            if (element.textContent.trim() === selectedArtist) {
                const artistSection = element.closest('.artist-section');
                if (artistSection) {
                    applyFiltersToSection(artistSection, selectedFilters);
                }
                break;
            }
        }
    } else {
        document.querySelectorAll('.artist-section').forEach(section => {
            applyFiltersToSection(section, selectedFilters);
            
            // Hide entire artist section if no songs are visible
            const visibleSongs = section.querySelectorAll('.song-item[style*="display: flex"]');
            if (visibleSongs.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
    }
}

function applyFiltersToSection(section, selectedFilters) {
    if (selectedFilters.length === 0) {
        section.querySelectorAll('.song-item').forEach(song => {
            song.style.display = 'none';
        });
        return;
    }
    
    section.querySelectorAll('.song-item').forEach(song => {
        song.style.display = 'none';
    });
    
    selectedFilters.forEach(filter => {
        if (filter === 'favorite') {
            section.querySelectorAll('.song-item:has(.favorite-badge)').forEach(song => {
                song.style.display = 'flex';
            });
        } else if (filter === 'obsessed') {
            section.querySelectorAll('.song-item:has(.obsessed-badge)').forEach(song => {
                song.style.display = 'flex';
            });
        } else if (filter === 'nostalgic') {
            section.querySelectorAll('.song-item:has(.nostalgic-badge)').forEach(song => {
                song.style.display = 'flex';
            });
        } else if (filter === 'album') {
            section.querySelectorAll('.song-item:has(.album-badge)').forEach(song => {
                song.style.display = 'flex';
            });
        } 
        /* else if (filter === 'untagged') {
            section.querySelectorAll('.song-item:not(:has(.favorite-badge)):not(:has(.obsessed-badge)):not(:has(.nostalgic-badge))').forEach(song => {
                song.style.display = 'flex';
            });
        } */
    });
}

function initializeFilters() {
    const artistSelect = document.getElementById('artist-select');
    const viewAllBtn = document.getElementById('view-all-artists');
    const viewSelectedBtn = document.getElementById('view-selected-artist');
    
    if (artistSelect) {
        artistSelect.addEventListener('change', function() {
            const selectedArtist = this.value;
            
            if (viewSelectedBtn) {
                if (selectedArtist) {
                    viewSelectedBtn.disabled = false;
                    
                    if (viewSelectedBtn.classList.contains('active')) {
                        document.querySelectorAll('.artist-section').forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        const artistElements = document.querySelectorAll('.artist-name');
                        for (let element of artistElements) {
                            if (element.textContent.trim() === selectedArtist) {
                                const artistSection = element.closest('.artist-section');
                                if (artistSection) {
                                    artistSection.style.display = 'block';
                                    
                                    applyFilters();
                                }
                                break;
                            }
                        }
                    }
                } else {
                    viewSelectedBtn.disabled = true;
                    if (viewAllBtn && !viewAllBtn.classList.contains('active')) {
                        viewAllBtn.click();
                    }
                }
            }
            
            // Scroll to artist if one is selected
            if (selectedArtist) {
                scrollToArtist(selectedArtist);
            }
        });
    }
    
    // View mode controls
    if (viewAllBtn && viewSelectedBtn) {
        viewAllBtn.addEventListener('click', function() {
            if (this.classList.contains('active')) return;
            
            // Update active state
            this.classList.add('active');
            viewSelectedBtn.classList.remove('active');
            
            // Show all artists
            document.querySelectorAll('.artist-section').forEach(section => {
                section.style.display = 'block';
            });
            
            // Re-apply tag filters
            applyFilters();
        });
        
        viewSelectedBtn.addEventListener('click', function() {
            if (this.classList.contains('active') || this.disabled) return;
            
            // Update active state
            this.classList.add('active');
            viewAllBtn.classList.remove('active');
            
            // Get selected artist
            const selectedArtist = artistSelect.value;
            if (!selectedArtist) return;
            
            // Hide all artists first
            document.querySelectorAll('.artist-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show only the selected artist
            const artistElements = document.querySelectorAll('.artist-name');
            for (let element of artistElements) {
                if (element.textContent.trim() === selectedArtist) {
                    const artistSection = element.closest('.artist-section');
                    if (artistSection) {
                        artistSection.style.display = 'block';
                        
                        // Apply tag filters within this artist only
                        applyFilters();
                    }
                    break;
                }
            }
        });
    }
    
    // Tag filtering
    const tagFilters = document.querySelectorAll('.tag-filter-item input');
    if (tagFilters.length) {
        tagFilters.forEach(filter => {
            filter.addEventListener('change', function() {
                applyFilters();
            });
        });
    }
}

function scrollToArtist(artistName) {
    const artistElements = document.querySelectorAll('.artist-name');
    
    for (let element of artistElements) {
        if (element.textContent.trim() === artistName) {
            const artistSection = element.closest('.artist-section');
            if (artistSection) {
                artistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return true;
            }
        }
    }
    return false;
}

/* I don't know why this doesn't work I even tried to disable scrolling 
   with the help of AI but it didn't help me. :( */ 

// Variables to store scroll state
let scrollPosition = 0;
let scrollingDisabled = false;

function disableScroll() {
    if (scrollingDisabled) return;
    
    // Store current scroll position
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Apply styles to prevent scrolling
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    // For iOS Safari
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100%';
    
    scrollingDisabled = true;
}

// Function to enable scrolling
function enableScroll() {
    if (!scrollingDisabled) return;
    
    // Remove styles that prevent scrolling
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // For iOS Safari
    document.documentElement.style.overflow = '';
    document.documentElement.style.height = '';
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition);
    
    scrollingDisabled = false;
}

// Function to open YouTube modal
function openYoutubeModal(artistName) {
    const modal = document.querySelector('.youtube-modal');
    if (!modal) return;
    
    // Disable scrolling
    disableScroll();
    
    // Show modal
    modal.classList.add('active');
    
    // Load videos for this artist
    const artist = artistData.find(a => a.name === artistName);
    if (artist && artist.popularSongs && artist.popularSongs.length > 0) {
        // Your existing code to load videos
    }
}

// Function to close YouTube modal
function closeYoutubeModal() {
    const modal = document.querySelector('.youtube-modal');
    if (!modal) return;
    
    // Re-enable scrolling
    enableScroll();
    
    // Hide modal
    modal.classList.remove('active');
    
    // Stop video if playing
    const videoElement = document.querySelector('.video-js');
    if (videoElement && videoElement.player) {
        videoElement.player.pause();
    }
}

// Add event listeners when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up triggers to open modal
    document.querySelectorAll('.popular-songs-trigger').forEach(trigger => {
        trigger.addEventListener('click', function() {
            const artistName = this.getAttribute('data-artist');
            openYoutubeModal(artistName);
        });
    });
    
    // Set up close button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeYoutubeModal);
    }
    
    // Close on background click
    const modal = document.querySelector('.youtube-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeYoutubeModal();
            }
        });
    }
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.querySelector('.youtube-modal.active')) {
            closeYoutubeModal();
        }
    });
    
    // Prevent touchmove events on modal
    if (modal) {
        modal.addEventListener('touchmove', function(e) {
            if (scrollingDisabled) {
                e.preventDefault();
            }
        }, { passive: false });
    }
});

// Go Up Button Functionality
function initGoUpButton() {
    const goUpBtn = document.createElement('button');
    goUpBtn.className = 'go-up-btn';
    goUpBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(goUpBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            goUpBtn.classList.add('visible');
        } else {
            goUpBtn.classList.remove('visible');
        }
    });

    goUpBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeMusicPage();
    initializeVideoPlayer();
    initGoUpButton();
    initializeScrollbars();
});

// Function to initialize scrollbars for lists with more than 10 items
function initializeScrollbars() {
    // Apply the scrollable-list class to any song list with more than 10 items
    document.querySelectorAll('.song-list').forEach(list => {
        if (list.children.length > 10) {
            list.classList.add('scrollable-list');
        }
    });
}

