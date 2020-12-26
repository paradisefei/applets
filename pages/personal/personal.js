import ajax from "../../utils/ajax.js";
// pages/personal/personal.js
/**
 * 1.拖拽
 *    1.给元素绑定事件
 * 2.登录页面
 * 3.请求历史记录的数据
 *    1.静态页面
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 拖拽块的坐标
    moveY: 0,
    isTransition: "",
    //头像
    avatarUrl:"",
    // 用户名
    username: "",
    // 历史记录
    historyList: []
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
    /**
     * 1.登录成功跳转到这个页面，这次的页面加载后拿到数据进行渲染
     *    1.读取到storage中的数据
     * 2.没有登录和登录之后是两个状态
     *    1.登录之后会有一个token作为登录成功的标识
     *    2.并不是说登录成功就用了另一个系统了，而是说我登录成功之后就会得到数据，拿到这些数据来对页面进行渲染
     *    3.很多东西就是需要成功之后才会渲染的，是因为登录成功之后拿到了数据
     *    4.token只是登录成功的标识而已，它也只是一个数据而已，可以通过这个token来标识当前用户，在当前用户下做一些事
     * 3.需要渲染头像
     * 4.历史记录是需要拿到uid再进行一次请求的
     * 5.拿到数据再去渲染
     */
    wx.getStorage({
      key: 'userInfo',
      success: async (res)=>{
        const { avatarUrl, nickname, userId } = JSON.parse(res.data);
        console.log(res.data, avatarUrl, nickname, userId);
        this.setData({
          avatarUrl,
          nickname
        })
        /**
         * 1.拿到userId后去请求历史数据
         * 2.拿到数据后对数据进行处理拿到有用的数据
         */
        const historyAjax = await ajax("user/record", {uid:userId,type: 1});
        const historyUseful = historyAjax.data.weekData.map((history) => {
          return history.song.al.picUrl;
        })
        this.setData({
          historyList: historyUseful
        })
        console.log(historyUseful);
      },
    })
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