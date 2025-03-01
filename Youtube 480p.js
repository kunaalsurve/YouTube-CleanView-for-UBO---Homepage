// ==UserScript==
// @name          Youtube HD
// @author        adisib
// @namespace     namespace_adisib
// @description   Select a youtube resolution and resize the player.
// @version       2024.01.17
// @match         https://*.youtube.com/*
// @noframes
// @grant         GM.getValue
// @grant         GM.setValue
// @downloadURL https://update.greasyfork.org/scripts/23661/Youtube%20HD.user.js
// @updateURL https://update.greasyfork.org/scripts/23661/Youtube%20HD.meta.js
// ==/UserScript==

// ... [rest of the header comments remain unchanged] ...

(function() {
  "use strict";

  // --- SETTINGS -------
  let settings = {
    changeResolution: true,
    preferPremium: true,
    targetRes: "large",              // Changed to "large" for 480p
    highFramerateTargetRes: "large", // Set to "large" for 480p on high framerate videos
    changePlayerSize: false,
    useCustomSize: false,
    customHeight: 600,
    autoTheater: false,
    flushBuffer: true,
    allowCookies: false,
    setResolutionEarly: true,
    enableErrorScreenWorkaround: true,
    useAPI: true,
    overwriteStoredSettings: true    // Temporarily true to apply the new setting
  };
  // --------------------

  // ... [rest of the script remains unchanged] ...

  // --- GLOBALS --------
  const DEBUG = false;
  const resolutions = ['highres', 'hd2880', 'hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny'];
  const heights = [4320, 2880, 2160, 1440, 1080, 720, 480, 360, 240, 144];
  let doc = document, win = window;
  let recentVideo = "";
  let foundHFR = false;
  let setHeight = 0;
  // --------------------

  // ... [rest of the functions and main logic remain unchanged] ...

  async function applySettings() {
    if (typeof GM != 'undefined' && GM.getValue && GM.setValue) {
      let settingsSaved = await GM.getValue("SettingsSaved");
      if (settings.overwriteStoredSettings || !settingsSaved) {
        Object.entries(settings).forEach(([k,v]) => GM.setValue(k, v));
        await GM.setValue("SettingsSaved", true);
      } else {
        await Promise.all(
          Object.keys(settings).map(k => { let newval = GM.getValue(k); return newval.then(v => [k,v]); })
        ).then((c) => c.forEach(([nk,nv]) => {
          if (settings[nk] !== null && nk !== "overwriteStoredSettings") {
            settings[nk] = nv;
          }
        }));
      }
      debugLog(Object.entries(settings).map(([k,v]) => k + " | " + v).join(", "));
    }
  }

  applySettings().then(() => {
    main();
    win.addEventListener("yt-navigate-finish", main, true);
  });
})();