function log(){
  const dateLabel = getShortTime()
  const label = "\x1b[36m"+dateLabel+"\x1b[0m"
  const logs = Array.prototype.slice.call(arguments)
  logs.unshift(label)
  console.log.apply(console, logs)
}
module.exports.log = log

function getShortTime(){
  const date = new Date()
  return date.getHours()+":"+date.getMinutes()
}
module.exports.getShortTime = getShortTime

function dateShortTime( d ){
  const date = new Date(d)
  return ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
}
module.exports.dateShortTime = dateShortTime

