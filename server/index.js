const log = require('./log').log
const airFoil = require('../index')
const path = require('path')
const index = require('fs').readFileSync(path.join(__dirname,"app","index.html")).toString()
var url = require('url');

require("./auto-mute.js")

//log(require('os').hostname())

require('http').createServer((req,res)=>{
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
    const time = isNaN(query.time) ? 9 : Number(query.time)
    const wait = isNaN(query.wait) ? 0 : Number(query.wait)
    airFoil.run(wait, time)
    return res.end("running timed mute")
  }

  if( urlPath==='/cancel-timer' ){
    airFoil.cancel()
    return res.end("cancelled timer")
  }

  if( urlPath==='/volume' ){
    if( isNaN(query.volume) ){
      return res.end("invalid volume")
    }
    const volume = Number(query.volume) * .01
    airFoil.volume(volume)
    return res.end("volume "+volume)
  }

  if( urlPath==='/unmute' ){
    airFoil.volume(1)
    return res.end("unmute")
  }

  if( urlPath==='/mute' ){
    airFoil.volume(0)
    return res.end("mute")
  }

  res.writeHead(404, {"Content-Type": "text/html"})
  res.end("404")
})
.listen(8080,()=>log('server started'))
