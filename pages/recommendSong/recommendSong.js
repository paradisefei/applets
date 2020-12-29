// pages/recommendSong/recommendSong.js
import ajax from "../../utils/ajax.js";
import PubSub from "pubsub-js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommentSongList:[],
    index: ''
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
    const { songid, index } = event.currentTarget.dataset;
    this.setData({
      index
    })
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
     * 3.绑定pubsub的接收
     */
    let recommentSongList = await ajax("recommend/songs");
    if (recommentSongList.data.code === 200) {
      recommentSongList = recommentSongList.data.recommend.map((song) => {
        return song;
      })
      this.setData({
        recommentSongList
      })
    }

    PubSub.subscribe("toRecommend", (topic, data) => {
      /**
       * 1.这里接收到play界面传过来的数据，通过这个数据找到下一首的id
       * 2.每次点击的时候把被点击元素的index记录下来
       *  1.根据保存的哪个index，找到下一个元素，然后找到id
       *  2.把id传到play界面
       */
      console.log(topic, data, recommentSongList.length);
      console.log(this.data.index);
      let currentIndex = this.data.index;
      if(data === "prev"){
        /**
         * 1.递减
         */

        currentIndex = currentIndex - 1;
        if(currentIndex === -1) currentIndex = recommentSongList.length - 1;

      } else {

        currentIndex = currentIndex + 1;
        if (currentIndex === recommentSongList.length) currentIndex = 0;
      }
      this.setData({
        index: currentIndex
      })
      console.log(this.data.index);
      const nextId = recommentSongList[this.data.index].id;
      console.log(nextId);
      PubSub.publish("toPlay", nextId);
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