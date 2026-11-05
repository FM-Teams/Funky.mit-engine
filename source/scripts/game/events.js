var beat = false;
var beat2 = false;

function ScreenBeat(intensity,speed) {
  function turnGUI(angle) {
    document.getElementById("GUI").style.transform = "rotate("+angle+"deg)";
  
    FMS_makeCSSanim(document.getElementById("GUI").id, 0.25, "ease-out", 1, [
      { transform: "rotate(0deg)" }
    ]).onfinish = function() {
      document.getElementById("GUI").style.transform = "rotate(0deg)";
    }
  }

  function turnGAME(angle) {
    document.getElementById("GAME").style.transform = "rotate("+angle+"deg)";
  
    FMS_makeCSSanim(document.getElementById("GAME").id, 0.25, "ease-out", 1, [
      { transform: "rotate(0deg)" }
    ]).onfinish = function() {
      document.getElementById("GAME").style.transform = "rotate(0deg)";
    }
  }

  if (beat) {
    turnGAME(-0.2);
    beat = false;
  } else {
    turnGAME(0.2);
    coreEvents_Beat2Hit();
    beat = true;
    if (beat2) {
      turnGUI(0.3)

      beat2 = false;
    } else {
      turnGUI(-0.3);
      beat2 = true;
    }
  }
}

// core function, you can use it for your full mods

function onGameStart() {
  
}

function onGameInit() {
  
}

function onGameEnded() {
  
}

function coreEvents_BeatHit() {
  beatHit()
}

function coreEvents_Beat2Hit() {}

function coreEvents_stepHit() {
  stepHit();
}

function coreEvents_onMiss(longNotes) {
  if (!longNotes) {
    game.scores -= game.addScoresValue[2];
  }
  
  if (!longNotes) {
    makeRanks("Bad", game.imagesFolder + "/ranks/Bad", { scale: 0.4 });
  }
  
  onMiss(longNotes);
}

function coreEvents_onNotesHit(longNotes) {
  if (!longNotes) {
    game.scores += game.addScoresValue[0];
  } else {
    game.scores += game.addScoresValue[1];
  }
  
  if (!longNotes) {
    if (game.ranks !== null) {
      makeRanks("Sick", game.imagesFolder + "/" + game.ranks.sick[0], {
        x: game.ranks.sick[1],
        y: game.ranks.sick[2],
        scale: game.ranks.sick[3]
      });
    } else {
      makeRanks("Sick","assets/images/ranks/Sick", {
        scale: 0.4
      });
    }
  }
  
  onNotesHit(longNotes);
}

function coreEvents_onEvents(data) {
  onEvents(data)
}

// all function events (don't use it, is for the mods)

function beatHit() {}

function beat2Hit() {}

function stepHit() {}

function onMiss(longNotes) {}

function onNotesHit(longNotes) {};

function onNotesOpponentHit() {};

function onEvents(data) {};

// 

function JULA_playSongFolderLua(path) {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get",game.songFolder+"/"+path, true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("Lua getFile | nan")
      } else {
        runLua(allText);
      }
    }
  }
  rawFile.send();
}

function camZoom(zoom = 1,ease = "ease-out",speed = 1) {
  var myAnimation = FMS_makeCSSanim("GAME",speed,ease,"1",[
    { transform: 'scale('+zoom+","+zoom+')' }
  ])
  
  myAnimation.play()
  myAnimation.onfinish = function () { 
    document.getElementById("GAME").style.transform = "scale("+zoom+","+zoom+")";
  }
}

function gameEvents() {
  
}

function cameraPos(x,y,angle,speed) {
  //in w.i.p
}
