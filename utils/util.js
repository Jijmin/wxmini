function convertToStarsArray(stars) {
  var result = [];// 存放星星状态的数组
  var score = stars / 10;// 评分转换
  var num = Math.floor(score * 2) / 2;// 可以计算出哪些分数有半星
  var hasDecimal = score % 1 !== 0;// 判断是否有半星
  var integer = Math.floor(score);// 获取到全星的部分
  for (var i = 0; i < integer; i++) {// 将前面的全星push到数组中
    result.push(1);
  }
  if (hasDecimal) {// 有半星就push进数组
    result.push(2);
  }
  while (result.length < 5) {// 补全剩下的空星
    result.push(0);
  }
  return result;
}
function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}
module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}