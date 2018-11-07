const log = require('./log')
const airFoil = require('../index')
const timeSheets = require('./timeSheets').timeSheets


const config = module.exports.config = {
  paused:false,
  inBreak:false
}

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

function changeVolume( num ){
  if( config.paused )return//do not change volume

  airFoil.volume( num )
}

function scheduleNext(){
  const startOver = tsIndex===timeSheets.length-1
  
  if( startOver ){
    log.log("Shows over")
    changeVolume(30 * .01)
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
    if( timeSheet.atTime+timeSheet.timeLength > currentTimeMs ){
      config.inBreak = true
      const inMuteFor = timeSheet.atTime+timeSheet.timeLength - currentTimeMs
      log.log('already in mute for', inMuteFor)
      muteForAndSchedule( inMuteFor )
      return
    }

    scheduleNext()
    return
  }

  const diff = timeSheet.atTime - currentTimeMs
  const runMins = timeSheet.timeLength/60/1000

  //seconds before, half mute
  preMuteAt( diff )

  setTimeout(()=>muteTimeSheet(timeSheet), diff)

  config.inBreak = false
  changeVolume(1)
  log.log(
    "mute in", diff/60/1000,"mins",
    "at",
    log.dateShortTime(currentDayMs+timeSheet.atTime),"-",log.dateShortTime(currentDayMs+timeSheet.atTime+timeSheet.timeLength),
    "for",
    timeSheet.timeLength/60/1000,"mins"
  )
}

function muteTimeSheet( timeSheet ){
  log.log("running mute for", timeSheet.timeLength/60/1000,"mins")
  
  muteForAndSchedule( timeSheet.timeLength )
}

function muteForAndSchedule( time ){
  changeVolume(0)//mute
  
  //start restore volumn
  setTimeout(()=>{
    changeVolume(10 * .01)
  }, time-40000)
  setTimeout(()=>{
    changeVolume(40 * .01)
  }, time-20000)

  //restore volumn
  setTimeout(()=>{
    config.inBreak = false
    changeVolume(1)
    scheduleNext()
  }, time)
}

function preMuteAt( time ){
  config.inBreak = true
  setTimeout(()=>{
    log.log("preparing to mute")
    
    changeVolume(40 * .01)
  }, time - 30000)

  setTimeout(()=>{
    log.log("going mute soon")
    
    changeVolume(20 * .01)
  }, time - 15000)
}

scheduleTimeSheet( timeSheets[0] )
