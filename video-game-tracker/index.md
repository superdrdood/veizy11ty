---
layout: layouts/page.njk
title: Video Game Tracker
script:
  - /js/gameTracker/gamesList.js
  - /js/gameTracker/gameTracker.js
style:
  - /css/gameTracker.min.css
eleventyNavigation:
  key: Games
  order: 1
---

Welcome to the Dood Vei Video Game Tracker!

This page tracks all of the video games I have played and completed, along with the dates those things happened.

I’ve only been keeping regular records since late 2020, all dates before then were scraped from achievement/trophy acquisition so are not a complete picture.

Select a game to show the dates I played and/or completed that game, and select a year to see games from different years.

Please enjoy this look into the games I have played!

<div class="year yearChosen" data-year="2021">2021</div>
<div class="year" data-year="2020">2020</div>
<div class="year" data-year="2019">2019</div>
<div class="year" data-year="2018">2018</div>
<div class="year" data-year="2017">2017</div>
<div class="year" data-year="2016">2016</div>

<div class="examples">
    <div class="playedExample"><span>&nbsp;</span> Played</div>
    <div class="completedExample"><span>&nbsp;</span> Completed</div>
</div>

<div id="gameTrackerTop">

<table class="yearTable">
<thead></thead>
<tbody id="yearTableBody"></tbody>
</table>

<div id="gameInformation">
        <div id="infoClose">x</div>
        <img id="gameImg">
        <div id="gameName"></div>
        <div id="gamePlatform"></div>
        <div id="gameMore"></div>
</div>

</div>
<div id='gameDate'><h2></h2></div>
<div id='gamesIcons'>
<img src="img/0.jpg">
</div>