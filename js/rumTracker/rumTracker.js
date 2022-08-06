let rumListGood;
let rumValues;
let rumTemplate;
let rumTracker;
let rumSorter;
let rumListSort;
let mixerList;
let rumInfoTemplate;
let mixSortArray;

let newRumSort;


document.addEventListener('DOMContentLoaded', function() {
    rumStart(); // Sets everything up
    rumCreate(); // Draws the rums to the page
    rumSort("Name"); // Initial sorts the rum
});

document.addEventListener('click', function(event) {
    if (event.target.dataset.sortvalue) {
        rumSort(event.target.dataset.sortvalue);
    }
    if (event.target.dataset.mixer) {
        toggleMixer(event.target.dataset.mixer);
    }
    if (event.target.closest(".rum")) {
        if (event.target.closest(".rum").classList.contains("chosenRum")) {
            clearRum();
            clearSide();
        } else if (document.querySelector("#rumTracker.chosenMixer")) {
            if (event.target.closest(".rum.chosenMixer")) {
                clearRum();
                selectRum(event.target.closest(".rum").dataset.index);
            }
        } else {
            clearRum();
            selectRum(event.target.closest(".rum").dataset.index);
        }
    }
    if (event.target.id == "rumClose") {
        clearRum();
    }
});

function rumStart() {
    rumListGood = rumListExplode();
    rumValues = Object.keys(rumListGood[0]);    
    rumTemplate = document.querySelector("#rumTracker .rum").innerHTML;    
    rumTracker = document.getElementById("rumBig");
    rumSorter = document.getElementById("rumSorter");
    rumSorter.innerHTML = "";

    rumInfoTemplate = document.querySelector("#rumSingleText").innerHTML;

    let rumSort = document.createElement("li");
    rumSort.innerHTML = rumValues[0];
    rumSort.dataset.sortvalue = rumValues[0];
    rumSorter.appendChild(rumSort);

    let rumSorters = ["Name","Percentage", "Price", "Price per Unit", "Height", "Style"];

    for (let i = 1; i < rumSorters.length; i++) {
        let rumSort = document.createElement("li");
        rumSort.innerHTML = rumSorters[i];
        rumSort.dataset.sortvalue = rumSorters[i];
        rumSorter.appendChild(rumSort);
    }

    let mixerElement = document.querySelector("#rumMixerPicker");

    for (let i = 0; i < mixerList.length; i++) {
        let newMixerSelect = document.createElement("li");
        newMixerSelect.innerHTML = mixerList[i];
        newMixerSelect.dataset.mixer = mixerList[i];
        mixerElement.appendChild(newMixerSelect);
    }

    clearAll();

}

function rumCreate() {

    rumTracker.innerHTML = "";

    for (let i = 0; i < rumListGood.length; i++) {

        let rumGuy = document.createElement("div");
        rumGuy.classList.add("rum");        
        rumGuy.innerHTML = rumTemplate;
        rumGuy.dataset.index = rumListGood[i]["index"];
        let rumMixings = Object.keys(rumListGood[i]["mix"]);

        rumGuy.dataset.mixers = "";

        for (let ii = 0; ii < rumMixings.length; ii++) {
            rumGuy.dataset.mixers += "[" + rumMixings[ii] + "]";
        }

        rumGuy.style.order = i;
        
        // Commented out because this was blocking page load for some reason. Need to investigate as this could lead to breaking the whole page if images are missing in the future
        //if (UrlExists("rums/" +  rumListGood[i].Name.toLowerCase() + ".png")) {
            rumGuy.querySelector(".rumImage img").src = "rums/" +  rumListGood[i].Name.toLowerCase() + ".png";
        //}

        rumGuy.querySelector(".rumImage img").style.maxHeight =  ((rumListGood[i].Height / 325) * 200) + "px";

        rumTracker.appendChild(rumGuy);        


    }
}

function rumSort(sortType) {
    sortElement = document.querySelector("[data-sortvalue='" + sortType + "'");
    rev = false;
    if (sortElement.classList.contains("rumValReverse")) {
        rev = false;
        sortElement.classList.remove("rumValReverse");
    } else if (sortElement.classList.contains("rumValSelected")) {
        rev = true;
        sortElement.classList.add("rumValReverse");
    } else {
        if (document.querySelector(".rumValSelected")){
            document.querySelector(".rumValSelected").classList.remove("rumValSelected");
        }
        if (document.querySelector(".rumValReverse")){
            document.querySelector(".rumValReverse").classList.remove("rumValReverse");
        }
        clearAll();
        document.querySelector("[data-sortvalue='" + sortType + "'").classList.add("rumValSelected");
        rev = false;
    }
    rumListSort = JSON.parse(JSON.stringify(rumListGood));

    rumListSort.sort((a, b) => a[sortType].localeCompare(b[sortType]));
    if (rev) {
        rumListSort.sort((b, a) => a[sortType].localeCompare(b[sortType]));
    }

    for (let i = 0; i < rumListSort.length; i++) {
        document.querySelector("[data-index='" + rumListSort[i]["index"] + "']").style.order = i;
        
    }
    if (document.querySelector(".sortedMixer")) {
        document.querySelector(".sortedMixer").classList.remove("sortedMixer");
    }

}

function rumListExplode() {
    let newRumList = [];
    properList = rumList2.split("\n");

    titlesListTemp = properList[0].split("|MIX|");

    titlesList = titlesListTemp[0].split("|");
    mixerList = titlesListTemp[1].split("|");

    for (let i = 1; i < properList.length; i++) {
        let newRumElement = {};

        let newRumMix = properList[i].split("|MIX|");

        let newRumTemp = newRumMix[0].split("|");
        console.log(newRumTemp);
        let newMix = newRumMix[1].split("|");

        
        let newMixElement = {}

        for (let ii = 0; ii < newMix.length; ii++) {
            if (newMix[ii]) {
                newMixElement[mixerList[ii]] = newMix[ii];
            }
        }   

        for (let ii = 0; ii < newRumTemp.length; ii++) {
            newRumElement[titlesList[ii]] = newRumTemp[ii];
        }
        
        newRumElement["mix"] = newMixElement;
        
        newRumList.push(newRumElement);

    }

    for (let i = 0; i < newRumList.length; i++) {
        newRumList[i]["index"] = i.toString();
    }

    return newRumList;

}

function selectRum(rum) { // chooses a rum when given the rum index
    clearSide();
    document.querySelector("#rumTracker").classList.add("chosenRum");

    document.querySelector("[data-index='" + rum + "']").classList.add("chosenRum");
    
    chosenRum = rumListGood[rum];

    newRumInfo = document.createElement("div");
    newRumInfo.innerHTML = rumInfoTemplate;
    
    newRumInfo.querySelector("#rumSingleTitle").innerHTML = chosenRum["Name"];
    newRumInfo.querySelector("#rumVolume").innerHTML = chosenRum["Volume"];
    newRumInfo.querySelector("#rumPrice").innerHTML = chosenRum["Price"];
    newRumInfo.querySelector("#rumPercent").innerHTML = chosenRum["Percentage"];
    newRumInfo.querySelector("#rumUnits").innerHTML = chosenRum["Units"];
    newRumInfo.querySelector("#rumUnitPrice").innerHTML = chosenRum["Price per Unit"];
    newRumInfo.querySelector("#rumStatsImg img").src = "rums/" +  rumListGood[rum].Name.toLowerCase() + ".png";
    newRumInfo.querySelector("#rumNotes").innerHTML = chosenRum["Notes"];
    newRumTasty = newRumInfo.querySelector("#rumTasty")

    document.querySelector("#rumSingleText").appendChild(newRumInfo);

    thisRumKeys = Object.keys(chosenRum["mix"]);

    thisRumImg = document.createElement("img");
    thisRumImg.src = "rums/" +  rumListGood[rum].Name.toLowerCase() + ".png";

    styleBox = document.querySelector("#rumStyleBox");


    newImgScale = document.createElement("div");
    newImgScale.classList.add("rumImgScale");
    
    for (let i = 0; i < chosenRum["Style"]; i++) {
        cloneImg = thisRumImg.cloneNode()
        newImgScale.appendChild(cloneImg);
    }
    for (let i = chosenRum["Style"]; i < 5; i++) {
        cloneImg = thisRumImg.cloneNode();
        cloneImg.classList.add("badRum");
        newImgScale.appendChild(cloneImg);
    }

    styleBox.appendChild(newImgScale);

    for (let i = 0; i < thisRumKeys.length; i++) {
        newImgScale = document.createElement("div");
        newImgScale.classList.add("rumImgScale");
        
        for (let ii = 0; ii < chosenRum["mix"][thisRumKeys[i]]; ii++) {
            cloneImg = thisRumImg.cloneNode()
            newImgScale.appendChild(cloneImg);
        }
        for (let ii = chosenRum["mix"][thisRumKeys[i]]; ii < 5; ii++) {
            cloneImg = thisRumImg.cloneNode();
            cloneImg.classList.add("badRum");
            newImgScale.appendChild(cloneImg);
        }

        newImgScale.innerHTML += thisRumKeys[i];
        newRumTasty.appendChild(newImgScale);
    }
}

function clearRum() { // unselects the rum
    if (document.querySelector(".rum.chosenRum")) {
        document.querySelector(".rum.chosenRum").classList.remove("chosenRum");
    }
    if (document.querySelector("#rumTracker.chosenRum")) {
        document.querySelector("#rumTracker.chosenRum").classList.remove("chosenRum");
    }
}

function clearMixer() { // unselects any mixer
    let mixers = document.querySelectorAll(".chosenMixer");
    for (let i = 0; i < mixers.length; i++) {
        mixers[i].classList.remove("chosenMixer");
    }
    if (document.querySelector(".sortedMixer")) {
        document.querySelector(".sortedMixer").classList.remove("sortedMixer");
    }    
}

function clearSide() { // clears the sidebar
    document.querySelector("#rumSingleText").innerHTML = "";
}

function clearAll() {
    clearRum();
    clearMixer();
    clearSide();
}

function toggleMixer(mixer) {


    sortElement = document.querySelector("[data-mixer='" + mixer + "'");
    rev = false;
    if (sortElement.classList.contains("rumValReverse")) {
        rev = false;
        sortElement.classList.remove("rumValReverse");
    } else if (sortElement.classList.contains("rumValSelected")) {
        rev = true;
        sortElement.classList.add("rumValReverse");
    } else {
        if (document.querySelector(".rumValSelected")){
            document.querySelector(".rumValSelected").classList.remove("rumValSelected");
            
        }
        if (document.querySelector(".rumValReverse")){
            document.querySelector(".rumValReverse").classList.remove("rumValReverse");
        }
        clearAll();
        document.querySelector("[data-mixer='" + mixer + "'").classList.add("rumValSelected");
        rev = false;
    }

    rumSortMix(mixer, rev);
    document.querySelector("#rumTracker").classList.add("chosenMixer");
            let mixerDrinks = document.querySelectorAll("[data-mixers*='[" + mixer + "]'");
        for (let i = 0; i < mixerDrinks.length; i++) {
            mixerDrinks[i].classList.add("chosenMixer");
        }    
}

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


function rumSortMix(mix,mixRev) {
    //let mixRev;

    mixSortArray = [];
    for (let i = 0; i < rumListGood.length; i++) {
        if (rumListGood[i]["mix"][mix]) {
            let newMix = {};
            newMix.mix = rumListGood[i]["mix"][mix];
            newMix.index = rumListGood[i]["index"];
            mixSortArray.push(newMix);
        }
    }    

    rumListSort = JSON.parse(JSON.stringify(mixSortArray));

    if (mixRev) {
        rumListSort.sort((a, b) => a["mix"].localeCompare(b["mix"]));
    } else {        
         rumListSort.sort((b, a) => a["mix"].localeCompare(b["mix"]));
    }

    let allRumElements = document.querySelectorAll(".rum");
    for (let i = 0; i < allRumElements.length; i++) {
        allRumElements[i].style.order = "";
    }
    for (let i = 0; i < rumListSort.length; i++) {
        document.querySelector("[data-index='" + rumListSort[i]["index"] + "']").style.order = i;
    }
    console.log(mixSortArray);
}