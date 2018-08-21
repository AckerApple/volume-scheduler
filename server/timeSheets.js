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
const min30 = 1800000

module.exports.timeSheets = [
  //9
  {
    atTime: hour1*9-mins[2],//8:58am
    timeLength:mins[8]
  },
  //9:30
  {
    atTime: (hour1*9+min30)-mins[2],//9:28am
    timeLength:mins[8]
  },

  //10
  {
    atTime: hour1*10-mins[2],//9:58am
    timeLength:mins[10]
  },
  //10:30
  {
    atTime: (hour1*10+min30)-mins[2],//10:28am
    timeLength:mins[9]
  },
  
  //11
  {
    atTime: hour1*11-mins[2],//10:58am
    timeLength:mins[8]
  },
  //11:30
  {
    atTime: (hour1*11+min30)-mins[2],//11:28am
    timeLength:mins[8]
  },

  //12
  {
    atTime: hour1*12-mins[2],//11:58am
    timeLength:mins[8]
  },
  //12:30
  {
    atTime: (hour1*12+min30),//12:30am
    timeLength:mins[8]
  },

  //1
  {
    atTime: hour1*13-mins[2],//12:58pm
    timeLength:mins[8]
  },
  //1:30
  {
    atTime: (hour1*13+min30),//1:30pm
    timeLength:mins[8]
  },

  //2
  {
    atTime: hour1*14-mins[3],//1:57pm
    timeLength:mins[10]
  },
  //2:30
  {
    atTime: (hour1*14+min30)-mins[1],//2:29pm
    timeLength:mins[8]
  },

  //3
  {
    atTime: hour1*15-mins[2],//2:58pm
    timeLength:mins[8]
  },

  //3:30
  {
    atTime: (hour1*15+min30)-mins[1],//3:29pm
    timeLength:mins[8]
  },

  //4
  {
    atTime: hour1*16,//4pm
    timeLength:mins[8]
  },
  //4:30
  {
    atTime: (hour1*16+min30)-mins[2],//4:28pm
    timeLength:mins[8]
  },

  //5
  {
    atTime: hour1*17-mins[1],//4:59pm
    timeLength:mins[8]
  },
  //5:30
  {
    atTime: (hour1*17+min30)-mins[1],//5:29pm
    timeLength:mins[8]
  },

  //6
  {
    atTime: hour1*18-mins[2],//5:58pm
    timeLength:mins[8]
  },
  //6:30
  {
    atTime: (hour1*18+min30)-mins[1],//6:29pm
    timeLength:mins[8]
  },
  
  //7
  {
    atTime: (hour1*19)-mins[5],//6:55pm
    timeLength:mins[9]
  }
]