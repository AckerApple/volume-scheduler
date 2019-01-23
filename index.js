var osascript = require('node-osascript');
let timedAppleScript = null

module.exports.run = function(wait, minutes){
  const script = `
  #set waitTime to 0
  #set runTime to 9

  set mins to runTime * 60
  set fadeUpTime to mins - (mins / 6)

  #detect airfoil
  tell application "System Events"
    set airfoilRunning to name of every process contains ("Airfoil")
  end tell
  
  log "airfoilRunning " & airfoilRunning
  log "Waiting for " & waitTime & " minutes"

  delay waitTime * 60

  if airfoilRunning then
    tell application "Airfoil"
      set (volume of every speaker) to 0
    end tell
  else
    set volume output volume 0
  end if

  log "Muting for " & runTime & " minutes"

  --display dialog "Muted for " & runTime

  delay fadeUpTime

  log (mins / 6) & " seconds left"

  if airfoilRunning then
    tell application "Airfoil"
      set (volume of every speaker) to .2
    end tell
  else
    set volume output volume 40
  end if

  delay (mins / 6)

  if airfoilRunning then
    tell application "Airfoil"
      set (volume of every speaker) to 1
    end tell
  else
    set volume output volume 100
  end if

  --display dialog "Mute program completed"

  return runTime
  `

  //kill any possible running timed AppleScript
  module.exports.cancel()
  
  timedAppleScript = osascript.execute(script, {waitTime:wait||0, runTime:minutes||9}, function(err, result, raw){
    if (err) return console.error(err)
    //console.log(result, raw)
    console.log("Timed AppleScript comlete", new Date().toString(), result)
    timedAppleScript = null
  });

  return timedAppleScript
}

//kill any possible running timed AppleScript
module.exports.cancel = function(){
  if( timedAppleScript ){
    console.log("killed prior timed AppleScript")
    timedAppleScript.stdin.pause();
    timedAppleScript.kill();
  }
}

module.exports.open = function( v ){
  const script = `
  tell application v to activate
  `
  osascript.execute(script, {v:v}, function(err, result, raw){
    if (err) return console.error(err)
    console.log(result, raw)
  });
}

module.exports.volume = function(v){
  const script = `
    #detect airfoil
    tell application "System Events"
      set airfoilRunning to name of every process contains ("Airfoil")
    end tell
    
    if airfoilRunning then
      tell application "Airfoil"
        set (volume of every speaker) to v
      end tell
    else
      set volume output volume v*100
    end if
  `
  osascript.execute(script, {v:v}, function(err, result, raw){
    if (err) return console.error(err)
    console.log(result, raw)
  });
}

module.exports.mute = function(){
  return module.exports.volume(0)
}

module.exports.unmute = function(){
  return module.exports.volume(1)
}