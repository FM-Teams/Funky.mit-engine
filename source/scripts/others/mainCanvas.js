sessionStorage.setItem("FM : canvasMusic",false);

let canvas = {
  modsList: null,
  songList: null,
  music: null,
  playedSong: false,
  modsChoise: Number.parseInt(localStorage.getItem("mods choise"))
}

getModsList();

function getModsList() {
    // get the json file
    var rawFile = new XMLHttpRequest();
    var reload = 0;
    rawFile.open("get", "source/mods/modsList.json", true);
    rawFile.onreadystatechange = function() {
      reload++;
      if (rawFile.readyState === 4) {
        var allText = rawFile.responseText;
      }
      
      if (reload == 3) {
        if (allText == "Error 404, file not found.") {
          alert("getModsList | fail to get the file, reson: " + allText)
        } else {
          canvas.modsList = JSON.parse(allText);
          
          canvas.music = new Audio("source/mods/" + canvas.modsList.mods[Number.parseInt(localStorage.getItem("mods choise"))] + "/music/freakyMenu.ogg")
          canvas.music.onerror = function () {
            canvas.music = new Audio("source/assets/music/freakyMenu.ogg");
          };
          canvas.music.loop = true;
        }
      }
    }
  rawFile.send();
}

function playMusic() {
  if (!canvas.playedSong) {
    canvas.playedSong = true;
    canvas.music.play();
  }
}

setInterval(() => {
  if (canvas.playedSong) {
    if (sessionStorage.getItem("FM : canvasMusic") == "true") {
      if (canvas.music.volume !== 0.6) {
        canvas.music.volume = 0.6;
      }
    } else {
      if (canvas.music.volume !== 0) {
        canvas.music.volume = 0;
      }
    }
  } else {
    if (sessionStorage.getItem("FM : canvasMusic") == "true") {
      playMusic();
    }
  }
  
  if (sessionStorage.getItem("FM : canvasReload") == "true") {
    canvas.playedSong = false;
    canvas.music = null;
    canvas.music.pause();
    
    getModsList();
  }
},100)