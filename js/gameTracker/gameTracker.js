filteredGames = gamesList;

function addToFilterList(game) { // This function checks the filtered list to see if the game already exists and if doesn't adds the game to it
  goodGame = true;

  if (filteredGames.length !== 0) {
    for (f = 0; f < filteredGames.length; f++) {
      if (filteredGames[f].id === game.id) {
        goodGame = false;
      }
    }
  }

  if (goodGame) {
    filteredGames.push(game);
  }
}

function getMonthName(month) {
    monthName = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    return monthName[month];
  };

function gameOnDate(date) { // returns the class for each cell of the table with idplayed or idcompleted
  gameDate = "";
  playedCount = 0;
  completedCount = 0;

  for (i = 0; i < gamesList.length; i++) {
      gamePlayed = false;
      gameCompleted = false;
      played = gamesList[i].played;
      completed = gamesList[i].completed;

      if (played.length > 0) {
        for (j = 0; j < played.length; j++) {
          if (played[j].includes(date)) {
            gamePlayed = true;
          }
        }
      }

      if (completed.length > 0) {
        for (j = 0; j < completed.length; j++) {
          if (completed[j].includes(date)) {
            gameCompleted = true;
          }
        }
      }

      if (gameCompleted) {
        gameDate += "_" + gamesList[i].id + "completed ";
        completedCount++;
        addToFilterList(gamesList[i]);
      }

      if (gamePlayed) {
        gameDate += "_" + gamesList[i].id + "played ";
        playedCount++;
        addToFilterList(gamesList[i]);
      }

    }

    if (playedCount > 0) {
      gameDate += "bigPlayed ";
    }

    if (completedCount > 0) {
      gameDate += "bigCompleted ";
    }
    return gameDate;
}

function drawGameTable(year) { // draw a new table using the year

  filteredGames = [];

  document.getElementById("yearTableBody").innerHTML = "";

  newTable = "";

  newTable += "<tr>";

  var start = new Date(year + "-01-01");
  var end = new Date(year + "-12-31");
  
  var loop = new Date(start);
  while(loop <= end){
    dateString = loop.getDate();
    if (dateString.toString().length === 1) {
      dateGood = "0" + loop.getDate();
    } else {
      dateGood = loop.getDate();
    }

    dateString = loop.getMonth() + 1;
    if (dateString.toString().length === 1) {
      monthGood = "0" + dateString;
    } else {
      monthGood = dateString;
    }

    dateNice = loop.getFullYear() + "-" + monthGood + "-" + dateGood;

    if (dateGood == "01") {
      newTable += "</tr><td>" + getMonthName(loop.getMonth()) + "</td>";
    }

    classAdding = gameOnDate(dateNice);


    newTable += "<td class ='" + classAdding + "' ></td>";
    
    var newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
  }

  newTable += "</tr>";

  document.getElementById("yearTableBody").innerHTML = newTable;
  }

function changeYear(year) {

}

function getYearsForGame(id) {
  yearsArray = [];  
  currentYear = document.querySelector(".yearChosen").dataset.year;
  //console.log(currentYear);
  for (i = 0; i < gamesList.length; i++) {
    if (gamesList[i].id == id ) {
      gameFound = i;
    }
  }
  for (i = 0; i < gamesList[gameFound].played.length; i++) {
    guy = gamesList[gameFound].played[i].substring(0,4);
    if (!yearsArray.includes(guy) && guy != currentYear) {
      yearsArray.push(guy);
    }
  }
  for (i = 0; i < gamesList[gameFound].completed.length; i++) {
    guy = gamesList[gameFound].completed[i].substring(0,4);
    if (!yearsArray.includes(guy) && guy != currentYear) {
      yearsArray.push(guy);
    }
  }
  return yearsArray;
}


function showTheGame(id) {
  index = gamesList.findIndex(game => game.id == id);
  document.querySelector("#gamesIcons").classList.add("gamePicked");
  iconGuy = document.querySelector("[data-id='" + id + "'");
  iconGuy.classList.add("picked");

  gameName = document.getElementById("gameName");
  gamePlatform = document.getElementById("gamePlatform");
  gameImg = document.getElementById("gameImg");
  gameMore = document.getElementById("gameMore");
  gameMore.innerHTML = "";

  gameMoreArray = getYearsForGame(id);

  if (gameMoreArray.length >= 1) {
    gameMore.innerHTML += "<div>Game also played in:</div>";    
    for (i = 0; i < gameMoreArray.length; i++) {
      if (i !== 0) {
        gameMore.innerHTML += "|";
      }
      gameMore.innerHTML += "<div class='year gameToo'>" + gameMoreArray[i] + "</div>";
    }
  }

  gameName.innerHTML = iconGuy.alt;
  gamePlatform.innerHTML = gamesList[index].platform;
  gameImg.src = iconGuy.src;

  document.querySelector(".yearTable").classList.add("gamePicked");

  playedTest = document.querySelectorAll("._" + id + "played");

  playedTest.forEach(function(userItem) {
    userItem.classList.add("_played");
  });

  completedTest = document.querySelectorAll("._" + id + "completed");

  completedTest.forEach(function(userItem) {
    userItem.classList.add("_completed");
  });
  
  document.querySelector("#gameTrackerTop").classList.add("popup");
}

function clearAll() {

  document.querySelector("#gameDate h2").innerHTML = "";

  currentIcons = document.querySelectorAll(".iconPlayed, .iconCompleted, .picked");
  for (i = 0; i < currentIcons.length; i++) {
    currentIcons[i].classList.remove("picked");
    currentIcons[i].classList.remove("iconPlayed");
    currentIcons[i].classList.remove("iconCompleted");
  }

  currentTable = document.querySelectorAll(".datePicked");

  for (i = 0; i < currentTable.length; i++) {
    currentTable[i].classList.remove("datePicked");
  }

  //document.querySelector(".picked").classList.remove("picked");
  document.querySelector("#gamesIcons").classList.remove("gamePicked");

  
  currentPlayed = document.querySelectorAll(".yearTable ._played");
  currentCompleted = document.querySelectorAll(".yearTable ._completed");

  currentPlayed.forEach(function(userItem) {
    userItem.classList.remove("_played");
  });

  currentCompleted.forEach(function(userItem) {
    userItem.classList.remove("_completed");
  });

  document.querySelector(".yearTable").classList.remove("gamePicked");

  document.querySelector("#gameTrackerTop").classList.remove("popup");

}


function showGamesOnDate(date) {

  // Only do it if the date has any games played!
  if (date.target.classList.length !== 0) {

    // Gets the date. Totally copied this from stackoverflow! No idea how ... works!
    let dateDay = [...date.target.parentNode.children].indexOf(date.target);

    monthIndex = date.target.parentElement;
    monthIndex = [...monthIndex.parentNode.children].indexOf(monthIndex);

    year = document.querySelector(".yearChosen").innerHTML;

    let pickedDate = new Date(year,monthIndex - 1,dateDay);

    formatDate = pickedDate.toLocaleString('default', { month: 'long' , year: 'numeric', day: 'numeric'});
    
    document.querySelector("#gameDate h2").innerHTML = formatDate;


    document.querySelector(".yearTable").classList.add("gamePicked");

    date.target.classList.add("datePicked");

    classes = date.target.classList;
    for (i = 0; i < classes.length; i++) {
      if(classes[i].charAt(0) == "_") {
        num = classes[i].replace(/[^0-9]/g,'');
        index = gamesList.findIndex(game => game.id == num);

        // Set the games to highlight and the rest of the games to fade
        document.querySelector("#gamesIcons").classList.add("gamePicked");
        
        if (classes[i].indexOf(num + "played") != "-1") {
          document.querySelector("#gamesIcons [data-id='" + gamesList[index].id + "']").classList.add("iconPlayed")
        }
        if (classes[i].indexOf(num + "completed") != "-1") {
          document.querySelector("#gamesIcons [data-id='" + gamesList[index].id + "']").classList.add("iconCompleted")
        }
      }
    }
  }
}


document.addEventListener('click', function(event) {

  if (event.target.classList.contains("year")) {
    // Fix for different domains!
    gameToo = false;

    if (event.target.classList.contains("gameToo")) {
      gameToo = true;
      pickedGame = document.querySelector(".gameIcon.picked");
      gameTooId = pickedGame.dataset.id;
    }

    clearAll();

    allYears = document.querySelectorAll(".year");

    for(i = 0; i < allYears.length; i++) {
      allYears[i].classList.remove("yearChosen");
    }

    event.target.classList.add("yearChosen");
    imgLocale = document.querySelector("#gamesIcons>img").src;
    imgLocale = imgLocale.split("/img/");

    document.getElementById("gamesIcons").classList.remove("gamePicked");
    document.getElementById("gamesIcons").innerHTML = "";

    document.querySelector(".yearTable").classList.remove("gamePicked");

    document.querySelector("#gameTrackerTop").classList.remove("popup");

    drawGameTable(event.target.innerHTML);

    for (i = 0; i < filteredGames.length; i++) {
        newImg = document.createElement("img");
        newImg.dataset.id = filteredGames[i].id;
        newImg.setAttribute("alt",filteredGames[i].name);
        newImg.setAttribute("title",filteredGames[i].name);
        newImg.setAttribute("class","gameIcon");
        newImg.setAttribute("src",imgLocale[0] + "/img/" + filteredGames[i].id + ".jpg");
        insertElement = document.getElementById("gamesIcons");
        insertElement.appendChild(newImg);
        yearTrue = false;
    }

    // TODO: Think up a better way to handle this please?
    if (filteredGames.length < 11) {
      insertElement.classList.add("oneRow");
    } else {
      insertElement.classList.remove("oneRow");
    }

    if (gameToo) {
      actualYear = document.querySelector("[data-year='" + event.target.innerHTML + "']");
      //console.log(actualYear);
      actualYear.classList.add("yearChosen");
      gameToo = false;
      showTheGame(gameTooId);
    }


    
  }

  if (event.target.classList.contains("gameIcon")) {
    clearAll();
    showTheGame(event.target.dataset.id);
  }

  if (event.target.id == "infoClose") {
    clearAll();
    //document.querySelector("#gameTrackerTop").classList.remove("popup");
  }


  if (event.target.localName == "td") {

    clearAll();

    showGamesOnDate(event);

  }

  });

  document.addEventListener('DOMContentLoaded', function() { // Hack to reorganise initial year as I don't want to fix the php!
    document.querySelector(".yearChosen").click();
}, false);