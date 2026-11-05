
let iconSlowmove = 0;
let gameGui_beatHit = false;



function loadImagesGUI() {
  FMS_makeImage("HUD-Image:clock","assets/images/gameUI/oclock.png",
    275/* x */,-67/* y */,1/* z */,0.119/* scale */,"GUI"
  );
  
  FMS_makeImage("HUD-Image:clock", "assets/images/gameUI/missNote.png",
    272 /* x */ , 268 /* y */ ,0 /* z */ , 0.14 /* scale */ , "GUI"
  );
  
  FMS_makeImage("HUD-Image:clock", "assets/images/gameUI/point.png",
    106 /* x */ , 252 /* y */ ,0 /* z */ , 0.12 /* scale */ , "GUI"
  );
  
  // pauseMenu UI
  
  FMS_makeImage("HUD-Image:clock", "assets/images/gameUI/restart.png",
    80 /* x */ , 97 /* y */ , 11 /* z */ , 0.2 /* scale */ , "pauseMenu"
  );
  
  FMS_makeImage("HUD-Image:clock", "assets/images/gameUI/replay.png",
    83 /* x */ , 53 /* y */ , 11 /* z */ , 0.2 /* scale */ , "pauseMenu"
  );
  
  FMS_makeImage("HUD-Image:clock", "assets/images/gameUI/exit.png",
    86 /* x */ , 147 /* y */ , 11 /* z */ , 0.24 /* scale */ , "pauseMenu"
  );
}

function loadGameGui() {
  let bumpIconType = localStorage.getItem("FM : custom icon bumping");
  
  game.healthBars.bar = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.bar)
  game.healthBars.bar.src = game.modsFolder + "/images/healthBar.png"
  game.healthBars.bar.style.position = "absolute";
  game.healthBars.bar.style.left = "-5px";
  game.healthBars.bar.style.top = "310px";
  game.healthBars.bar.style.scale = 0.4;
  
  
  game.healthBars.value = document.createElement("progress");
  document.getElementById("health bars").appendChild(game.healthBars.value)
  game.healthBars.value.id = "healthBar-value"
  game.healthBars.value.style.cssText = `
  position: absolute;`
  game.healthBars.value.style.zIndex = "-1";
  game.healthBars.value.value = 50;
  game.healthBars.value.max = 100;
  game.healthBars.value.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);"
  game.healthBars.value.style.left = "56px";
  game.healthBars.value.style.top = "315px";
  game.healthBars.value.style.width = "480px"
  game.healthBars.value.style.height = "10px"
  game.healthBars.value.style.scale = 0.5;


  game.healthBars.timer = document.createElement("a");
  document.getElementById("GUI").appendChild(game.healthBars.timer)
  game.healthBars.timer.style.position = "absolute";
  game.healthBars.timer.innerText = "absolute";
  game.healthBars.timer.style.left = "140px";
  game.healthBars.timer.style.top = "-12px";
  game.healthBars.timer.style.width = "500px"
  game.healthBars.timer.style.scale = 0.5;
  game.healthBars.timer.innerText = "00:00/00:00"
  
  game.healthBars.score = document.createElement("a");
  document.getElementById("GUI").appendChild(game.healthBars.score)
  game.healthBars.score.style.position = "absolute";
  game.healthBars.score.innerText = "absolute";
  game.healthBars.score.style.left = "79px";
  game.healthBars.score.style.top = "325px";
  game.healthBars.score.style.width = "500px"
  game.healthBars.score.style.scale = 0.5;
  
  if (game.settings.botplay) {
    let botplayText = document.createElement("a");
    document.getElementById("GUI").appendChild(botplayText)
    botplayText.style.position = "absolute";
    botplayText.innerText = "botplay";
    botplayText.id = "botplayText";
    botplayText.style.left = "-129px";
    botplayText.style.top = "300px";
    botplayText.style.width = "500px"
    botplayText.style.scale = 0.5;
    
    botplayOpacity_In()
  }
  
  let time = document.createElement("a");
  document.getElementById("GUI").appendChild(time)
  time.style.position = "absolute";
  time.id = "songTime"
  time.style.visibility = 'hidden'
  time.innerText = "00:00";
  time.style.left = "300px";
  time.style.top = "50px";
  time.style.width = "200px";
  time.style.scale = 0.5;
  
  game.healthBars.missed = document.createElement("a");
  document.getElementById("GUI").appendChild(game.healthBars.missed)
  game.healthBars.missed.style.position = "absolute";
  game.healthBars.missed.innerText = "absolute";
  game.healthBars.missed.style.left = "300px";
  game.healthBars.missed.style.top = "325px";
  game.healthBars.missed.style.width = "200px"
  game.healthBars.missed.style.scale = 0.5;
  
  game.healthBars.bfIcon = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.bfIcon)
  game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  game.healthBars.bfIcon.style.position = "absolute";
  game.healthBars.bfIcon.style.left = "50px";
  game.healthBars.bfIcon.style.top = "68px";
  game.healthBars.bfIcon.style.scale = 0.07;

  game.healthBars.dadIcon = document.createElement("img");
  document.getElementById("health bars").appendChild(game.healthBars.dadIcon)
  game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
  game.healthBars.dadIcon.style.position = "absolute";
  game.healthBars.dadIcon.style.left = "-10px";
  game.healthBars.dadIcon.style.top = "68px";
  game.healthBars.dadIcon.style.scale = 0.07;
game.healthBars.bfIcon.style.cssText += "-webkit-transform: scaleX(-1); transform: scaleX(-1);"

  // v switch the image sens
  
  let modsVersion = document.createElement("a");
  document.getElementById("GUI").appendChild(modsVersion)
  modsVersion.id = "text modsVersion"
  modsVersion.style.position = "absolute";
  modsVersion.innerText = game.mainData["mods alt name"] +" v"+ game.mainData.version
  modsVersion.style.left = "-182px";
  modsVersion.style.top = "326px";
  modsVersion.style.width = "500px"
  modsVersion.style.scale = 0.3;
  FMstyle_putShadow(modsVersion.id,"black");

  
  let version = document.createElement("a");
  document.getElementById("GUI").appendChild(version)
  version.id = "text version"
  version.style.position = "absolute";
  version.innerText = "Funky.mit bêta v"+global.version;
  version.style.left = "-182px";
  version.style.top = "333px";
  version.style.width = "500px"
  version.style.scale = 0.3;
  FMstyle_putShadow(version.id,"black");
  
  loadImagesGUI();
  
  var iconSize = 0.07;
  var beatHitTime = 0;
  var iconSlowmovePut = false;
  var goldenApple = { value1: 0, value2: 0, value3: 0, }
  
  setInterval(() => {
    if (game.healthBars.bumpIcon == true) {
      if (bumpIconType == "default") {
        if (gameGui_beatHit == true) {
          iconSize = 0.08;
        } else {
          if (iconSize >= 0.07) {
          //iconSize -= 0.0002;            
            iconSize = iconSize / 1.008;
            
            game.healthBars.bfIcon.style.scale = iconSize;
            game.healthBars.dadIcon.style.scale = iconSize;
          }
        }
      }
        
      if (bumpIconType == "golden apple") {
        if (gameGui_beatHit == true) {
          iconSize = 0.08;
          goldenApple.value1 = 0.7;
          if (goldenApple.value3 == 1) {
            goldenApple.value2 = 2.9; // onbeat 1
            goldenApple.value3 = 0;
          } else {
            goldenApple.value2 = 2.5; // onbeat 2
            goldenApple.value3 = 1;
          }
        } else {
          if (iconSize >= 0.07) {
          //iconSize -= 0.0002;            
            iconSize = iconSize / 1.01;
            
            //game.healthBars.bfIcon.style.scale = iconSize;
            //game.healthBars.dadIcon.style.scale = iconSize;
          }
        }
        
        if (goldenApple.value1 <= 1) {
          goldenApple.value1 += 0.01;
        }
        
        if (goldenApple.value2 >= 1) {
          goldenApple.value2 = goldenApple.value2 / 1.09;
          
          game.healthBars.dadIcon.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.dadIcon.style.transform += "scaleX("+goldenApple.value2+")";
          
          game.healthBars.bfIcon.style.transform = "scaleY("+goldenApple.value1+")";
          game.healthBars.bfIcon.style.transform += "scaleX(-"+goldenApple.value2 +")";
        }
      }
    }
    
    if (game.BPM.beat4Hit == true && beatHitTime == 0) {
      beatHitTime = 1;
    } else if (game.BPM.beat4Hit == true && beatHitTime == 1) {
      beatHitTime = 0;
    }
    
    // icon
    
    game.healthBars.dadIcon.style.left = (Number.parseInt("-"+((game.health) * 2.45))+150) + "px";
    game.healthBars.bfIcon.style.left = (Number.parseInt("-"+((game.health) * 2.45))+190)+ "px";
    
    // game.healthBars.score
    
    if (game.health >= 100) {
      game.health = 100;
    }
    
    document.getElementById("healthBar-value").value = game.health;
    
    game.healthBars.score.innerText = "score :"+game.scores;
    game.healthBars.missed.innerText = "missed :"+game.missed;
    
    // botplay
    
    if (game.settings.botplay) {
      if (game.BPM.beat4Hit == true && beatHitTime == 0) {
        botplayOpacity_In()
      }
      
      if (game.BPM.beat4Hit == true && beatHitTime == 1) {
        botplayOpacity_Out()
      }
    }
  }, fpsToMS(50))
}

setInterval(() => {
  var timer = game.song.inst.currentTime;
  if (timer <= 9.9) {
    timer = ((game.song.inst.currentTime) + "").slice(0, 3)
  } else if (timer >= 99.9) {
    timer = ((game.song.inst.currentTime) + "").slice(0, 5)
  } else {
    timer = ((game.song.inst.currentTime) + "").slice(0, 4)
  }
  
  var duration = game.song.inst.duration;
  if (duration <= 9.9) {
    duration = ((game.song.inst.duration) + "").slice(0, 4)
  } else if (duration >= 99.9) {
    duration = ((game.song.inst.duration) + "").slice(0, 5)
  } else {
    duration = ((game.song.inst.duration) + "").slice(0, 3)
  }
  
  
  game.healthBars.timer.innerText = timer+"/"+duration;
},100)

function iconBeatHit() {
  gameGui_beatHit = true;
  
  var looop = setInterval(() => {
    gameGui_beatHit = false;
    clearInterval(looop);
  },50)
}

function FMS_health(value,reset) {
  Frechicon()

  if (value <= 0) {
    // global add
    if (game.health <= 99) {
      game.health -= value*0.3;
    }
  } else {
    // global remove
    game.health -= value;
  }

  if (game.health <= 0.1) {
    bfDiedAnimation({});
  }

  if (reset == true) {
    game.health = 0;
  }
  
  return game.health;
}

function Frechicon() {
  if (game.health <= 80) {
    game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/0.png";
  } else {
    game.healthBars.dadIcon.src = game.modsFolder +"/images/icons/"+ game.data.dad.icon + "/1.png";
  }

  if (game.health >= 20) {
    game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/0.png";
  } else {
    game.healthBars.bfIcon.src = game.modsFolder +"/images/icons/"+ game.data.bf.icon + "/1.png";
  }
}

// -------------

function botplayOpacity_In() {
  var css = FMS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 1, scale: 0.5 } // Y 50
  ])
  
  css.play()
  css.onfinish = function () { document.getElementById("botplayText").style.opacity = 1; }
}

function botplayOpacity_Out() {
  var css = FMS_makeCSSanim("botplayText", 0.5, "ease-out", "1", [
    { opacity: 0.2, scale: 0.51 } // Y 50
  ])
  
  css.play()
  css.onfinish = function() { document.getElementById("botplayText").style.opacity = 0; }
}
