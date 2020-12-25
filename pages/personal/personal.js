// pages/personal/personal.js
/**
 * 1.拖拽
 *    1.给元素绑定事件
 * 2.登录页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 拖拽块的坐标
    moveY: 0,
    isTransition: "",
  },
  // 给可拖拽元素绑定手指触摸事件
  handleTouchStart(event) {
    /**
     * 1.鼠标有一个位置，模块的位置根据鼠标的位置来确定
     *    1.得到鼠标的位置
     *    2.决定模块位置的数据要是响应式的
     */
    this.startY = event.changedTouches[0].clientY
    this.setData({
      isTransition: "",
    })
  },
  // 给可拖拽元素绑定手指移动事件
  handleTouchMove(event) {
    /**
     * 1.手指移动了多少，块就移动多少
     *    1.计算移动了多少
     *    2.移动的量是响应式的
     * 2.鼠标上移时，块不会上移
     */
    // console.log(event.changedTouches[0].clientY);
    let moveY = event.changedTouches[0].clientY - this.startY;
    if(moveY < 0) return;
    if(moveY > 100) return;

    this.setData({
      moveY
    })
  },
  // 给可拖拽元素绑定手指抬起事件
  handleTouchEnd(event) {
    /**
     * 1.手指抬起时，拖拽块会回到原来的位置
     *    1.向下的时候是不需要有过渡效果的，要是响应式的
     */
    this.setData({
      moveY: 0,
      isTransition: "transform 400ms"
    })
  },
  // 点击头像部分，去登录
  toLogin() {
    /**
     * 1.跳转到登录界面
     */
    wx.navigateTo({
      url: '/pages/login/login',
    })
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