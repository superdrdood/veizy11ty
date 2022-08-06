---
title: "Spiced Rum Tracker"
date: "2022-08-06"
tags: 
  - "Fun projects"
  - "Website"
layout: layouts/post.njk
coverImage: "rumTrackerTitle.jpg"
excerpt: I have trackers for video games and kanji, why not a tracker for spiced rum too!
---

I've been meaning to do this for over a year but I finally got around to making a [Spiced Rum Tracker](/rum-tracker/)! And now I'm writing a blog about it two months after it went live!

## Rummy for my tummy

I used to drink a lot of Kraken because it's super tasty, but it was getting very popular. I was walking through Angel tube station and [the entire thing was branded with Kraken](https://www.piggy.co.uk/kraken-rum)! My non-conformist credibility was taking a nose dive so I had to do something. The something I decided was to drink every different spiced rum I could find. I like tracking things so decided to keep track of when and what I was drinking and what mixer I was drinking it with, but after a couple of weeks this was revealing a few truths I am choosing to ignore. Plan B was to simply rank all the rums against a bunch of factors.

Obviously, the only worthwhile mixers for spiced rums are Dr Pepper, pineapple juice, and ginger beer. Dr Pepper when you want something great, ginger beer when you want something interesting, and pineapple juice for when you want the healthy option (or you want to be most like a pirate). I've been rating each rum when drunk with each mixer, and also when drunk neat. The tracker also tracks how stylish a rum is, the price, the alcohol percentage, and uses maths to work out the all-important price per unit.

## Boring technical information

The tracker itself is quite simple. I have a spreadsheet where I put all of my rum information which can be saved as a CSV, then I straight copy/paste the CSV into a variable that Javascript can parse into an array. Javascript grabs the values from the rum array and builds the page, pretty standard stuff. I had to download images of all the rums and spent about an hour cutting them out, the vast majority had a clean white background so weren't a pain, the biggest problem was jpeg compression on some creating very blocky outlines after a magic wand delete. Making me use the pen tool, what a pain!

Originally I thought it would look fine if all the bottle images were the same height, but it ended up looking a bit silly. I never realised how much variance there was in bottle girth. Luckily I've been keeping all of my rum bottles for future projects so I spent some time measuring the height of all of them, and now the page resizes them so they're all to scale.

Whilst playing about with css filters I accidentally made one of the rum bottles into a silhouette and instantly remembered [this awesome tool](https://codepen.io/sosuke/pen/Pjoqqp) that uses filters to colour any black html element into a target hexcode. Obviously I made the bottles purple and had to find some justification for using them, so added in a mixer picker. The idea would be that clicking on a mixer would hide the rums I hadn't drunk with that mixer. This looked really cool with my test data that you can see in the title image, but once I put in the final data it turned out I had drunk every rum with every mixer so the silhouettes never appeared! It also made the functionality a bit weird as you can click on a mixer and nothing happens, because all of them have been drunk. This was incredibly annoying so I ended up throwing all that work away, and now clicking on a mixer sorts by rating with that mixer.

I loved the silhouettes so needed to find another use for them, and ended up using them for the rum rankings. Each rum is ranked out of five in a bunch of different categories, and I use the rum bottles themselves as the counter. It looks nice, but totally unnoticeable unless I point it out. *Good design is invisible* as they say.

## Things I would change

I wouldn't mind adding an overall rum ranking that averages the deliciousness and normalises against price and alcohol percentage, to give a more objective ranking to the rums. It would be easy enough to implement as soon as I decide on the formula. Everything else turned out pretty nice so I don't think I'd change anything.

However, I've got like 30 empty spiced rum bottles taking up space that I haven't done anything with yet, I should really get working on that. *Foreshadowing!*

## Conclusion

Spiced rum is great. Just below spiced rum in greatness is enjoying my [Spiced Rum Tracker](/rum-tracker/). Please enjoy responsibly!