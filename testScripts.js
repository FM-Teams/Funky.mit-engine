
// put you test scripts here !

// load extension 
FMS_playScript("default library",
[
 "extensions/animate/animate v1.js",
 "extensions/storage/storage.js",
 
 "scripts/global/mainGlobal.js",
 
 "extensions/FML-Lua/Lua.js",
 "extensions/FML-Lua/Lua-exe.js"
],
false);


// make you text
//FMLUA_playScript("y","test.lua",false)

FMS_makeText("myText",["for test your \a scripts, go to 'app/source/scripts/other/testZone.js <-- "],window.innerWidth / 2,100)

FMS_playScript("",["extensions/xml.js"])

setTimeout(() => {
 
/*const e = loadXMLAnimation("assets/images/BOYFRIEND.png","assets/images/BOYFRIEND.xml")
e.animation["BF dead loop"]*/
},1000)

