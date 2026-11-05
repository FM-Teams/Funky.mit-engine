let pauseSound = null;

function loadPauseMenu() {
  pauseSound = new Audio("mods/" + game.modsSelect + "/music/menuSong/cha-ching !!!.mp3")
  pauseSound.loop = true;
  
  setInterval(() => {
    if (pauseSound.volume <= 0.4 && game.menuPause.activate == true) {
      pauseSound.volume += 0.0007;
      stopBPM()
    }
  }, global.frameLimite)
}

// doom events

document.addEventListener('keydown', function(event) {
  if (event.key == "Enter") {
    if (game.isStarting == true && !game.playerDied) {
      document.getElementById("pauseMenu:resume").onclick()
    }
  }
  
  if (event.key == "Backspace" && game.menuPause.activate) {
    document.getElementById("pauseMenu:exit").onclick()
  }
})

window.onblur = function () {
  if (game.menuPause.activate == false && !game.playerDied && game.isStarting == true) {
    pauseMenu();
  }
}

// events

var pauseBG_opacity = 0
function playMenuSong() {
  // play menu songs
  if (game.menuPause.activate) {
    document.getElementById("pauseMenu").style.zIndex = 11; 
    pauseSound.volume = 0;
    pauseSound.play()
  } else {
    pauseSound.pause();
  }
}

function pauseMenu() {
  if (game.menuPause.activate == false) {
    // open
    FMS_makeCSS_opacity("pauseMenu",0.5,[0,1],"ease-out",1)
    
    stopBPM()
    
    game.menuPause.activate = true;
    game.pauseGameState = true;

    game.song.inst.pause()
    
    if (game.song.metadata["is Voice"]) {
      game.song.voice.pause()
    }
    
    if (game.song.metadata["is Voice2"]) {
      game.song.voice2.pause()
    }
    
    game.canMoveNote = false;
    playMenuSong();
    
    document.getElementById("pauseMenu").style.visibility = "visible";
  } else {
    // close
    document.getElementById("pauseMenu").style.top = "0px"; 
    FMS_makeCSS_opacity("pauseMenu",0.2,[1,0],"ease-out",1);
    FMS_makeCSS_Ypos("pauseMenu",0.2,[0,100],"ease-out",1);

    startBPM(game.song.metadata.chart.BPM);

    game.menuPause.activate = false;
    game.pauseGameState = false;

    game.song.inst.play();
    
    if (game.song.metadata["is Voice"]) {
      game.song.voice.play()
    }
    
    if (game.song.metadata["is Voice2"]) {
      game.song.voice2.play()
    }
    
    game.canMoveNote = true;
    playMenuSong()
    
    document.getElementById("pauseMenu").style.visibility = "hidden";
  }
}