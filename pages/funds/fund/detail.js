var fundData = require('../../../data/fund-data.js');
Page({
  data: {
    navigateTitle: '',
    char_lt: '<',
    char_lt_eq: '≤',
    flag: 'fljg'
  },
  changeFundMenu: function(event){
    var that = this;
    var menu = event.target.dataset.menu;
    switch(menu){
      case 'fljg':
        that.setData({
          flag: 'fljg'
        });
        break;
      case 'zcpz':
        that.setData({
          flag: 'zcpz'
        });
        break;
      case 'jjjl':
        that.setData({
          flag: 'jjjl'
        });
        break;
    }
  },
  onLoad: function (options) {
    var fundName = options.fundName || '';
    this.setData({
      navigateTitle: fundName
    });
    wx.setNavigationBarTitle({
      title: this.data.navigateTitle
    });
  },
  onReady: function (e) {
    var context = wx.createCanvasContext('fund-1M-chart');// 获取绘图上下文 context
    var startx = 50, endx = 365, starty = 0, endy=150;
    var step = (endy - starty)/25;
    var fund_1M = fundData.fund_data.chg.cy;// 基金一个月的单位净值数据
    var xdata = [], changes = [], units = [], times = [], x_num = 6;
    for (var i = 0; i < 6; i++){
      xdata.push(fund_1M[i * 5][0].slice(5));// x轴时间显示
    }
    for(var j=0;j<fund_1M.length;j++){
      times.push(fund_1M[j][0]);// 时间
      changes.push(fund_1M[j][1]);// 涨跌幅
      units.push(fund_1M[j][2]);// 单位净值
    }
    var maxChange = Math.max(...changes);// 涨跌幅的最大值
    var minChange = Math.min(...changes);// 涨跌幅的最小值
    var maxUnits = Math.max(...units);// 单位净值的最大值
    var minUnits = Math.min(...units);// 单位净值的最小值
    var maxUnitsStr = (maxUnits + 0.01)+'';
    var maxUnitsNum = parseFloat(maxUnitsStr.slice(0, 4)).toFixed(4);
    var minUnitsNum = parseFloat((maxUnitsNum * 100 - 100) / 100).toFixed(4);
  
    context.setStrokeStyle("#4285f4");// 设置描边颜色
    context.setLineWidth(3);  // 设置线宽
    var num1 = fund_1M[0][2] * 100 - minUnitsNum * 100;
    context.moveTo(startx, (100 - Math.round(num1)) * step);
    for (var j = 1; j < fund_1M.length; j++) {
      var num = fund_1M[j][2] * 100 - minUnitsNum*100;
      var numy = (100 - Math.round(num)) * step;
      var numx = j * ((endx - startx) / 30);
      context.lineTo(numx + startx, numy);
    }
    context.stroke();// 对当前路径进行描边
    context.beginPath();
    context.setStrokeStyle("#e8e8e8");// 设置描边颜色
    context.setLineWidth(1);  // 设置线宽
    var lineStep = ((endy-starty)/6);
    for(var i =1;i<6;i++){
      context.moveTo(50, lineStep*i);
      context.fillText(parseFloat((maxUnitsNum * 100 - 20 * i) / 100).toFixed(4), 0, (lineStep * i)+5);
      context.lineTo(345, lineStep * i);
    }
    context.stroke();// 对当前路径进行描边
    var timestep =(endx-startx)/5;
    for(var i=0;i<5;i++){
      var num = i*7;
      context.fillText(times[num].slice(5), 50 + (timestep * i), 140);
    }
    context.draw();
  }
})