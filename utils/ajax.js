export default function (url, data = {}, method = "GET") {
  /**
   * 1.使用该函数去请求
   * 2.请求参数
   * 3.把数据返回到生命周期函数中
   *    1.使用promise
   * 4.需要有cookie
   *  1.cookie为空时
   */
  let cookie = [];
  const cookieStr = wx.getStorageSync("cookie");
  if (cookieStr) {
    cookie = JSON.parse(cookieStr);
  }
  return new Promise((resolve) => {
    wx.request({
      url: 'http://localhost:3000/' + url,
      data,
      method,
      header: {
        cookie
      },
      success: (res) => {
        resolve(res);
      }
    })
  })

}