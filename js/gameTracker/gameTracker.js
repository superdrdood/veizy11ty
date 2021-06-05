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


    newTable += "<td class ='" + classAdding + "' </td>";
    
    var newDate = loop.setDate(loop.getDate() + 1);
    loop = new Date(newDate);
  }

  newTable += "</tr>";

  document.getElementById("yearTableBody").innerHTML = newTable;
  }

function changeYear(year) {

}

document.addEventListener('click', function(event) {

  if (event.target.classList.contains("year")) {
    // Fix for different domains!

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
    
  }

  if (document.querySelector(".picked")) {
    document.querySelector(".picked").classList.remove("picked");
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

  if (event.target.className == "gameIcon") {
    index = gamesList.findIndex(game => game.id == event.target.dataset.id);
    document.querySelector("#gamesIcons").classList.add("gamePicked");
    event.target.classList.add("picked");

    gameName = document.getElementById("gameName");
    gamePlatform = document.getElementById("gamePlatform");
    gameImg = document.getElementById("gameImg");



    gameName.innerHTML = event.target.alt;
    gamePlatform.innerHTML = gamesList[index].platform;
    gameImg.src = event.target.src;

    document.querySelector(".yearTable").classList.add("gamePicked");

    playedTest = document.querySelectorAll("._" + event.target.dataset.id + "played");

    playedTest.forEach(function(userItem) {
      userItem.classList.add("_played");
    });

    completedTest = document.querySelectorAll("._" + event.target.dataset.id + "completed");

    completedTest.forEach(function(userItem) {
      userItem.classList.add("_completed");
    });
    
    document.querySelector("#gameTrackerTop").classList.add("popup");

  }

  if (event.target.id == "infoClose") {
    document.querySelector("#gameTrackerTop").classList.remove("popup");
  }


  if (event.target.localName == "td") {
    classes = event.target.classList;
    for (i = 0; i < classes.length; i++) {
      if(classes[i].charAt(0) == "_") {
        num = classes[i].replace(/[^0-9]/g,'');
        index = gamesList.findIndex(game => game.id == num);
      }
    }


  }

  });

  document.addEventListener('DOMContentLoaded', function() { // Hack to reorganise initial year as I don't want to fix the php!
    document.querySelector(".yearChosen").click();
}, false);