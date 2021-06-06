---
layout: layouts/page.njk
title: Kanji Progress Tracker
script:
  - /js/kanjiTracker/jouyouKanji.js
  - /js/kanjiTracker/JMdict.js
  - /js/kanjiTracker/ankiVocab.js
  - /js/kanjiTracker/ankiKanji.js
  - /js/kanjiTracker/kanjiTracker.js
style:
  - /css/kanjiTracker.min.css
eleventyNavigation:
  key: Games
  order: 1
---

<div id="kanjiProgressBar"></div>

Here is my incredibly exciting Kanji Progress Tracker.

It shows all of the kanji I’m currently learning, with the colours showing my progress with vocabulary containing that kanji. Once a kanji is fully filled up with purple, it is mastered. Once all the kanji are filled up, I have completed the Japanese language, because that is obviously how languages work. Selecting a kanji will show my current Anki status for vocabulary containing that kanji. 

There are two views available. _Default_ view shows only kanji I'm currently learning compared to vocabulary I'm currently learning. This view makes my progress looks very impressive! _Jouyou_ view shows the 2,000ish jouyou kanji compared to the 16,000ish most-used Japanese words.

Choose a view:

<div class="listPicker chosen">Default</div>
<div class="listPicker">Jouyou</div>

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