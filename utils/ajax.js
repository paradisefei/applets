export default function (url, data = {}, method) {
  /**
   * 1.使用该函数去请求
   * 2.请求参数
   * 3.把数据返回到生命周期函数中
   *    1.使用promise
   */
  console.log(data);
  return new Promise((resolve) => {
    wx.request({
      url: 'http://localhost:3000/' + url,
      data,
      method,
      success: (res) => {
        // this.setData({
        //   recommendSwiper: res.data.result
        // })
        resolve(res);
      }
    })
  })

}