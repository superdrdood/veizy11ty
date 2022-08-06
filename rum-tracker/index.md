---
layout: layouts/page.njk
title: Spiced Rum Tracker
script:
  - /js/rumTracker/rumList.js
  - /js/rumTracker/rumTracker.js
style:
  - /css/rumTracker.min.css
eleventyNavigation:
  key: Games
  order: 1
---

Welcome to the Dood Vei Spiced Rum Tracker!

Here you can see all of the spiced rums I've drunk. Sort by a wide variety of traits, or filter by your favourite consumption vector.

**Note on ratings:** I can honestly say all of these rums were at least ok. Outside of one in particular I enjoyed every single drink of these I had, regarldess of what I mixed them with. Neat is a different story, but that's fine. I like to like things, especially when those things are spiced rums.

<h2>A whole bunch o rums</h2>

<ul id="rumSorter">
</ul>

<ul id="rumMixerPicker">
</ul>

<div id="rumTracker">
  <div>
  <div id="rumBig">
    <div class="rum">
      <div class="rumInfo"></div>
      <div class="rumImage">
        <img>
      </div>  
    </div>
  </div>
  </div>

  <div id="rumSingle">
    <div id="rumSticky">
      <div id="rumClose">x</div>
      <div id="rumSingleText">
        <h2 id="rumSingleTitle">Kraken</h2>
        <div id="rumStats">
          <div>
            <p>Price: £<span id="rumPrice">17.93</span><br>
            Volume: <span id="rumVolume">100</span>ml<br>
            Percentage: <span id="rumPercent">100</span>%<br>
            Total units: <span id="rumUnits">51</span><br>
            Price per unit: £<span id="rumUnitPrice">3.01</span></p>
            <h3>Style</h3>
            <div id="rumStyleBox"></div>
          </div>
          <div id="rumStatsImg"><img src="rums/kraken.png"></div>
        </div>
        <div id="rumTasty"><h3>Quality of Tastings</h3></div>
        <h3>Notes</h3>
        <p id="rumNotes">Super tasty or whatever.</p>
      </div>
    </div>
  </div>
</div>