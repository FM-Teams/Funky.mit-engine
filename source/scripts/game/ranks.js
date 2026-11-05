function ranksInit() {
  var r = new XMLHttpRequest();
  var l = game.modsFolder+"/"+FMS_folder.data+"/ranks.json";
  r.open("GET", l);
  r.onload = function() {
    if (r.responseText == "Error 404, file not found." || r.responseText == "" || r.responseText == null) {
      // when onError or null
      
      PreError("getExtension", "fail to load the 'ranks.json' file", l, "ranks", "null found, i can't verified your skill sorry :T.", { toMenu: false });
    } else {
      game.ranks = JSON.parse(r.response);
    }
  }
  r.send();
}

function makeRanks(type,src,{ scale = 0.5, x = 0, y = 0 }) {
  // it look like a mes as first see xd
  if (FMD_getStorage("FM : show ranking?") == "true") {
  
    var r = document.createElement("img");
    document.getElementById("ranks").appendChild(r)
  
    r.onerror = function() {
      r.src = "assets/images/ranks/" + type + ".png"
    }
  
    r.src = src+".png";
    r.style.cssText = "position: absolute; scale:"+scale+";";
    r.style.left = (150+x)+"px";
    r.style.top = (50+y)+"px";
    r.id = Math.random()+"";
  
    FMS_makeCSSanim(r.id,0.5,"ease-in",1,[{ opacity: 0 }]).onfinish = function () {
      r.style.opacity = 0;  // set opacity animation
    }
  
    var xx = 0;
    var yy = 0;   
    var yyTorque = -0.2;
    var xxTorque = Number.parseInt("-"+(Math.random()*1 - Math.random()*0.5));
    var e = setInterval(() => {
      r.style.top = ((50+y)+yy)+"px";  // use all delay for the position
      r.style.left = ((150+x)+xx)+"px";   
      
      yy = yy+yyTorque;
      xx = xx+xxTorque;
      xxTorque += 0.02;
      yyTorque += 0.07;
    
      if (yy >= 30) {
        // delete after reched the pos
        r.remove()
        clearInterval(e);
      }
    },10)
  }
}


// makeRanks("","Good",{ scale: 0.4 })