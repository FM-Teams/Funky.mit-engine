let bfDied_SoundsEffect = null;
let bfDied_Ambiance = null;
let bfDied_end = null;

function bfDiedInit() {
  bfDied_SoundsEffect = new Audio(game.soundsFolder+"/fnf_loss_sfx.ogg");
  bfDied_Ambiance = new Audio(game.musicFolder+"/loss/gameOver.ogg");
  bfDied_Ambiance.loop = true;
  bfDied_end = new Audio(game.musicFolder+"/loss/gameOverEnd.ogg");
}



function bfDiedAnimation({ darkScreen = true }) {
  if (!game.playerDied) {
    characterBeatHit();
    game.playerDied = true;
  if (darkScreen) {
    var blackS = document.createElement("div")
    game.game.appendChild(blackS)
    blackS.style.width = "1300px";
    blackS.style.height = "1300px";
    
    blackS.style.top = ((game.characters.bf.style.top.split("px")[0])-300)+"px";
    blackS.style.left = ((game.characters.bf.style.left.split("px")[0])-300)+"px";
    
    blackS.style.position = "absolute";
    blackS.style.zIndex = "100";
    blackS.style.backgroundColor = "black";
    blackS.style.opacity = 0.8
    blackS.id = Math.random()*10;
    
    FMS_makeCSSanim(blackS.id, 0.7, "ease", 1,[{ opacity: 0 }, { opacity: 0.8 }]);
  }
  

  game.cam.autoCam = false;
  
  bfDied_SoundsEffect.play();
  bfDied_SoundsEffect.onended = function() {
    // after the died sfx
    
    // make the restart text/ for mobile specialy
    
    var text = FMS_makeText("","restart ?",100,100,100,1)
    text.style.width = "200px"
    text.id = Math.random();
    text.style.scale = 0.5;
    text.style.opacity = 0;
    text.onclick = function () {
      bfDiedevent_comeBack()
    };
    
    FMS_makeCSSanim(text.id, 2, "cubic-bezier(0.68, -0.6, 0.32, 1.6)", 1, [{ opacity: 1, scale: 1 }]).onfinish = function() {
      text.style.opacity = 1;
      text.style.scale = 1;
    };
    
    // load some things
    
    bfDied_Ambiance.play();
    
    game.cam.speed = 7;
    
    game.cam.x = game.stage.data.characters.cam.bf[0]-game.stage.data.characters["cam onLoss"].bf[0];
    game.cam.y = game.stage.data.characters.cam.bf[1]-game.stage.data.characters["cam onLoss"].bf[1];
    
    // play animation
    
    FMS_makeCSSanim("notes", 2, "ease", 1,[{ opacity: 0 }]).onfinish = function (param) {
      game.notesOpponentGroup.style.opacity = 0;
    };
    
    FMS_makeCSSanim("notes opponent", 2, "ease", 1, [{ opacity: 0 }]).onfinish = function(param) {
      game.notesGroup.style.opacity = 0;
    };
    
    FMS_makeCSSanim(game.game.id, 2, "ease-out", 1,[{ left: (game.cam.x)+"px", top: (game.cam.y)+"px" }]).onfinish = function (param) {
      game.game.style.left = game.cam.x+ "px";
      game.game.style.top = game.cam.y + "px";
    };
    
    FMS_makeCSSanim(game.preGame.id, 3, "ease-out", 1, [{ scale: 1.4 }]).onfinish = function() {
      game.preGame.style.scale = 1.4;
    };
  }
  
  game.characters.bf.style.zIndex = "101";
  
  document.getElementById("GUI").style.visibility = "hidden";
  game.song.inst.pause();
  
  if (game.song.metadata["is Voice"]) {
    game.song.voice.pause();
  }
    
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.pause();
  }
  
  
  function bfDiedevent_comeBack() {
    game.game.style.left = game.cam.x + "px";
    game.game.style.top = game.cam.y + "px";
      
    bfDied_Ambiance.pause();
    bfDied_end.play();
    s = true;
      
    FMS_makeCSSanim(document.body.id, 3, "ease", 1, [{ opacity: 0 }]).onfinish = function() {
      document.body.style.opacity = 0;
      window.location = "";
    };
  }
  
  function bfDiedevent_leave() {
    s = true;
    transition();

    setTimeout(() => {
      canvas_backgroundMusic(true);
      history.back()
    },1000)
  }
  
  FMS_playAnim("bf","Miss");
  
  setTimeout(() => {
    FMS_playAnim("bf","Miss");
  },800)
  
  var s = false;
  document.body.addEventListener("keydown",function (e) {
    if (e.key == "Enter" || e.key == "Space" && !s) {
      bfDiedevent_comeBack()
    }
    
    if (e.key == "Backspace" && !s) {
      bfDiedevent_leave()
    }
  })
  
  }
}