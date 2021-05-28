---
title: "Kanji Progress Tracker"
date: "2021-04-01"
categories: 
  - "uncategorised"
tags: 
  - "Furlough projects"
  - "NihonGoGoGo!"
layout: layouts/post.njk
coverImage: "kanjiTrackerTitle.png"
---

Here is my first furlough project this Easter.

I wanted to make something that tracked all of the Japanese kanji and vocabulary I'm currently learning, so I did! Here is my [Kanji Progress Tracker](http://192.168.1.148/wordpress/kanji-progress-tracker/).

I'm currently studying with [Anki](https://apps.ankiweb.net/) to help learn kanji. Anki is a flashcard app that uses spaced repetition to help you remember things. When you study a flashcard and get it right it will increase the interval before it shows you that card again. Get it wrong and it decreases the interval. As you learn a flashcard you'll see it less and less frequently which encourages it to enter your long-term memory.

My tracker pulls information from Anki and shows my progress towards learning vocabulary associated with each kanji. The kanji fill up as I get better with their vocabulary, with dark purple/light purple/white representing mature/learning/unknown respectively. Anki treat anything with an interval over 21 days to be mature, so I've used the same metric. I have to manually copy over my Anki database for it to update with my newest progress, which I plan on doing once a week or so.

My original plan was to show all 2000ish [jouyou kanji](https://en.wikipedia.org/wiki/J%C5%8Dy%C5%8D_kanji) and track my progress against all common Japanese words. I was able to do this, but it made my current progress look quite pathetic so I decided on the current view. Once I hit 500 kanji I will give the option to switch over to this as it's more in line with my longer term goals.

## Fun technical information

Here's a rundown of the technical problems I had to overcome to get this working.

### Finding common Japanese words

To gather the most common Japanese words, I planned on using [JMdict](https://www.edrdg.org/jmdict/j_jmdict.html), a really awesome Japanese/English dictionary that is free to use. It is massive and available as an XML with loads of useful meta-information about each word, such as it's frequency of use. It was a bit daunting at first to get my info from this file so I opted to use [EDict](http://www.edrdg.org/jmdict/edict.html) instead because it sounded easier. Edict is an offshoot of JMdict that simplifies it and gives each new word on one line of a file. I thought this would be better to use, but after reading [this helpful Reddit post](https://www.reddit.com/r/LearnJapanese/comments/95lnqx/if_you_need_a_je_dictionary_file_use_jmdict_not/), I swapped over to using JMdict. It ended up not being too hard to use.

JMdict gives each word an optional priority tag, with different types of priority to choose from. "News1" is for the 12,000 most used words based on usage in newspapers. I thought that was job done, but after filtering those words I noticed some obvious omissions. "Ichi1" is another frequency ranking that "only" has 8641 words, but did contain the ones that were missing from "News1". I think a combination of both is what I'll use going forwards; there's bound to be a lot of overlap so it won't give me 20k to learn.

### Extracting Anki information

I didn't bother with having php handle the Anki file, I used [DB Browser for SQ Lite](https://sqlitebrowser.org/) for that. It's entirely possible php can handle it, but I honestly didn't bother with trying. I exported the notes and cards tables from the Anki collection and saved them as CSVs. I then fed those to php which generated a JSON file that contained an array with all of the vocab I had studied, along with it's current interval. I am studying both reading and writing separately, and the JSON captures both.

I then compared my current status for each word with the massive dictionary list and voila! The [Kanji Progress Tracker](http://192.168.1.148/wordpress/kanji-progress-tracker/) was completed!

Unfortunately, my progress was horrendously tiny when compared to the roughly 10,000 most used Japanese words so I threw all that work behind php comments, and instead decided on only showing the words I'm currently learning, and not every word ever.

### Current issues

- The tracker is currently just for kanji so won't be picking up kana only words. I see no good solution for that! I could add all the kana to the top of the kanji list, and then pick any vocab that starts with them maybe? It's currently called the "Kanji Progress Tracker" so I can probably ignore this for now.
- Also, if something I'm learning doesn't exactly match with what's in the JMdict list it won't pick up either. Some of the vocab I've been putting into Anki has する on the end to denote it can be a verb, but the vocab in JMdict may not. An example is 「説明」 which in Basic Kanji Book is written as 「説明する」. I don't see any good way around this as I'd rather learn the vocabulary as it's written, rather than manually editing to match things better. I could put a rule in the script that says "If the only difference is する at the end, count it as the same" which isn't too bad, but I'm not sure how many other exception rules I'd have to write. If it's just this one I will do it, but if there are more I'd rather not slip down that slope just yet.
- I have separate stats for both reading and writing kanji, but couldn't think of a good design way to show them. My original idea was to have the kanji background split in half and show the progress of both, but I didn't know what to do on the vocab list pane. All the hard work in getting the stats is done, so as soon as I think of a design I'll do it.

These issues will be fixed when I hit 500 kanji and switch over to the massive common words comparison.

Check out the [Kanji Progress Tracker](http://192.168.1.148/wordpress/kanji-progress-tracker/).
