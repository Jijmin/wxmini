var util = require('../../utils/util.js');
Page({
  data: {
    fundList: []
  },
  onLoad: function (options) {
    var that = this;
    var url ='https://fund.jd.com/getLeftTab?callback=jQuery18303846676212831843_1518154044798&sort=&theme=&industry=&op=%3A&man=&style=&years=&risk=&label=&sortType=31&page=1&q=&_=1518154045049';
    util.http(url,function(res){
      var reg = /^jQuery\d+_\d+\(/; // jQuery18307970643518438196_1514899720147(
      res = res.replace(reg, '');
      res = res.replace(/\)$/, '');
      var fundList = JSON.parse(res).items;
      for (var fund in fundList){
        if (fundList[fund].fundAbbreviation.length >= 7){
          fundList[fund].fundAbbreviation = fundList[fund].fundAbbreviation.slice(0,7)+'...';
        }
      }
      that.setData({
        fundList: fundList
      });
    });
  },
})