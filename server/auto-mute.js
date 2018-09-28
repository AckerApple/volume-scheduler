const log = require('./log')
const airFoil = require('../index')
const timeSheets = require('./timeSheets').timeSheets

const mins = [
  0,
  60000,
  120000,
  180000,//3mins
  240000,
  300000,//5mins
  360000,
  420000,
  480000,//8mins
  540000,
  600000//10mins
]

const hour1 = 3600000
let tsIndex = 0

function scheduleNext(){
  const startOver = tsIndex===timeSheets.length-1
  
  if( startOver ){
    log.log("Shows over")
    airFoil.volume(30 * .01)
    setTimeout(()=>process.exit(), 3000)
    return
  }

  tsIndex = startOver ? 0 : tsIndex+1
  scheduleTimeSheet( timeSheets[tsIndex] )
}

function scheduleTimeSheet(timeSheet){
  const nowDate = new Date()
  const currentDayMs = new Date(nowDate.getFullYear(), nowDate.getMonth()-1, nowDate.getDate(), 0, 0, 0).getTime()
  const currentTimeMs = (hour1*nowDate.getHours()) + (mins[1]*nowDate.getMinutes())

  if( timeSheet.atTime < currentTimeMs ){
    //log.log("skipped",log.dateShortTime(currentDayMs+timeSheet.atTime))
    scheduleNext()
    return
  }

  const diff = timeSheet.atTime - currentTimeMs
  const runMins = timeSheet.timeLength/60/1000

  //seconds before, half mute
  setTimeout(()=>{
    log.log("preparing to mute")
    
    airFoil.volume(40 * .01)
  }, diff - 15000)

  setTimeout(()=>{
    log.log("running mute for", timeSheet.timeLength/60/1000,"mins")
    
    airFoil.run(0, runMins)
    scheduleNext()
  }, diff)

  log.log(
    "mute in", diff/60/1000,"mins",
    "at",
    log.dateShortTime(currentDayMs+timeSheet.atTime),"-",log.dateShortTime(currentDayMs+timeSheet.atTime+timeSheet.timeLength),
    "for",
    timeSheet.timeLength/60/1000,"mins"
  )
}

scheduleTimeSheet( timeSheets[0] )