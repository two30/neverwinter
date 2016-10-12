// ==UserScript==
// @name        Neverwinter Forum Filter
// @namespace   https://two30.github.io/neverwinter/
// @match       http://*.arcgames.com/*
// @match       https://*.arcgames.com/*
// @version     0.3
// @grant       none
// ==/UserScript==

var ignoreList = {
    "troll": true,
    "troll#0002": true,
    "troll3": true
};

var hiddenNodes = {};

function hideNode(node, author, quoteAuthor) {
    "use strict";
    var id = node.id;
    hiddenNodes[id] = node.cloneNode(true);
    var html = "<div class=\"CommentHeader\">A comment by " + author;
    if (quoteAuthor) {
        html += " that quotes " + quoteAuthor;
    }
    html += " has been filtered. Click to reveal.</div>";
    node.innerHTML = html;
    node.style.textAlign = "center";
    node.onclick = function () {
        node.parentNode.replaceChild(hiddenNodes[id], node);
    };
}

function checkNode(node) {
    "use strict";
    var author = node.getElementsByClassName("PhotoWrap");
    if (author.length === 0) {
        return;
    }
    author = author[0].title;
    if (ignoreList[author]) {
        hideNode(node, author);
        return;
    }
    var quotes = node.getElementsByClassName("QuoteAuthor");
    var quoteAuthor;
    var i = 0;
    while (i < quotes.length) {
        quoteAuthor = quotes[i].firstChild.textContent;
        if (ignoreList[quoteAuthor]) {
            hideNode(node, author, quoteAuthor);
            return;
        }
        i += 1;
    }
}

function main() {
    "use strict";
    var nodeList = document.getElementsByClassName("Item ItemComment");
    var i = 0;
    while (i < nodeList.length) {
        checkNode(nodeList[i]);
        i += 1;
    }
}

main();
