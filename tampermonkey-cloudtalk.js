// ==UserScript==
// @name         Zetkin CloudTalk link script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Replace the tel: links in Zetkin with CloudTalk-compatible ct+tel://-links
// @author       Niklas Vanhainen <niklas.vanhainen@zetkin.org>
// @match        https://call.zetk.in/*
// @icon         https://www.google.com/s2/favicons?domain=zetk.in
// @grant        none
// ==/UserScript==

function editPhoneLink(element) {
    if(element.href.startsWith('tel:')) {
        element.href = element.href.replace(/^tel\:/, 'ct+tel://');
    }
}

const selector = '.TargetInfo-number a';

let el = document.querySelector(selector);
if (el) {editPhoneLink(el)}
new MutationObserver((mutationRecords, observer) => {
    Array.from(document.querySelectorAll(selector)).forEach((element) => {
        editPhoneLink(element);
    });
}).observe(document.documentElement, {
    childList: true,
    subtree: true
});
