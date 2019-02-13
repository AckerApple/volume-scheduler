const log = require('./log').log
const apple = require('../index')
const path = require('path')
const http = require('http')
const index = require('fs').readFileSync(path.join(__dirname,"app","index.html")).toString()
var url = require('url')

let lastTime = 0
const autoConfig = require("./auto-mute.js").config

//log(require('os').hostname())

apple.open("iHeartRadio")
.then(()=>apple.open("Airfoil"))
.then(()=>createServer())

function createServer(){
  return http.createServer((req,res)=>{
    const parts = req.url.split('?')
    const urlPath = parts.shift()

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query
    
    log(urlPath,query)

    if( urlPath==='/' ){
      res.writeHead(200, {"Content-Type": "text/html"})
      return res.end(index)
    }

    if( urlPath==='/timed-mute' ){
      const time = (isNaN(query.time) ? 9 : Number(query.time)) * 1000 * 60
      const wait = (isNaN(query.wait) ? 0 : Number(query.wait)) * 1000 * 60

      checkLastTime()

      doTimeMute(wait, time)
          
      return res.end(`running timed mute in ${wait}ms for ${time}ms`)
    }

    if( urlPath==='/nap' ){
      toggleNap()
      return res.end(autoConfig.paused ? "napping" : "awake")
    }
    
    if( urlPath==='/schedule-pause-toggle' ){
      autoConfig.paused = !autoConfig.paused
      return res.end(autoConfig.paused ? "paused" : "unpaused")
    }

    if( urlPath==='/cancel-timer' ){
      apple.cancel()
      return res.end("cancelled timer")
    }

    if( urlPath==='/volume' ){
      if( isNaN(query.volume) ){
        return res.end("invalid volume")
      }

      checkLastTime()

      const volume = Number(query.volume) * .01
      apple.volume(volume)

      return res.end("volume "+volume)
    }

    if( urlPath==='/unmute' ){
      checkLastTime()
      apple.volume(1)
      return res.end("unmute")
    }

    if( urlPath==='/mute' ){
      checkLastTime()
      apple.volume(0)
      return res.end("mute")
    }

    if( urlPath==='/config' ){
      return res.end( JSON.stringify(autoConfig) )
    }

    res.writeHead(404, {"Content-Type": "text/html"})
    res.end("404")
  })
  .listen(8080,()=>log('server started'))
}

function checkLastTime(){
  if( lastTime ){
    log("Last timeout cancelled")
    clearTimeout( lastTime )
  }
}

function doTimeMute(wait, time){
  function goFullVol(){
    if( autoConfig.inBreak ){
      log("not restoring volume, in break")
      return//do not restore volume
    }
    apple.volume(1)
    lastTime = 0
  }

  const midUp = time-time/7

  function beforeFullVol(){
    if( autoConfig.inBreak ){
      log("not partially restoring volume, in break")
    }else{
      apple.volume(25*.01)
    }
    
    lastTime = setTimeout(goFullVol, time-midUp)
  }

  function afterWait(){
    apple.volume(0)


    //start to turn volumn up
    lastTime = setTimeout(beforeFullVol, midUp)
  }

  lastTime = setTimeout(afterWait, wait)
}

function toggleNap(){
  const paused = autoConfig.paused
  autoConfig.paused = !paused//toggle

  if( autoConfig.paused ){
    if( !autoConfig.inBreak ){
      apple.volume(40 * .01)//soft mute start
      
      lastTime = setTimeout(()=>{
        apple.volume(30 * .01)
        lastTime = setTimeout(()=>{
          apple.volume(20 * .01)
          lastTime = setTimeout(()=>{
            apple.volume(15 * .01)
            lastTime = setTimeout(()=>{
              apple.volume(5 * .01)
              lastTime = setTimeout(()=>{
                apple.volume(0)
              }, 40000)
            }, 40000)
          }, 40000)
        }, 40000)
      }, 40000)
    }

    
  }else if( !autoConfig.inBreak ){
     apple.volume(1)
  }
}