// pages/recommendSong/recommendSong.js
import ajax from "../../utils/ajax.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommentSongList:[]
  },
  // 点击去到播放界面
  toPlay(event) {
    /**
     * 1.跳转到播放界面
     * 2.点击，需要把数据传到play界面渲染
     *  1.路由传参
     *    1.需要的参数有，歌曲名，歌手名，图片
     *    2.传一个id值，在挂载play界面时重新请求
     *    3.把id传过来
     */
    const { songid } = event.target.dataset;
    console.log(songid);
    wx.navigateTo({
      /**
       * 1.路径后可以带参数
       * 2.参数传过去怎么拿到
       */
      url: `/pages/play/play?songId=${songid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /**
     * 1.请求数据
     * 2.赋值
     */
    console.log("recommendSongOnLoad");
    let recommentSongList = await ajax("recommend/songs");
    console.log(recommentSongList);
    if (recommentSongList.data.code === 200) {
      recommentSongList = recommentSongList.data.recommend.map((song) => {
        return song;
      })
      this.setData({
        recommentSongList
      })
    }
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