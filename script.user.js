// ==UserScript==
// @name         Youtube Comments Sidebar
// @author       LuminarLeaf
// @namespace    Violentmonkey Scripts
// @description  Swaps the suggested videos sidebar with the comments on Youtube videos.
// @version      1.0
// @match        *://www.youtube.com/watch*
// @noframes
// @run-at       document-idle
// @grant        GM_addStyle
// @homepage     https://github.com/LuminarLeaf/Youtube-Comments-Sidebar
// @downloadURL  https://github.com/LuminarLeaf/Youtube-Comments-Sidebar/raw/master/script.user.js
// @updateURL    https://github.com/LuminarLeaf/Youtube-Comments-Sidebar/raw/master/script.user.js

const isElementLoaded = async (selector) => {
    while (document.querySelector(selector) === null) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    return document.querySelector(selector);
};

const swapElements = (element1, element2) => {
    const parent1 = element1.parentElement;
    const parent2 = element2.parentElement;

    parent1.removeChild(element1);
    parent2.removeChild(element2);

    parent1.appendChild(element2);
    parent2.appendChild(element1);
};

(async () => {
    const comments = await isElementLoaded("#comments");
    const suggested = await isElementLoaded("#related");

    swapElements(comments, suggested);

    GM_addStyle(`
        #comments {
            padding: 0 10px;
        }
    `);
})();
