// pages/login/login.js
/**
 * 1.给游客区域绑定点击事件
 * 2.手机数据
 *    1.手机号
 *    2.密码
 *    3.数据绑定
 *    4.将两次收集放到一个函数中去处理
 * 3.小程序进行数据绑定
 *    1.model:前缀
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    password: ""
  },
  // 用一个函数处理两个数据的收集
  handlePhoneAndPassword(event) {
    /**
     * 1.使用自定义属性
     *    1.拿到自定义属属性
     *    2.拿到输入的数据
     */
    const type = event.target.dataset.type;
    const value = event.detail.value;
    this.setData({
      [type]: value
    })
  },
  // 收集密码
  handlePhone(event) {
    const phoneInput = event.detail.value;
    console.log(phoneInput);
  },
  // 收集密码
  handlePassword(event) {
    const passwordInput = event.detail.value;
    console.log(passwordInput);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})