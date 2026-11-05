let muted = false; 

function playChart_BF(type = game.song.chartType,chart = game.song.chart) {
  var timer = 0;
  var note = 0;
  var data = chart;
  
  game.song.inst.volume = 0;
  if (game.song.metadata["is Voice"]) {
    game.song.voice.volume = 0;
  }
      
  if (game.song.metadata["is Voice2"]) {
    game.song.voice2.volume = 0;
  }
  
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;

  if (chart == null) {
    alert("error when reading the chart | reason: "+chart)
  } else {
  var loopP = setInterval(() => {
    game.song.timer = game.song.inst.currentTime;
    
    if (game.song.inst.duration == Infinity) {
      // load duration before
      
      game.song.inst.currentTime = 100000000;
      game.song.inst.currentTime = 0;
      reloadSong = 1;
    }
    
    
    if (game.song.inst.currentTime * 1000 >= 200 && reloadSong == 1) {
      // replay the audio for avoid delay
      reloadSong = "finished";
      
      game.song.inst.currentTime = 0;
      if (!muted) {
        game.song.inst.volume = game.song.metadata["chart"]["Inst volume"];
      }
      if (game.song.metadata["is Voice"]) {
        game.song.voice.currentTime = 0;
        if (!muted) {
          game.song.voice.volume = game.song.metadata["chart"]["Voice volume"];
        }
      }
      
      if (game.song.metadata["is Voice2"]) {
        game.song.voice2.currentTime = 0;
        if (!muted) {
          game.song.voice2.volume = game.song.metadata["chart"]["Voice volume"];
        }
      }
      game.song.inst.volume = 1;
    }
    
    timer = game.song.inst.currentTime * 1000;
    if (game.settings.botplay) {
      timer = timer + (1600 - (game.notesSpeed - 1) * 100);
    } else {
      // this only code is remake by a github because -
      // i never successful and perfectly make notes generation statistics :‹ ( just look the old version bro )
      timer = timer + (1770 - (game.notesSpeed - 1) * 100);
    }
    
    if (A >= data.length) {
      localStorage.setItem(game.modsSelect+":"+o[0],game.scores)
      clearInterval(loopP)
      console.clear();
      console.info("bf chart ended")
    }


    if (timer >= data.length) {
      if (data[A].sectionNotes.length == 0) {
        A += 1;
      } else if (data[A].sectionNotes[B][0] <= timer && game.song.inst.volume !== 0) {
        if (B <= data[A].sectionNotes.length) {
          if (type == "pysch/solo") {
            if (data[A].mustHitSection) {
              generateNotes(data[A].sectionNotes[B][1],false,false,data[A].sectionNotes[B][0])
            } else {
              generateDadNotes(data[A].sectionNotes[B][1] + 3)
            }
          } else {
            if (type !== "inversed") {
              generateNotes(data[A].sectionNotes[B][1],false,false,data[A].sectionNotes[B][0])
            } else {
              generateDadNotes(data[A].sectionNotes[B][1]+3)
            }
          }
          
          if (data[A].sectionNotes[B][2] >= 0) {
            if (type == "pysch/solo") {
              if (data[A].mustHitSection) {
                makeLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2],data[A].sectionNotes[B][0]);
              } else {
                makeDadLongNotes(data[A].sectionNotes[B][1]+3,data[A].sectionNotes[B][2]);
              }
            } else {
              if (type !== "inversed") {
                makeLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2],data[A].sectionNotes[B][0]);
              } else {
                makeDadLongNotes(data[A].sectionNotes[B][1]+3,data[A].sectionNotes[B][2]);
              }
            }
     
      
          }
        }
        
        if (B <= data[A].sectionNotes.length && type == "pysch/solo") {
          if (data[A].sectionNotes[B][1] >= 3) {

            if (data[A].sectionNotes[B][2] >= 0) {
              makeDadLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
            }
          }
        }

        
        B++;
        if (B >= data[A].sectionNotes.length) {
          A += 1;
          B = 0;
        }
      }
    } else {}
  },0)
  }
}

function playChart_DAD(type = game.song.chartType,chart = game.song.chart) {
  var timer = 0;
  var note = 0;
  var data = chart;
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;
  
  if (chart == null) {
    alert("error when reading the chart | reason: "+chart)
  } else {
  var loopD = setInterval(() => {
    timer = game.song.inst.currentTime * 1000;
    timer = timer + 710;
    
    if (A >= data.length || game.playerDied) {
      clearInterval(loopD)
      console.info("dad chart ended")
    }


    if (timer >= data.length) {
      if (game.cam.asBf !== data[A].mustHitSection) {
        coreEvents_stepHit()
        
        stopBPM();
        var dat = Object.keys(data[A]) // Json key to array 
          
        var wait = setInterval(() => {
          if (dat.includes('BPM')) {
            startBPM(data[A].bpm);
            game.song.metadata.chart.BMP = data[A].bpm;
          } else {
            startBPM(game.song.metadata.chart.BPM);
          }
          clearInterval(wait);
        }, 20)
      }
      game.cam.asBf = data[A].mustHitSection;
      
      if (data[A].sectionNotes.length == 0) {
        A += 1;
      } else if (data[A].sectionNotes[B][0] <= timer && game.song.inst.volume !== 0) {
        if (B <= data[A].sectionNotes.length && type !== "pysch/solo") {
          if (type == "inversed") {
            // if true
            
            if (data[A].sectionNotes[B][1] <= 3) {
              generateDadNotes(data[A].sectionNotes[B][1]-3)
              if (data[A].sectionNotes[B][2] >= 0) {
                makeDadLongNotes(data[A].sectionNotes[B][1]-3,data[A].sectionNotes[B][2])
              }
            }
          } else {
            // default system
            if (data[A].sectionNotes[B][1] >= 3) {
              generateDadNotes(data[A].sectionNotes[B][1])
              if (data[A].sectionNotes[B][2] >= 0) {
                makeDadLongNotes(data[A].sectionNotes[B][1],data[A].sectionNotes[B][2])
              }
            }
            
          }
        }
        
        B++;
        if (B >= data[A].sectionNotes.length) {
          A += 1;
          game.song.inst.currentTime * 1000;
          //game.song.voice.currentTime = game.song.inst.currentTime - 0.0001
          //console.clear()

          if (beat == 1) {
            beat = 0;
          } else {
            beat = 1;
          }
          
          B = 0;
        }
      }
    }
  },0)
  }
}

function playChart_events(type,chart = game.song.events) {
  var timer = 0;
  var note = 0;
  var data = chart;
  
  var A = 0;
  var B = 0;
  var C = 0;
  var reloadSong = 0;
  var beat = 1;

  if (chart == null) {
    console.Log("error when reading the events | no events found ! ");
  } else {
  var loopP = setInterval(() => {
    
    if (A >= data.length || game.playerDied) {
      clearInterval(loopP)
      //console.clear();
      console.info("events ended")
    }
    timer = game.song.inst.currentTime * 1000;

    if (timer >= data.length) {
      if (data[A].length == 0) {
        A += 1;
      } else if (data[A][0] <= timer) {
        if (B <= data[A][1].length) {
          coreEvents_onEvents(data[A][1][B]);
        }
        B++;
        if (B >= data[A][1].length) {
          A += 1;
          B = 0;
        };
      };
    };
  },0)
  }
}