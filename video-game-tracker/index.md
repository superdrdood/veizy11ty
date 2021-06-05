---
layout: layouts/page.njk
title: Video Game Tracker
script:
  - /js/gameTracker/gamesList.js
  - /js/gameTracker/gameTracker.js
style:
  - /css/gameTracker.css
eleventyNavigation:
  key: Games
  order: 1
---

Welcome to the Veizy Video Game Tracker!

This page tracks all of the video games I have played and completed, along with the dates those things happened.

I’ve only been keeping regular records since late 2020, all dates before then were scraped from achievement/trophy acquisition so are not a complete picture.

Select a game to show the dates I played and/or completed that game, and select a year to see games from different years.

Please enjoy this look into the games I have played!

<div class="year 2021 yearChosen">2021</div>
<div class="year 2020">2020</div>
<div class="year 2019">2019</div>
<div class="year 2018">2018</div>
<div class="year 2017">2017</div>
<div class="year 2016">2016</div>

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
</div>

</div>

<div id='gamesIcons'>
<img src="img/0.jpg">
</div>