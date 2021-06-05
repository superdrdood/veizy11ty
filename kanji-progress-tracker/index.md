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
  - /css/kanjiTracker.css
eleventyNavigation:
  key: Games
  order: 1
---

<div id="kanjiProgressBar"></div>

Here is my incredibly exciting Kanji Progress Tracker.

It shows all of the kanji I’m currently learning, with the colours showing my progress with vocabulary containing that kanji. Dark purple is classed as mature, light purple as learning, and white as unknown.

Choose bet


<div class="listPicker">Learning</div>
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