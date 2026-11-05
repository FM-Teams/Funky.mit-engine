let o = JSON.parse(sessionStorage.getItem("game"))
if (sessionStorage.getItem("game") == undefined || sessionStorage.getItem("game") == null || sessionStorage.getItem("game") == "") {
  PreError("game","fail to get data fom freeplay","null","mainGame","Null data found, pov: you skip everything just for play the mods",{ toMenu: true });
}

document.body.id = Math.random()*1000;  // avoild to the name confly

global.tab = "game";

let game = {
  canStart: false,
  isStarting: false,
  preGame: document.getElementById("PRE-GAME"),
  
  game: document.getElementById("GAME"),
  gui: document.getElementById("GUI"),
  ranks: document.getElementById("ranks"),
  playerDied: false,
  
  extensions: [],
  
  ranks: null,
  
  scores: 0,
  addScoresValue: [122,10,160],
  missed: 0,
  
  gameMods: {
    spaceForLive: false
  },
  
  dadName: null,
  bfName: null,
  gfName: null,
  
  characters: {
    dad: document.getElementById("Dad"),
    bf: document.getElementById("Boyfriend"),
    gf: document.getElementById("Girlfriend"),
    
    gfIdAnim: {
      NR: "gf NR",
      NL: "gf NL"
    },
    
    bfIdAnim: {
      L: "bf L",
      U: "bf U",
      D: "bf D",
      R: "bf R",
      miss: "bf Miss",
      hey: "bf hey"
    },
    
    dadIdAnim:{
      L: "dad L",
      U: "dad U",
      D: "dad D",
      R: "dad R",
      hey: "dad hey"
    }
  },
  
  
  health: 50,
  
  healthBars: {
    bumpIcon: true,
    
    iconPosition: {
      minPos: -95,
      maxPos: 85
    },
    timer: null,
    value: null,
    score: null,
    missed: null,
    bar: null,
    bfIcon: null,
    dadIcon: null 
  },
  
  
  BPM: {
    currentBPM: null,
    activate: false,
    time: 0,
    inMilliseconds: null
  },
  
  song: {
    BPM: null,
    events: null,
    timer: 0,
    onEnded: false,
    name: null,
    difficulties: null,
    chart: null,
    chartType: null,
    metadata: null,
    
    inst: null,
    voice: null,
    voice2: null
  },
  
  canMoveNote: true,
  
  notesPress: null,
  
  canLongNotes: {
    L: false,
    U: false,
    D: false,
    R: false
  },
  
  keyPress: {
    L: false,
    U: false,
    D: false,
    R: false
  },
  
  notesDefaultAngle: [0,0,0,0],
  notes:[null,null,null,null],
  notesSplash:[null,null,null,null],
  notesOpponent:[null,null,null,null],
  
  notesDefaultPosition: 0,
  
  notesOpponentGroup: document.getElementById("notes opponent"),
  notesGroup: document.getElementById("notes"),
  
  notesSpeed: null,
  
  notesSkinData: null,
  notesSkinSelecte: null,
  
  data: {
    bf: null,
    dad: null,
    gf: null
  },
  
  modChoiceData: null,
  mainData: null,
  
  settings: {
    devMods: true,
    
    soundOnPressNote: false,
    bumpingScreen: false,
    
    noteSplash: true,
    botplay: false,
    data: null,
    key: ["d","f","j","k"]
  },
  
  menuPause: {
    canMenuPause: true,
    activate: false
  },
  
  pauseGameState: false,
  
  charaIconFolder: null,
  musicFolder: null,
  soundsFolder: null,
  imagesFolder: null,
  modsSelect: "fail",
  songFolder: null,
  songSelect: null,
  modsFolder: null,
  songDifficulties: null,
  
  windowTitle: "",
  isCustomWindowTitle: false,
  
  stage: {
    data: null,
    
    dad: null,
    gf: null,
    bf: null,
    
    BG: null
  },
  
  cam: {
    moving: false,
    easing: "ease-in-out",
    type: 1,
    autoCam: true,
    asBf: false,
    
    speed: 4,
    angle: 0,
    x: 0,
    y: 0
  },
  
  events: {
    onBeatHit: false,
    onStepHit: false,
    onNotesHit: false,
    onGoodNotesHit: false,
    onMiss: false,
    onRandomKeyPress: false,
    onNotesOpponentHit: false,
    onDadIconWin: false,
    onBFIconWin: false
  }
};

if (game.settings.devMods) {
  eruda.init();
}

//load game mods

function loadStorageData() {

if (FMD_getStorage("FM : gameMods : spaceForLive") == "true") {
  game.gameMods.spaceForLive = true;
  FMS_playScript("spaceForLive",["scripts/game/gameModifiers/pressSpace.js"],false);
}


// make it if it not exist lol

FMD_setStorage("FM : setting key",FMD_getStorage("FM : setting key"))

FMD_setStorage("FM : custom icon bumping",FMD_getStorage("FM : custom icon bumping"))

// detect localStorage value

if (FMD_getStorage("FM : setting key") !== "null" && FMD_getStorage("FM : setting key") !== "0") {
  if (FMD_getStorage("FM : setting key").length >= 1) {
    game.settings.key = [FMD_getStorage("FM : setting key")[0],FMD_getStorage("FM : setting key")[1],FMD_getStorage("FM : setting key")[2],FMD_getStorage("FM : setting key")[3]]
  }
}

if (FMD_getStorage("FM : custom icon bumping") == "null") {
  FMD_setStorage("FM : custom icon bumping","default")
}

if (sessionStorage.getItem("FM : Botplay") !== undefined && sessionStorage.getItem("FM : Botplay") !== null && sessionStorage.getItem("FM : Botplay") !== "0")
{
  if (sessionStorage.getItem("FM : Botplay") == "true") {
    game.settings.botplay = true;
  } else {
    game.settings.botplay = false;
  }
}

}

// get file get file get file get file get...

getMainJson(o[0])

function getMainJson(yourmods) {
  var r = new XMLHttpRequest();
  var l = "mods/"+yourmods+"/meta.json";
  r.open("GET",l); r.onload = function () { 
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getMainJson","fail to load the mods '"+yourmods+".json'",l,"mainGame","Null file found, .....",{ toMenu: true });
    } else {
      // on load
      
        game.mainData = JSON.parse(r.responseText);
        
        game.modsSelect = yourmods;
        game.songSelect = o[1];
        game.song.name = o[1];  // just like up
        game.songDifficulties = o[2];
        game.song.difficulties = o[2]; // just like up
        game.songFolder = "mods/"+game.modsSelect+"/"+FMS_folder.songs+"/"+o[1]+"/"+o[2]
        game.modsFolder = "mods/"+game.modsSelect;
        game.imagesFolder = "mods/"+game.modsSelect+"/"+FMS_folder.imagesName;
        game.musicFolder = "mods/"+game.modsSelect+"/"+FMS_folder.music;
        game.charaIconFolder = game.imagesFolder+"/"+FMS_folder.imagesFolders.charactersIcon;
        game.soundsFolder = "mods/"+game.modsSelect+"/"+FMS_folder.sounds;
        
        getExtension()
      }
  }
  r.send();
}

function getExtension() {
  var r = new XMLHttpRequest();
  var l = "extensions/.extension";
  r.open("GET", l);
  r.onload = function() {
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getExtension", "fail to load the '.extension' file", l, "mainGame", "null found, did you remove it thinking it was useless :/ ?", { toMenu: true });
    } else {
      // on load
      
      game.extensions = r.responseText.split("\n");
        
      for (var i = 0; i < game.extensions.length; i++) {
        game.extensions[i] = game.extensions[i].substr(1,game.extensions[i].length)

        var tscript2 = document.createElement("script");
        tscript2.src = "extensions/"+game.extensions[i];
        document.body.appendChild(tscript2);
          
        if (i >= game.extensions.length - 1) {
          getMetadataJson();
            
          setTimeout(() => {
            loadStorageData();
          },1000)
        }
      }
    }
  }
  r.send();
}

function getMetadataJson() {
  var r = new XMLHttpRequest();
  var l = game.songFolder+"/"+FMS_fileExtension.metadata;
  r.open("GET",l); r.onload = function () { 
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getMetadataJson","fail to load 'metadata.json'",l,"mainGame","Null metadata found, so add the metadata.json the next time",{ toMenu: true });
    } else {
      // on load
      
 
      game.song.metadata = JSON.parse(r.responseText)
        
      game.notesSpeed = game.song.metadata.chart.speed;
      
      game.song.chartType = game.song.metadata["chart type"];
        
      game.dadName = game.song.metadata.assets.characters[2];
      game.gfName = game.song.metadata.assets.characters[1];
      game.bfName = game.song.metadata.assets.characters[0];
        
      game.BPM.currentBPM = game.song.metadata.chart.BPM;
      game.song.BPM = game.song.metadata.chart.BPM;
      game.canStart = true;
        
      getStageData(game.song.metadata.assets.stage)
      getNotesData(game.song.metadata.assets["notes skin"]);
      
      getChartJson();
      getEventsJson();
      
      onPreLoad()
    }
  }
  r.send();
}


function getChartJson() {
  var r = new XMLHttpRequest();
  var l = game.songFolder+"/"+FMS_fileExtension.chart;
  r.open("GET",l); r.onload = function () { 
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getChartJson","fail to load 'chart.FM'",l,"mainGame","Null chart found, i think you can't funkin on friday without bf scripts xd",{ toMenu: true });
    } else {
      // on load
      
      game.song.chart = JSON.parse(r.responseText)
    }
  }
  r.send();
}

function getEventsJson() {
  var r = new XMLHttpRequest();
  var l = game.songFolder + "/"+FMS_fileExtension.events;
  r.open("GET", l);
  r.onload = function() {
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      console.log("songs info | no events found !");
    } else {
      // on load
      
      game.song.events = JSON.parse(r.responseText)
      playChart_events("",game.song.events);
    }
  }
  r.send();
}


function getStageData(link) {
  var r = new XMLHttpRequest();
  var l = game.modsFolder + "/" + FMS_folder.stages + "/" + link + ".json";
  r.open("GET",l); r.onload = function () { 
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getStageData","fail to load '"+link+".json'",l,"mainGame","Null file found, the void is real !!!1!1!",{ toMenu: true });
    } else {
      // on load
      
      game.stage.data = JSON.parse(r.responseText);
      loadStage(game.stage.data);
    }
  }
  r.send();
}

function getNotesData(link) {
  var r = new XMLHttpRequest();
  var l = game.modsFolder+"/"+FMS_folder.imagesName+"/"+FMS_folder.imagesFolders.noteSkin+"/"+link+"/main.json";
  r.open("GET",l); r.onload = function () { 
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getNotesData","fail to load '"+link+".json'",l,"mainGame","Null file found,it not a rythme game without notes -bf",{ toMenu: true });
    } else {
      // load
      
      game.notesSkinData = JSON.parse(r.responseText)
      game.notesSkinSelecte = link;
        
      makeNote(153,"player"); // default is 270
      makeNote(-40,"opponent"); // default is 153
        
      NotesScriptLoop()
    }
  }
  r.send();
}


// pre-load

function loadStage(data) {
  for (var i = 0; i < data.stage.length; i++) {
  if (data.stage[i]["is animated ?"] == false) {
    game.stage.BG = document.createElement("img");
    document.getElementById("GAME").appendChild(game.stage.BG);
    
    game.stage.BG.id = "BG:"+data.stage[i].name
    game.stage.BG.style.position = "absolute";
    game.stage.BG.src = "mods/" + game.modsSelect + "/" + data.stage[i].src + ".png";
    game.stage.BG.onerror = function() {
      PreError("fail to load the background", false, false)
    }
    game.stage.BG.style.left = data.stage[i].position[0] + "px";
    game.stage.BG.style.top = data.stage[i].position[1] + "px";
    game.stage.BG.style.scale = data.stage[i].scale;
    game.stage.BG.style.zIndex = -10;
  } else {
    makeLocalAnim("BG:"+data.stage[i].name,"mods/" + game.modsSelect + "/" + data.stage[i].src, data.stage[i].length, data.stage[i].position[0], data.stage[i].position[1], data.stage[i].scale,"GAME", fpsToMS(data.stage[i].fps),true, 0, 0, false, data.stage[i]["Padding Length ?"])
    game.stage.BG = document.getElementById("BG:"+data.stage[i].name+" folder");
    game.stage.BG.style.zIndex = -10;
  }
  }
  
  if (data.characters["fixe cam"][0]) {
    document.getElementById("GAME").style.left = data.characters["fixe cam"][1][0]+"px";
    document.getElementById("GAME").style.top = data.characters["fixe cam"][1][1]+"px";
  }
  
  document.getElementById("GAME").style.scale = data["stage Zooms"]
  
  globalFunction_init();
}





function globalFunction_init() {
  getCharacters();
  
  loadPauseMenu();
  
  bfDiedInit();
  
  ranksInit();
}

var antiLoop = 0;
function onPreLoad() { if (antiLoop == 0 ) {
  // load all stage element
  
  const tscript = document.createElement("script");
  tscript.src = game.songFolder + "/main.js";
  document.body.appendChild(tscript);

  const tscript2 = document.createElement("script");
  tscript2.src = game.modsFolder + "/"+FMS_folder.scripts+"/onGame.js";
  document.body.appendChild(tscript2);

  // load audio
  
  if /* disable voice */ (game.song.metadata["is Voice"]) {
    game.song.voice = new Audio(game.songFolder+ "/Voice"+game.song.metadata["song type"]);
    game.song.voice.onerror = function () {
      PreError("fail to load 'voice' audio", false, false)
    }
    game.song.voice.volume = 0 //game.song.metadata["chart"]["Voice volume"];
  }
  
  if /* disable voice */ (game.song.metadata["is Voice2"]) {
    game.song.voice2 = new Audio(game.songFolder+ "/Voice2"+game.song.metadata["song type"]);
    game.song.voice2.onerror = function () {
      PreError("fail to load 'voice2' audio", false, false)
    }
    game.song.voice2.volume = 0 //game.song.metadata["chart"]["Voice volume"];
  }
  
  game.song.inst = new Audio(game.songFolder+ "/Inst"+game.song.metadata["song type"]);  
  game.song.inst.onerror = function () {
    PreError("fail to load 'Inst' audio", false, true)
  }
  game.song.inst.volume = 0;
  
  game.song.inst.onloadeddata = function () {
    songLoadedVerifier()
  }
  
  if (game.song.metadata["is Voice"]) {
    game.song.voice.onloadeddata = function () {
      songLoadedVerifier()
    }
  }
  
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.onloadeddata = function () {
      songLoadedVerifier()
    }
  }

  // other
  
  document.getElementById("menu songName").innerText = game.songSelect +" - "+game.songDifficulties;
  
  game.BPM.inMilliseconds = bpmTomillisecond(game.BPM.currentBPM)
  
  //gameEvents()
  
  antiLoop++;
  
}}

var songLoadedVerifier_value = 0;
function songLoadedVerifier() {
  if (songLoadedVerifier_value <= 4) {
  songLoadedVerifier_value++;
  
  if (game.song.metadata["is Voice"]) {
    if (game.song.metadata["is Voice2"]) {
      if (songLoadedVerifier_value >= 2) {
        endLoading()
      }
    } else {
      if (songLoadedVerifier_value >= 1) {
        endLoading()
      }
    }
  } else {
    if (songLoadedVerifier_value >= 0) {
      endLoading()
    }
  }
  }
}

function endLoading() {
  setTimeout(() => {
    if (game.isStarting == false) {
      onGameInit();
    }
  },1000)
  
  setTimeout(() => {
    if (game.isStarting == false) {
      FMS_makeCSSanim("loadingS", 0.06, "ease-in", "1", [
        { opacity: 0 }
      ]).onfinish = function() {
        document.getElementById("loadingS").remove();
      }
    }
  },3000)
}

  


function startingGlobalGame() {
  onGameStart();
  
  gameStart()
  game.isStarting = true;

  FMS_makeCSSanim("PressFoPlay", 0.25, "ease-in", "1", [
    { opacity: 0, top: "20px" }
  ]).onfinish = function() {
    document.getElementById("PressFoPlay").remove();
  }
}
  
function gameStart() {
  if (game.song.metadata["is Voice"]) {
    game.song.voice.play();
  }
  
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.play();
  }

  game.song.inst.play();
  
  game.cam.speed = game.song.metadata.assets["cam speed"] * 2.5;
  
  if (game.cam.speed <= 0) {
    PreError("'cam speed' value can't be negative",false ,true)
  }
  
  game.stage.bf = document.getElementById("Boyfriend");
  game.stage.gf = document.getElementById("gf");
  game.stage.dad = document.getElementById("dad");
  
  playChart_BF()
  playChart_DAD()
  
  notesKey();
  startBPM(game.BPM.currentBPM);
  if (FMD_getStorage("FM : mobile key") == "true") {
    MakeMobileButtonsNotes(true)
  }
  
  if (game.song.metadata["is Voice"]) {
    game.song.voice.onended = function () {
      game.healthBars.bumpIcon = false;
    }
  }

  game.song.inst.onended = function () {
    game.song.onEnded = true;
    onGameEnded();
    FMD_setStorage("FM : "+game.songSelect+""+game.modsSelect,game.scores);
    transition(4)
  }
}

function goBackmenu() {
  canvas_backgroundMusic(true);
  
  game.song.onEnded = true;
  game.isSongFinished = true; 
  transition(4);
}

// other

function playAnim(type) {
  if (type == 0) {
    bf_L()
  }
      
  if (type == 2) { // oups
    bf_U()
  }
      
  if (type == 1) {
    bf_D()
  }
      
  if (type == 3) {
    bf_R()
  }
  
  if (type == 4) {
    Dad_R()
  }
  
  if (type == 6) {
    Dad_U()
  }
  
  if (type == 5) {
    Dad_D()
  }
  
  if (type == 7) {
    Dad_L()
  }
}


// camera

/*
let pl = document.createElement("a");
document.getElementById("GUI").appendChild(pl)
*/

var isMoved = false;
var isMoved2 = false;
var loopMove = 0;

var camX = 0;
var camY = 0;
var camA = 0;

var oldCamShit = [0,0]

var pxCamX = "0px"
var pxCamY = "0px"

function camMove(x,y) { // took 1 hours, just for that 
  if (game.cam.type == 1) {
    pxCamX = x+"px";
    pxCamY = y+"px";
      
    document.getElementById("GAME").style.left = pxCamX;
    document.getElementById("GAME").style.top = pxCamY;
    
    game.cam.moving = true;
      
    // for no reson it inversed ?
    FMS_makeCSSanim("GAME", game.cam.speed * 0.3, game.cam.easing, 1, [
      { left: oldCamShit[0] }, { top: pxCamY }
    ]).onfinish = function() {
      oldCamShit = [pxCamX,pxCamY];
      game.cam.moving = false;
    }
  }
}

function camBeatHit() {
  // auto cam scroll
  if (game.cam.autoCam == true && !game.stage.data.characters["fixe cam"][0] && game.canMoveNote == true && game.pauseGameState == false && game.canStart == true && game.events.onBeatHit == true) {
    if /* cam as Dad */ (game.cam.asBf == false) {
      game.cam.x = game.stage.data.characters.cam.Dad[0];
      game.cam.y = game.stage.data.characters.cam.Dad[1];
    }
    
    if /* cam as BF */ (game.cam.asBf == true) {
      game.cam.x = game.stage.data.characters.cam.bf[0];
      game.cam.y = game.stage.data.characters.cam.bf[1];
    }
    
    if (camX !== game.cam.x) {
      camMove(game.cam.x,game.cam.y)
      
      camX = game.cam.x;
    }
  }
  
  // refresh game title
  
  if (game.menuPause.activate == true || game.isCustomWindowTitle) {
    if (game.isCustomWindowTitle) {
      sessionStorage.setItem("game title",game.windowTitle)
    } else {
      sessionStorage.setItem("game title",game.mainData.assets["custom Pause title text"])
    }
  } else {
    sessionStorage.setItem("game title","Funky.mit engine | "+game.songSelect)
  }
}

