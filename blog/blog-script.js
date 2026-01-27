/**
 * BLOG-SCRIPT.JS
 * ------------------------------------------------------------------------------------------------------
 * Mainly handles functionality for blog.html, but also manages certain features for article pages.
*/

import '/src/js/components/base.js';

/**
 * ARTICLES
*/
let articles = [];

const loadArticles = async () => {
    try {
        const response = await fetch('/blog/articles.json', { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error(`Failed to load articles: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Articles JSON is not an array.');
        }
        articles = data;
    } catch (error) {
        console.error('Error loading articles:', error);
        articles = [];
    }
};

/**
 * PAGINATION SETTINGS
 */
const ARTICLES_PER_PAGE = 8;
let currentPage = 1;
let currentSearch = '';
let paginationKeyHandlerBound = false;
let paginationKeyState = {
    currentPage: 1,
    totalPages: 1,
    onPageChange: null,
};

const normalizePath = (path) => {
    if (path.length > 1 && path.endsWith('/')) {
        return path.slice(0, -1);
    }
    return path;
};

/**
 * UPDATE META TAG CONTENT
 * used for title, description, etc
 */
const updateMetaContent = (selector, value) => {
    if (!value) {
        return;
    }

    const metaTag = document.querySelector(selector);
    if (metaTag) {
        metaTag.setAttribute('content', value);
    }
};

/**
 * UPDATE ARTICLE PUBLISHED DATE ON PAGE
 */
const updatePublishedDate = (dateText) => {
    if (!dateText) return;
    const dateNodes = document.querySelectorAll('.article-date');
    dateNodes.forEach((node) => {
        node.textContent = `Published on: ${dateText}`;
    });
};

/**
 * WELCOME / RANDOM WORDS
*/

 const phrases = [
    "this text is random.",
    "a nerd's basement.",
    "a blog.",
    "i code sometimes.",
    "made with a keyboard.",
    "man i jus realized i added so many $uicideboy$ songs in here 😭",
    "honestly, who reads this stuff?",
    "you ever just.. stare at the screen?",
    "wrote this instead of sleeping.",
    "i'm not a professional writer.",
    "i'm just a guy who likes to write sometimes.",
    "just me messing around with text.",
    "00101110011110000111100101111010", /* dont forget to update this too... :( */
    "just another day in the void.",
    "another day, another line of code. :[",
    "Smoked Out, Scoped Out",
    "Not Even Ghosts Are This Empty",
    "Newport Reds",
    "Aphrodite (The Aquatic Ape Theory)",
    "Prettyleaf",
    "Noxygen",
    "Grey Boys",
    "Mega Zeph",
    "Meet Mr. NICEGUY",
    "122 Days",
    "King Tulip",
    "CLYDE (I Hope At Least One Of My Ex-Girlfriends Hears This)",
    "In Constant Sorrow",
    "Shattered Amethyst",
    "Fold",
    "Flodgin'",
    "I Can't Fold (feat. $uicideboy$)",
    "Runnin' Thru the 7th with My Woadies",
    "I Miss My Dead Friends",
    "Paper Bag Mask",
    "Mannequins Are My Best of Friends",
    "Handzum $uicide",
    "Jon Voight (Live Fast, Die Young)",
    "Aokigahara",
    "Am/Pm",
    "#1 Stunna",
    "Lo-Fi (Kill' Em All)",
    "Dejection",
    "Sleepy Hollow - Slopped & Chewed",
    "Whoa, I'm Woeful",
    "A Death in the Ocean Would Be Beautiful",
    "April Mourning",
    "Life Is but a Stream~",
    "Pontiac Sunfire",
    "Behold a Pale Horse",
    "Heavily Medicated",
    "Lettuce",
    "Magazine",
    "Stop Calling Us Horrorcore",
    "close the world. open the next."
];

/**
 * RANDOM PHRASES FUNCTION
*/
function getRandomPhrase() {
    let lastPhrase = localStorage.getItem('lastPhrase');
    let newPhrase;

    do {
        newPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    } while (newPhrase === lastPhrase); // Ensure a new phrase is chosen

    localStorage.setItem('lastPhrase', newPhrase); // Store the new phrase
    return newPhrase;
}

/**
 * ADD GLITCH FOR SPECIAL PHRASE
*/
document.addEventListener('DOMContentLoaded', async function() {
    // Welcome text setup
    const welcomeText = document.querySelector('.welcome');
    if (welcomeText) {
        const randomPhrase = getRandomPhrase();

        if (randomPhrase === "00101110011110000111100101111010") {
            const numberSpan = document.createElement('span');
            numberSpan.classList.add('glitch');
            numberSpan.setAttribute('data-text', randomPhrase);
            numberSpan.textContent = randomPhrase;
            welcomeText.appendChild(numberSpan);
        } else {
            welcomeText.textContent = randomPhrase;
        }
    }

    await loadArticles();

/**
 * ARTICLE GENERATION
*/
const articleSection = document.getElementById("article-section");
if (articleSection) {

const createArticleCard = (article) => {
    const articleDiv = document.createElement("div");
    articleDiv.className = `article ${article.class}`;
    articleDiv.innerHTML = `
        <div class="article-thumbnail-container">
            <img src="${article.thumbnail}" alt="${article.title} thumbnail" class="article-thumbnail">
        </div>
        <div class="article-content">
            <h2 class="article-title">${article.title}</h2>
            <span class="article-date">${article.date}</span>
            <p class="article-description">${article.description}</p>
        </div>
        <div class="read-more-container">
            <a href="${article.link}" class="read-more">Read More</a>
        </div>
    `;
    return articleDiv;
};

/**
 * CALCULATE TOTAL NUMBER OF PAGES
 */

const getTotalPages = () => Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE));


/**
 * GET INITIAL PAGE FROM URL
 * keeps page value in a valid range
 */

const getInitialPage = (totalPages) => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = parseInt(params.get('page'), 10);
    if (!Number.isInteger(pageParam) || pageParam < 1) return 1;
    if (pageParam > totalPages) return totalPages;
    return pageParam;
};


/**
 * FILTER ARTICLES BY SEARCH TERM
 */
const getFilteredArticles = () => {
    const term = currentSearch.trim().toLowerCase();
    if (!term) return [...articles];

    return articles.filter((article) => {
        const haystack = `${article.title} ${article.description}`.toLowerCase();
        return haystack.includes(term);
    });
};

/**
 * UPDATE PAGE PARAM IN URL
 * avoids page=1 clutter
 */
const updatePageInUrl = (page) => {
    const url = new URL(window.location.href);
    if (page > 1) {
        url.searchParams.set('page', page);
    } else {
        url.searchParams.delete('page');
    }
    history.replaceState({}, '', url);
};

/**
 * RENDER PAGINATION CONTROLS
 */
const renderPagination = (currentPage, totalPages, onPageChange) => {
    let pagination = document.getElementById('pagination');
    if (!pagination) {
        pagination = document.createElement('div');
        pagination.id = 'pagination';
        articleSection.insertAdjacentElement('afterend', pagination);
    }

    pagination.innerHTML = '';
    pagination.hidden = totalPages <= 1;

    if (pagination.hidden) return;

    const pageInfo = document.createElement('span');
    pageInfo.className = 'pagination-info';
    pageInfo.textContent = `${currentPage} / ${totalPages}`;

    const prevButton = document.createElement('button');
    prevButton.className = 'pagination-button';
    prevButton.textContent = '←';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => onPageChange(currentPage - 1));

    const nextButton = document.createElement('button');
    nextButton.className = 'pagination-button';
    nextButton.textContent = '→';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => onPageChange(currentPage + 1));

    pagination.appendChild(prevButton);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextButton);
    paginationKeyState.currentPage = currentPage;
    paginationKeyState.totalPages = totalPages;
    paginationKeyState.onPageChange = onPageChange;

    if (!paginationKeyHandlerBound) {
        document.addEventListener('keydown', (event) => {
            if (event.repeat) return;
            if (event.target && ['input', 'textarea', 'select'].includes(event.target.tagName.toLowerCase())) {
                return;
            }
            if (!paginationKeyState.onPageChange) return;

            if (event.key === 'ArrowLeft' && paginationKeyState.currentPage > 1) {
                paginationKeyState.onPageChange(paginationKeyState.currentPage - 1);
            }
            if (event.key === 'ArrowRight' && paginationKeyState.currentPage < paginationKeyState.totalPages) {
                paginationKeyState.onPageChange(paginationKeyState.currentPage + 1);
            }
        });
        paginationKeyHandlerBound = true;
    }
};

/**
 * RENDER ARTICLES FOR CURRENT PAGE
 */
const renderArticles = (page) => {
    const filtered = getFilteredArticles();
    const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
    const safePage = Math.min(Math.max(page, 1), totalPages);
    const startIndex = (safePage - 1) * ARTICLES_PER_PAGE;
    const visibleArticles = filtered.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

    articleSection.innerHTML = '';
    if (!articles.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'articles-empty';
        emptyState.textContent = 'No articles published yet :(';
        articleSection.appendChild(emptyState);
        renderPagination(1, 1, () => {});
        return;
    }

    if (!visibleArticles.length) {
        const emptyState = document.createElement('p');
        emptyState.className = 'articles-empty';
        emptyState.textContent = 'No articles match your search yet.';
        articleSection.appendChild(emptyState);
    } else {
        visibleArticles.forEach((article) => {
            articleSection.appendChild(createArticleCard(article));
        });
    }

    renderPagination(safePage, totalPages, (newPage) => {
        currentPage = newPage;
        renderArticles(newPage);
        updatePageInUrl(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    if (safePage !== page) {
        updatePageInUrl(safePage);
    }
};

/**
 * CLEAR SEARCH BUTTON (X)
*/
const searchInput = document.getElementById('article-search');
const clearSearchButton = document.getElementById('article-search-clear');
if (searchInput) {
    const syncClearButton = () => {
        if (!clearSearchButton) return;
        clearSearchButton.hidden = searchInput.value.trim().length === 0;
    };

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        currentPage = 1;
        renderArticles(currentPage);
        syncClearButton();
    });

    if (clearSearchButton) {
        clearSearchButton.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            currentPage = 1;
            renderArticles(currentPage);
            syncClearButton();
            searchInput.focus();
        });
    }

    syncClearButton();
}

currentPage = getInitialPage(getTotalPages());
renderArticles(currentPage);

}

/**
 * ARTICLE PAGE TITLE + HEADING SYNC
*/
    const currentPath = normalizePath(window.location.pathname);
    const matchingArticle = articles.find((article) => {
        const articlePath = normalizePath(new URL(article.link, window.location.origin).pathname);
        return articlePath === currentPath;
    });

    if (matchingArticle) {
        const articleTitleElements = document.querySelectorAll('h1.article-title');
        articleTitleElements.forEach((titleEl) => {
            const isCustomTitle =
                titleEl.hasAttribute('custom-title');

            if (!isCustomTitle) {
                titleEl.textContent = matchingArticle.title;
            }
        });

        updatePublishedDate(matchingArticle.date);

        // updates meta tag for og:title and twitter:title
        updateMetaContent('meta[property="og:title"]', matchingArticle.title);
        updateMetaContent('meta[name="twitter:title"]', matchingArticle.title);
    }
});
