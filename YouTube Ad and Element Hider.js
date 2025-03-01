// ==UserScript==
// @name         YouTube Ad and Element Hider
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Blocks ads and specific elements on YouTube.
// @author       Your Name
// @match        https://m.youtube.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to hide elements based on CSS selectors
    function hideElements() {
        const selectors = [
            '.ad-container',
            '#player-ads',
            '.ytp-ad-overlay-container',
            '#feed-pyv-container',
            '#feedmodule-PRO',
            '#homepage-chrome-side-promo',
            '#merch-shelf',
            '#pla-shelf',
            '#premium-yva',
            '#search-pva',
            '#shelf-pyv-container',
            '#video-masthead',
            '#watch-branded-actions',
            '#watch-buy-urls',
            '#watch-channel-brand-div',
            '.carousel-offer-url-container',
            '.promoted-videos',
            '.searchView.list-view',
            '.watch-extra-info-column',
            '.watch-extra-info-right',
            '.ytd-merch-shelf-renderer',
            '.ytd-search-pyv-renderer',
            'YTM-PROMOTED-VIDEO-RENDERER',
            '.list-view[style="margin: 7px 0pt;"]',
            'a[href^="http://www.youtube.com/cthru?"]',
            '.ytp-ad-progress',
            '.ytp-ad-progress-list',
            '#ad-image\\:22',
            '.ytd-action-companion-ad-renderer',
            '.ytp-ad-text-overlay:nth-of-type(1)'
        ];

        // Hide elements matching the selectors
        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
        });
    }

    // Initial run to hide elements on page load
    hideElements();

    // Observe changes to the DOM for dynamically loaded content
    const observer = new MutationObserver(hideElements);
    observer.observe(document.body, { childList: true, subtree: true });

    // Log information for debugging (optional)
    console.log("YouTube Ad and Element Hider is running.");
})();
