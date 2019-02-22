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

const sec15 = 15000
const sec30 = 30000
const min30 = 1800000
const hour1 = 3600000

module.exports.timeSheets = [
  //8:47
  {
    atTime: (hour1*9)-mins[13],//9:47am
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
    timeLength:mins[10]+sec30//changed 2/19/2019
  },
  //9:48
/*
  {
    atTime: (hour1*9+min30+mins[15]+mins[3]),//9:48am
    timeLength:mins[8]
  },
*/
  //10
  {
    atTime: (hour1*10)-mins[2],//09:58:00am - changed 2/8/19
    timeLength:mins[12]
  },
  //10:30
  {
    atTime: (hour1*10+min30)-(mins[1]+sec30),//10:28:30am - changed 1/10/19
    timeLength:mins[10]//changed 2/15/19
  },

  //11
  {
    atTime: (hour1*11)-mins[3],//11:58am changed 2/5/19
    timeLength:mins[11] + sec30// changed 2/19/19
  },
  //11:30
  {
    atTime: (hour1*11+min30)-(mins[1]+sec30),//11:29:00am - changed 11/8/18
    timeLength:mins[11]//11-15-18
  },

  //12
  {
    atTime: hour1*12-mins[2],//11:58am
    timeLength:mins[12]+sec30// 1-29-19
  },
  //12:30
  {
    atTime: (hour1*12+min30)-mins[2],//12:29:00am - 10-9-18
    timeLength:mins[12]// 10-24-18
  },

  //1
  {
    atTime: (hour1*13)-(mins[1]+sec30),//12:58:30pm - changed 1/9/19
    timeLength:mins[12]//02-15-19
  },
  //1:30
  {
    atTime: (hour1*13+min30)-(mins[1]+sec30),//1:28:30pm - changed 1/10/19
    timeLength:mins[11] + sec30//changed 1/29/19
  },

  //2
  {
    atTime: (hour1*14)-(mins[3]+sec30),//1:56:30pm - 1/10/19
    timeLength:mins[10]+sec30
  },
  //2:30
  {
    atTime: (hour1*14+min30)-(mins[1]+sec30),//2:28:30pm
    timeLength:mins[10]// 11/18/18
  },

  //3
  {
    atTime: (hour1*15)-(mins[2]+sec30),//2:57:30pm - 9/28/18
    timeLength:mins[11]+sec30// 2/7/19
  },

  //3:30
  {
    atTime: (hour1*15+min30)-mins[2],//3:28:00pm - 2/8/19
    timeLength:mins[10]// 11/6/18
  },

  //4
  {
    atTime: (hour1*16)-(mins[1]+sec30),//3:58:30pm changed 10/25/18
    timeLength:mins[10]// 10-30-18
  },
  //4:30
  {
    atTime: (hour1*16+min30)-mins[2],//4:28:00pm changed 10-25-2018
    timeLength:mins[10]
  },

  //5
  {
    atTime: (hour1*17)-(mins[2]+sec30),//4:57:30pm changed 12-11-18
    timeLength:mins[11]//11-14-18
  },
  //5:30
  {
    atTime: (hour1*17+min30)-mins[2],//5:28:00pm changed 1-10-19
    timeLength:mins[11]
  },

  //6
  {
    atTime: (hour1*18)-sec30,//5:59:30pm
    timeLength:mins[10]// 11/15/18
  },
  //6:30
  {
    atTime: (hour1*18+min30)-mins[1],//6:28:30pm - 11/7/18
    timeLength:mins[10]//changed 11/7/18
  },

  //7
  {
    atTime: (hour1*19)-mins[6],//6:54:00pm
    timeLength:mins[9]
  }
]