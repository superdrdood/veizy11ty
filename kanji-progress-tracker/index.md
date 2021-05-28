---
layout: layouts/page.njk
title: Kanji Progress Tracker
script:
  - /js/ankiVocab.js
  - /js/ankiKanji.js
  - /js/kanjiTracker.js
style:
  - /css/kanjiTracker.css
eleventyNavigation:
  key: Games
  order: 1
---

<div id="kanjiProgressBar"></div>

Here is my incredibly exciting Kanji Progress Tracker.

It shows all of the kanji I’m currently learning, with the colours showing my progress with vocabulary containing that kanji. Once a kanji is fully filled up with purple, it is mastered. Once all the kanji are filled up, I have completed the Japanese language, because that is obviously how languages work. More kanji will be added as I get to them, and at some point I will switch over to a full jouyou kanji list. I’m not showing that now because it makes my progress look a bit pathetic.

Clicking on a kanji will show my current Anki status for vocabulary containing that kanji. Like the kanji list, the vocabulary list only shows ones I’m currently learning, but I can switch out to a massive dictionary vocabulary list pretty easily.

<div id="pageContainer">
    <div id="kanjiContainer" class="kanjiContainer">
    </div>
    <div id="vocabContainer"><div id="vocabClose">x</div>
        <div id="stickyVocab">
            <h2 id="vocabTitle"></h2>
            <div id="vocabMature"></div>
            <div id="vocabLearning"></div>
            <div id="vocabUnknown"></div>
        </div>
    </div>
</div>