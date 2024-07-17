// ==UserScript==
// @name         Youtube Comments Sidebar
// @author       LuminarLeaf
// @namespace    Violentmonkey Scripts
// @description  Swaps the suggested videos sidebar with the comments on Youtube videos.
// @version      1.04
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

async function swapSidebar() {
    const comments = await isElementLoaded("#comments");
    const suggested = await isElementLoaded("#related");

    swapElements(comments, suggested);

    GM_addStyle(`
        #comments {
            padding: 0 10px;
        }
        #primary, #secondary {
            overflow-y: auto;
            max-height: calc(100vh - var(--ytd-masthead-height,var(--ytd-toolbar-height)));
            padding-top: 0 !important;
        }
        #primary {
            overflow-x: hidden;
        }
        #player {
            padding-top: var(--ytd-margin-6x);
        }
    `);
}

swapSidebar();

async function addSwapButton() {
    const commentsTitle = await isElementLoaded("#comments div#title");
    const swapButton = document.createElement("button");
    swapButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m320-160-56-57 103-103H80v-80h287L264-503l56-57 200 200-200 200Zm320-240L440-600l200-200 56 57-103 103h287v80H593l103 103-56 57Z"/></svg>`;
    swapButton.style = "background: none; border: none; cursor: pointer; padding: 0; margin: 0 0 0 auto; display: inline-block; vertical-align: middle; fill: var(--yt-spec-text-primary);";
    swapButton.onclick = swapSidebar;
    commentsTitle.appendChild(swapButton);
}

addSwapButton();
