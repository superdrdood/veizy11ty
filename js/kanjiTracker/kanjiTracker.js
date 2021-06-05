// TODO!
// There is a JS insertbefore
// Use this if it is a single kanji, to put it straight at the top!
// Could event somehow sort them by length?
// Maybe also only show words that start with that kanji, or it's the first kanji if kana before hand. No idea how to check if it's a kana though!

let vocabMasterList = vocabList;
let kanjiMasterList = ankiKanjiList;

document.addEventListener("DOMContentLoaded", function(event) { 
	makeKanjiList();
	makeKanjiBar();
  });





function makeKanjiBar() {
	kanjiBar = document.getElementById("kanjiProgressBar");
	kanjiBar.innerHTML = "";

	matureTotal = 0;
	learningTotal = 0;
	unknownTotal = 0;

	for (i = 0; i < vocabMasterList.length; i++) {
		vocab = vocabMasterList[i];
		reading = vocab[3];
		writing = vocab[4];
		if (reading > 21) {
			matureTotal++;
		} else if (reading > 0) {
			learningTotal++;
		} else {
			unknownTotal++;
		}
	}

	kanjiProgressMature = document.createElement("div");
	kanjiProgressMature.classList.add("kanjiProgressMature");
	kanjiProgressMature.setAttribute("data-count", matureTotal);

	kanjiProgressLearning = document.createElement("div");
	kanjiProgressLearning.classList.add("kanjiProgressLearning");
	kanjiProgressLearning.setAttribute("data-count", learningTotal);

	kanjiProgressUnknown = document.createElement("div");
	kanjiProgressUnknown.classList.add("kanjiProgressUnknown");
	kanjiProgressUnknown.setAttribute("data-count", unknownTotal);


	kanjiBar.appendChild(kanjiProgressMature);
	kanjiBar.appendChild(kanjiProgressLearning);
	kanjiBar.appendChild(kanjiProgressUnknown);

	kanjiBar.style.gridTemplateColumns = matureTotal + "fr " + learningTotal + "fr " + unknownTotal + "fr";

}

function makeKanjiList() {

	kanjiContainer = document.getElementById("kanjiContainer");
	kanjiContainer.innerHTML = "";


	for(i = 0; i < kanjiMasterList.length; i++) {
		newKanjiDiv = document.createElement("div");
		newKanjiDiv.innerHTML = kanjiMasterList[i][0];
		newKanjiDiv.classList.add("kanji");

		mature = kanjiMasterList[i][1];
		learning = kanjiMasterList[i][2];
		unknown = kanjiMasterList[i][3];
		total = mature + learning + unknown;

		maturePercent = (mature / total) * 100;
		learningPercent = (learning / total) * 100;
		unknownPercent = (unknown / total) * 100;

		newKanjiDiv.setAttribute("data-mature", mature);
		newKanjiDiv.setAttribute("data-learning", learning);
		newKanjiDiv.setAttribute("data-unknown", unknown);

		background = "linear-gradient(to top,#935bb4 " + (100 - learningPercent.toFixed() - unknownPercent.toFixed()) + "%,#bc9cce " + (100 - learningPercent.toFixed() - unknownPercent.toFixed()) + "%,#bc9cce " + (100 - unknownPercent.toFixed()) + "%,#ffffff " + (100 - unknownPercent.toFixed()) + "%,#ffffff 100%)"




		newKanjiDiv.style.background = background;

		kanjiContainer.appendChild(newKanjiDiv);
		
	}



}










function doTheKanji(kanjiWant,kanjiList) {

	titleContainer = document.getElementById("vocabTitle");
	matureContainer = document.getElementById("vocabMature");
	learningContainer = document.getElementById("vocabLearning");
	unknownContainer = document.getElementById("vocabUnknown");

	titleContainer.innerHTML = "";
	matureContainer.innerHTML = "<h2>Mature</h2>";
	learningContainer.innerHTML = "<h2>Learning</h2>";
	unknownContainer.innerHTML = "<h2>Unknown</h2>";
	
	titleContainer.appendChild(document.createTextNode(kanjiWant));


	for (let i = 0; i < kanjiList.length; i++) {
		string = kanjiList[i][0];
		if (string.includes(kanjiWant)) {

			vocabContain = document.createElement("div");
			vocabContain.setAttribute("class", "vocab");
			
			kanjiContain = document.createElement("div");
			kanjiContain.setAttribute("class", "vocabKanji");
			kanjiContain.innerHTML = "<ruby>" + kanjiList[i][0] + "<rt>" + kanjiList[i][1] + "</rt></ruby>";
			
			englishContain = document.createElement("div");
			englishContain.setAttribute("class", "vocabEnglish");
			englishContain.appendChild(document.createTextNode(kanjiList[i][2]));

			vocabContain.appendChild(kanjiContain);
			vocabContain.appendChild(englishContain);

			if (kanjiList[i][3] === "0") {
				unknownContainer.appendChild(vocabContain);
			} else if (kanjiList[i][3] > 0 && kanjiList[i][3] < 21) {
				learningContainer.appendChild(vocabContain);
			} else {
				matureContainer.appendChild(vocabContain);
			}

		}
	}
}



  document.addEventListener('click', function(event) {
	if (event.target.className == "kanji") { // NEED TO FIX THIS TO WORK WITH MULTIPLE CLASSES
		
		document.getElementById("vocabContainer").classList.add("showVocab");

		previousPick = document.querySelector(".kanjiChosen");

		if (previousPick !== null) {
			previousPick.classList.remove("kanjiChosen");
		}

		event.target.classList.add("kanjiChosen");
		doTheKanji(event.target.innerHTML,vocabMasterList);

	}
	if (event.target.id == "vocabClose") {
		document.getElementById("vocabContainer").classList.remove("showVocab");
		document.querySelector(".kanjiChosen").classList.remove("kanjiChosen");
	};

	if (event.target.className == "listPicker") {
		if (event.target.innerHTML == "Default") {
			vocabMasterList = vocabList;
			kanjiMasterList = ankiKanjiList;
		} else if (event.target.innerHTML == "Jouyou") {
			vocabMasterList = dictVocabList;
			kanjiMasterList = jouyouKanjiList;
		}
		document.getElementById("vocabContainer").classList.remove("showVocab");
		makeKanjiList();
		makeKanjiBar();
	}

  });