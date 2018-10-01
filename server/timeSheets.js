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
  600000,//10mins
  660000,
  720000,
  780000,//13mins
  840000,
  900000//15mins
]

const sec30 = 30000
const min30 = 1800000
const hour1 = 3600000

module.exports.timeSheets = [
  //8:47
  {
    atTime: hour1*9-mins[13],//9:47am
    timeLength:mins[8]
  },
  //9
  {
    atTime: hour1*9+mins[1],//9:01am
    timeLength:mins[8]
  },
  //9:30
  {
    atTime: (hour1*9+min30)-mins[1],//9:28am
    timeLength:mins[8]
  },
  //9:48
  {
    atTime: (hour1*9+min30+mins[15]+mins[3]),//9:48am
    timeLength:mins[8]
  },

  //10
  {
    atTime: hour1*10-mins[1],//09:59am
    timeLength:mins[10]
  },
  //10:30
  {
    atTime: (hour1*10+min30)-sec30,//10:29:30am
    timeLength:mins[8]
  },
  
  //11
  {
    atTime: hour1*11,//11:00am
    timeLength:mins[9]
  },
  //11:30
  {
    atTime: (hour1*11+min30)-sec30,//11:29:30am
    timeLength:mins[8]
  },

  //12
  {
    atTime: hour1*12-mins[2],//11:58am
    timeLength:mins[9]
  },
  //12:30
  {
    atTime: (hour1*12+min30),//12:30am
    timeLength:mins[8]
  },

  //1
  {
    atTime: hour1*13-mins[1],//12:58pm
    timeLength:mins[8]
  },
  //1:30
  {
    atTime: (hour1*13+min30)-sec30,//1:29:30pm
    timeLength:mins[9]
  },

  //2
  {
    atTime: hour1*14-mins[3],//1:57pm
    timeLength:mins[10]+sec30
  },
  //2:30
  {
    atTime: (hour1*14+min30)-mins[1]-sec30,//2:28:30pm
    timeLength:mins[8]+sec30
  },

  //3
  {
    atTime: hour1*15-mins[2]-sec30,//2:57:30pm - 9/28/18
    timeLength:mins[8]+sec30
  },

  //3:30
  {
    atTime: (hour1*15+min30)-mins[1],//3:29pm
    timeLength:mins[9]
  },

  //4
  {
    atTime: hour1*16-mins[1],//3:59:00pm changed 9/27/18
    timeLength:mins[9]+sec30
  },
  //4:30
  {
    atTime: (hour1*16+min30)-sec30,//4:29:30pm
    timeLength:mins[8]
  },

  //5
  {
    atTime: hour1*17-mins[1],//4:59pm
    timeLength:mins[8]
  },
  //5:30
  {
    atTime: (hour1*17+min30)-sec30,//5:29:30pm
    timeLength:mins[9]
  },

  //6
  {
    atTime: hour1*18-sec30,//5:59:30pm
    timeLength:mins[8]+mins[1]// 10/1/18
  },
  //6:30
  {
    atTime: (hour1*18+min30)-mins[1]-sec30,//6:28:30pm
    timeLength:mins[9]+sec30
  },
  
  //7
  {
    atTime: (hour1*19)-mins[5]-sec30,//6:55pm
    timeLength:mins[9]
  }
]