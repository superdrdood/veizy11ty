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

I’ve only been keeping regular records since late 2020, all dates before then were scraped from achievement/trophy acquisition so are not a complete picture. I have to manually get the image for each game, so older years don't have all the images yet. I'll be sure to add them if I ever get bored.

Select a game to show the dates I played and/or completed that game, and select a year to see games from different years.

Please enjoy this look into the games I have played!

<div class="year yearChosen" data-year="2024">2024</div>
<div class="year" data-year="2023">2023</div>
<div class="year" data-year="2022">2022</div>
<div class="year" data-year="2021">2021</div>
<div class="year" data-year="2020">2020</div>
<div class="year" data-year="2019">2019</div>
<div class="year" data-year="2018">2018</div>
<div class="year" data-year="2017">2017</div>
<div class="year" data-year="2016">2016</div>
<div class="year" data-year="2015">2015</div>
<div class="year" data-year="2014">2014</div>
<div class="year" data-year="2013">2013</div>
<div class="year" data-year="2012">2012</div>
<div class="year" data-year="2011">2011</div>
<div class="year" data-year="2010">2010</div>
<div class="year" data-year="2009">2009</div>
<div class="year" data-year="2008">2008</div>
<div class="year" data-year="2007">2007</div>

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