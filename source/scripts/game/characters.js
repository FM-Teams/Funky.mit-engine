try {
let chara = {}

function getCharacters() {
  var r = new XMLHttpRequest();
  var l = "mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[0]+"/main.fmc";
  r.open("GET", l);
  r.onload = function() {
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getCharacters", "fail to load the '"+game.song.metadata.assets.characters[0]+"/main.fmc' file", l, "characters.js", "null found, no rap without rapper :[", { toMenu: true });
    } else {
      game.data.bf = JSON.parse(r.responseText);
        
      getCharacters2()
    }
  }
  r.send();
}

function getCharacters2() {
  var r = new XMLHttpRequest();
  var l = "mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[2]+"/main.fmc";
  r.open("GET", l);
  r.onload = function() {
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getCharacters", "fail to load the '"+game.song.metadata.assets.characters[2]+"/main.fmc' file", l, "characters.js", "null found, you win the battle rap ! yay !", { toMenu: true });
    } else {
      game.data.dad = JSON.parse(r.responseText);
        
      getCharacters3();
    }
  }
  r.send();
}


function getCharacters3() {
  // get the json file
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[1]+"/main.fmc", true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
        alert("characters | fail to get '"+"mods/"+game.modsSelect+"/characters/"+game.song.metadata.assets.characters[1]+"/main.fmc' json file, reson: "+allText)
      } else {
        game.data.gf = JSON.parse(allText);
        
        loadCharacther()
        loadCharacther2()
        loadCharacther3()
        loadGameGui()
      } 
    }
  }
  rawFile.send();
}

let isDadMiss = false;
function loadCharacther() {
  var flipAll = false;
  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  if (game.data.bf["flipX ?"] == true) {
    if (game.stage.data.characters["flip-X"][0]) {
      flipAll = false;
    } else {
      flipAll = true;
    }
  }
  
  document.getElementById(`Boyfriend`).style.left = game.data.bf.position[0]+"px"
  document.getElementById(`Boyfriend`).style.top = game.data.bf.position[1]+"px"
  
  if (animList.includes('Neutre')) {
    makeLocalAnim("bf N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["Neutre"].anim,game.data.bf.animations["Neutre"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["Neutre"]["speed"],game.data.bf.animations["Neutre"]["isloop ?"],game.data.bf.animations["Neutre"]["position"][0],game.data.bf.animations["Neutre"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    if (animList.includes('NL')) {
      makeLocalAnim("bf NL",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["NL"].anim,game.data.bf.animations["NL"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["NL"]["speed"],game.data.bf.animations["NL"]["isloop ?"],game.data.bf.animations["NL"]["position"][0],game.data.bf.animations["NL"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'NL' animation")
    }
    
    if (animList.includes('NR')) {
      makeLocalAnim("bf NR",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["NR"].anim,game.data.bf.animations["NR"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["NR"]["speed"],game.data.bf.animations["NR"]["isloop ?"],game.data.bf.animations["NR"]["position"][0],game.data.bf.animations["NR"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'NR' animation")
    }
  }
  
  if (animList.includes('U')) {
    makeLocalAnim(game.characters.bfIdAnim.U,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["U"].anim,game.data.bf.animations["U"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["U"]["speed"],game.data.bf.animations["U"]["isloop ?"],game.data.bf.animations["U"]["position"][0],game.data.bf.animations["U"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'U' animation")
  }
  
  if (animList.includes('D')) {
    makeLocalAnim(game.characters.bfIdAnim.D,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["D"].anim,game.data.bf.animations["D"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["D"]["speed"],game.data.bf.animations["D"]["isloop ?"],game.data.bf.animations["D"]["position"][0],game.data.bf.animations["D"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'D' animation")
  }
  
  if (game.data.bf["flipX ?"] == true) {
    if (animList.includes('L')) {
      makeLocalAnim(game.characters.bfIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["L"].anim,game.data.bf.animations["L"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["L"]["speed"],game.data.bf.animations["L"]["isloop ?"],game.data.bf.animations["L"]["position"][0],game.data.bf.animations["L"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'L' animation")
    }

    if (animList.includes('R')) {
      makeLocalAnim(game.characters.bfIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["R"].anim,game.data.bf.animations["R"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["R"]["speed"],game.data.bf.animations["R"]["isloop ?"],game.data.bf.animations["R"]["position"][0],game.data.bf.animations["R"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'R' animation")
    }
  } else {
    if (animList.includes('L')) {
      makeLocalAnim(game.characters.bfIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["L"].anim,game.data.bf.animations["L"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["L"]["speed"],game.data.bf.animations["L"]["isloop ?"],game.data.bf.animations["L"]["position"][0],game.data.bf.animations["L"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'L' animation")
    }

    if (animList.includes('R')) {
      makeLocalAnim(game.characters.bfIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["R"].anim,game.data.bf.animations["R"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["R"]["speed"],game.data.bf.animations["R"]["isloop ?"],game.data.bf.animations["R"]["position"][0],game.data.bf.animations["R"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    } else {
      PreError("fail to found 'R' animation")
    }
  }
  
  // extra anim (DO NOT ADD !!)
  
  if (animList.includes('Miss')) {
    makeLocalAnim(game.characters.bfIdAnim.miss,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations["Miss"].anim,game.data.bf.animations["Miss"]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations["Miss"]["speed"],game.data.bf.animations["Miss"]["isloop ?"],game.data.bf.animations["Miss"]["position"][0],game.data.bf.animations["Miss"]["position"][1], flipAll, game.data.bf["Padding Length ?"])
  } else {
    PreError("fail to found 'Miss' animation")
  }
  
  // auto custom anim detection
  
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Neutre" &&  animList[i] !== "L" &&  animList[i] !== "U" &&  animList[i] !== "D" &&  animList[i] !== "R" && animList[i] !== "Miss") {
      makeLocalAnim("bf "+animList[i],game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[0] +"/"+ game.data.bf.animations[animList[i]].anim,game.data.bf.animations[animList[i]]["length"],game.stage.data.characters.bf[0],game.stage.data.characters.bf[1],game.data.bf.scale,"Boyfriend",game.data.bf.animations[animList[i]]["speed"],game.data.bf.animations[animList[i]]["isloop ?"],game.data.bf.animations[animList[i]]["position"][0],game.data.bf.animations[animList[i]]["position"][1], flipAll, game.data.bf["Padding Length ?"])
    }
  }
}

function loadCharacther2() {
  var flipAll = true;
  var animList = Object.keys(game.data.dad.animations) // Json key to array 
  if (game.data.dad["flipX ?"] == true) {
    if (game.stage.data.characters["flip-X"][2]) {
      flipAll = true;
    } else {
      flipAll = false;
    }
  }
  
  document.getElementById(`Dad`).style.left = game.data.bf.position[0]+"px"
  document.getElementById(`Dad`).style.top = game.data.bf.position[1]+"px"


  if (animList.includes('Neutre')) {
    makeLocalAnim("dad N",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["Neutre"].anim,game.data.dad.animations["Neutre"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["Neutre"]["speed"],game.data.dad.animations["Neutre"]["isloop ?"],game.data.dad.animations["Neutre"]["position"][0],game.data.dad.animations["Neutre"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  } else {
    PreError("fail to found 'Neutre' animation")
  }
  
  if (animList.includes('U')) {
    makeLocalAnim(game.characters.dadIdAnim.U,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["U"].anim,game.data.dad.animations["U"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["U"]["speed"],game.data.dad.animations["U"]["isloop ?"],game.data.dad.animations["U"]["position"][0],game.data.dad.animations["U"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  } else {
    PreError("fail to found 'U' animation")
  }
  
  if (animList.includes('D')) {
    makeLocalAnim(game.characters.dadIdAnim.D,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["D"].anim,game.data.dad.animations["D"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["D"]["speed"],game.data.dad.animations["D"]["isloop ?"],game.data.dad.animations["D"]["position"][0],game.data.dad.animations["D"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  } else {
    PreError("fail to found 'D' animation")
  }
  
  if (game.data.dad["flipX ?"] == true) {
    // inversed
    if (animList.includes('L')) {
      makeLocalAnim(game.characters.dadIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["L"].anim,game.data.dad.animations["L"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["L"]["speed"],game.data.dad.animations["L"]["isloop ?"],game.data.dad.animations["L"]["position"][0],game.data.dad.animations["L"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
    } else {
      PreError("fail to found 'L' animation")
    }
    
    if (animList.includes('R')) {
      makeLocalAnim(game.characters.dadIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["R"].anim,game.data.dad.animations["R"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["R"]["speed"],game.data.dad.animations["R"]["isloop ?"],game.data.dad.animations["R"]["position"][0],game.data.dad.animations["R"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
    } else {
      PreError("fail to found 'R' animation")
    }
  } else {
    if (animList.includes('L')) {
      makeLocalAnim(game.characters.dadIdAnim.L,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["L"].anim,game.data.dad.animations["L"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["L"]["speed"],game.data.dad.animations["L"]["isloop ?"],game.data.dad.animations["L"]["position"][0],game.data.dad.animations["L"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
    } else {
      PreError("fail to found 'L' animation")
    }

    if (animList.includes('R')) {
      makeLocalAnim(game.characters.dadIdAnim.R,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["R"].anim,game.data.dad.animations["R"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["R"]["speed"],game.data.dad.animations["R"]["isloop ?"],game.data.dad.animations["R"]["position"][0],game.data.dad.animations["R"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
    } else {
      PreError("fail to found 'R' animation")
    }
  }

  // extra anim (DO NOT ADD !!)
  
  if (animList.includes('Miss')) {
    isDadMiss = true;
    makeLocalAnim("dad Miss",game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations["Miss"].anim,game.data.dad.animations["Miss"]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations["Miss"]["speed"],game.data.dad.animations["Miss"]["isloop ?"],game.data.dad.animations["Miss"]["position"][0],game.data.dad.animations["Miss"]["position"][1], flipAll, game.data.dad["Padding Length ?"])
  } else {
    isDadMiss = false;
  }
  
  // auto custom anim detection
  
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Neutre" &&  animList[i] !== "L" &&  animList[i] !== "U" &&  animList[i] !== "D" &&  animList[i] !== "R" && animList[i] !== "Miss") {
      makeLocalAnim("dad "+animList[i],game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[2] +"/"+ game.data.dad.animations[animList[i]].anim,game.data.dad.animations[animList[i]]["length"],game.stage.data.characters.dad[0],game.stage.data.characters.dad[1],game.data.dad.scale,"Dad",game.data.dad.animations[animList[i]]["speed"],game.data.dad.animations[animList[i]]["isloop ?"],game.data.dad.animations[animList[i]]["position"][0],game.data.dad.animations[animList[i]]["position"][1], flipAll, game.data.dad["Padding Length ?"])
    }
  }
}

function loadCharacther3() {
  var flipAll = false;
  if (game.data.gf["flipX ?"] == true) {
    if (game.stage.data.characters["flip-X"][0]) {
      flipAll = false
    } else {
      flipAll = true;
    }
  }
  
  makeLocalAnim(game.characters.gfIdAnim.NL,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[1] +"/"+ game.data.gf.animations["NL"].anim,game.data.gf.animations["NL"]["length"],game.stage.data.characters.gf[0],game.stage.data.characters.gf[1],game.data.gf.scale,"Girlfriend",game.data.gf.animations["NL"]["speed"],game.data.gf.animations["NL"]["isloop ?"],game.data.gf.animations["NL"]["position"][0],game.data.gf.animations["NL"]["position"][1], flipAll, game.data.gf["Padding Length ?"]);
  
  makeLocalAnim(game.characters.gfIdAnim.NR,game.modsFolder +"/characters/"+ game.song.metadata.assets.characters[1] +"/"+ game.data.gf.animations["NR"].anim,game.data.gf.animations["NR"]["length"],game.stage.data.characters.gf[0],game.stage.data.characters.gf[1],game.data.gf.scale,"Girlfriend",game.data.gf.animations["NR"]["speed"],game.data.gf.animations["NR"]["isloop ?"],game.data.gf.animations["NR"]["position"][0],game.data.gf.animations["NR"]["position"][1], flipAll, game.data.gf["Padding Length ?"]);

  idleAnim();
}

// -------


let bfIdle = "bf N";
let dadIdle = "dad N";

function bf_L() {
  hideBf()
  bfIdle = game.characters.bfIdAnim.L
  
  document.getElementById(game.characters.bfIdAnim.L+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.L)
}

function bf_U() {
  hideBf()
  bfIdle = game.characters.bfIdAnim.U

  document.getElementById(game.characters.bfIdAnim.U+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.U)
}

function bf_D() {
  hideBf()
  bfIdle = game.characters.bfIdAnim.D
  
  document.getElementById(game.characters.bfIdAnim.D+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.D)
}

function bf_R() {
  hideBf()
  bfIdle = game.characters.bfIdAnim.R
  
  document.getElementById(game.characters.bfIdAnim.R+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.R)
}

function bf_miss() {
  hideBf()
  bfIdle = game.characters.bfIdAnim.miss
  
  document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 1
  playLocalAnim(game.characters.bfIdAnim.miss)
}

function hideBf() {
  playLocalAnim("bf N");
  
  document.getElementById("bf N folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.L+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.U+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.D+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.R+" folder").style.scale = 0;
  document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;

  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Miss" && animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R") {
      document.getElementById("bf "+animList[i]+" folder").style.scale = 0;
    }
  }
}


// Dad ( enemy )

function Dad_L() {
  hidedad()
  dadIdle = game.characters.dadIdAnim.L
  
  document.getElementById(game.characters.dadIdAnim.L+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.L)
}

function Dad_U() {
  hidedad()
  dadIdle = game.characters.dadIdAnim.U

  document.getElementById(game.characters.dadIdAnim.U+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.U)
}

function Dad_D() {
  hidedad()
  dadIdle = game.characters.dadIdAnim.D
  
  document.getElementById(game.characters.dadIdAnim.D+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.D)
}

function Dad_R() {
  hidedad()
  dadIdle = game.characters.dadIdAnim.R

  document.getElementById(game.characters.dadIdAnim.R+" folder").style.scale = 1
  playLocalAnim(game.characters.dadIdAnim.R)
}


function hidedad() {
  playLocalAnim("dad N");
  
  document.getElementById("dad N folder").style.scale = 0;
  if (isDadMiss) {
    document.getElementById("dad Miss folder").style.scale = 0;
  }
  document.getElementById(game.characters.dadIdAnim.L+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.U+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.D+" folder").style.scale = 0;
  document.getElementById(game.characters.dadIdAnim.R+" folder").style.scale = 0;

  var animList = Object.keys(game.data.dad.animations) // Json key to array 
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== "Miss" && animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R") {
      document.getElementById("dad "+animList[i]+" folder").style.scale = 0;
    }
  }
}


var gfIdle = 0;
var gf_noLoopAnim = 0;
function characterBeatHit(){
  var animList_BF = Object.keys(game.data.bf.animations) // Json key to array 
  var animList_DAD = Object.keys(game.data.dad.animations) // Json key to array 

  if (IsStopped_LocalAnim(bfIdle) == "true" && IsStopped_LocalAnim("bf N") == "true") {
        document.getElementById(game.characters.bfIdAnim.L + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.U + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.D + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.R + " folder").style.scale = 0;
        document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;

        document.getElementById("bf N folder").style.scale = 1;
        
        for (var i = 0; i < animList_BF.length; i++) {
          if (animList_BF[i] !== "Neutre" && animList_BF[i] !== "L" && animList_BF[i] !== "U" && animList_BF[i] !== "D" && animList_BF[i] !== "R" && animList_BF[i] !== "Miss") {
            document.getElementById("bf "+animList_BF[i]+" folder").style.scale = 0;
          }
        }
      playLocalAnim("bf N");
      }
  
  
      if (IsStopped_LocalAnim(dadIdle) == "true" && IsStopped_LocalAnim("dad N") == "true") {
        document.getElementById(game.characters.dadIdAnim.L + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.U + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.D + " folder").style.scale = 0;
        document.getElementById(game.characters.dadIdAnim.R + " folder").style.scale = 0;
      
        document.getElementById("dad N folder").style.scale = 1;
      
        for (var i = 0; i < animList_DAD.length; i++) {
          if (animList_DAD[i] !== "Neutre" && animList_DAD[i] !== "L" && animList_DAD[i] !== "U" && animList_DAD[i] !== "D" && animList_DAD[i] !== "R" && animList_DAD[i] !== "Miss") {
            document.getElementById("dad "+animList_DAD[i]+" folder").style.scale = 0;
          }
        }
        
        playLocalAnim("dad N");
      }
  
  

  
    //console.log(gfIdle)
  
  
  gfIdle++;
  
  if (gfIdle == 0 && IsStopped_LocalAnim("gf NR") == "true") {
    playLocalAnim("gf NL");
    
    document.getElementById("gf NR folder").style.scale = 0;
    document.getElementById("gf NL folder").style.scale = 1;
  } else if (gfIdle == 2 && IsStopped_LocalAnim("gf NL") == "true") {
    playLocalAnim("gf NR");
    
    document.getElementById("gf NR folder").style.scale = 1;
    document.getElementById("gf NL folder").style.scale = 0;
    gfIdle = -2;
  }
}

function idleAnim() {
hideBf()
hidedad()

document.getElementById("bf N folder").style.scale = 1;
document.getElementById("dad N folder").style.scale = 1;

//setInterval(() => {},0.5)
}

function FMS_playAnim(as = "bf",anim,isLoop){ // custom anim yay
  if (as == "bf") {
    document.getElementById(game.characters.bfIdAnim.L + " folder").style.scale = 0;
    document.getElementById(game.characters.bfIdAnim.U + " folder").style.scale = 0;
    document.getElementById(game.characters.bfIdAnim.D + " folder").style.scale = 0;
    document.getElementById(game.characters.bfIdAnim.R + " folder").style.scale = 0;
    document.getElementById(game.characters.bfIdAnim.miss+" folder").style.scale = 0;
    document.getElementById(as+" N folder").style.scale = 0;
  }

  if (as == "dad") {
    document.getElementById(game.characters.dadIdAnim.L + " folder").style.scale = 0;
    document.getElementById(game.characters.dadIdAnim.U + " folder").style.scale = 0;
    document.getElementById(game.characters.dadIdAnim.D + " folder").style.scale = 0;
    document.getElementById(game.characters.dadIdAnim.R + " folder").style.scale = 0;
    document.getElementById(as+" N folder").style.scale = 0;
  }
  
  if (as == "bf") {
    if (isLoop == false) {
      bfIdle = as+" "+anim;
    } else {
      bfIdle = as+" "+anim;
    }
  }
  
  if (as == "dad") {
    if (isLoop == false) {
      dadIdle = as+" "+anim;
    } else {
      dadIdle = as+" "+anim;
    }
  }
  
  var animList = Object.keys(game.data.bf.animations) // Json key to array 
  if (as == "dad") {
    animList = Object.keys(game.data.dad.animations)
  }
  
  if (as == "gf") {
    animList = Object.keys(game.data.gf.animations)
  }
  
  for (var i = 0; i < animList.length; i++) {
    if (animList[i] !== anim && animList[i] !== "Neutre" && animList[i] !== "L" && animList[i] !== "U" && animList[i] !== "D" && animList[i] !== "R" && animList[i] !== "Miss") {
      console.log(as+" "+animList[i]+" folder")
      document.getElementById(as+" "+animList[i]+" folder").style.scale = 0;
    }
  }
  
  document.getElementById(as+" "+anim+" folder").style.scale = 1;
  playLocalAnim(as+" "+anim)
}


} catch (error) {
  PreError(error, false, true)
}