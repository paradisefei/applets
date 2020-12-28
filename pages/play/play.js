// pages/play/play.js
import ajax from "../../utils/ajax.js";
/**
 * 1.每日推荐页面点击歌曲时，动态渲染该页面
 * 2.一进来页面时，指针不在转盘上的
 *  1.我点击了播放按钮
 *    1.变成播放的图标
 * 3.设置背景音频
 * 4.bug
 *   1.出去到每日推荐界面后
 *      1.点击正在播放的歌曲
 *        1.要的效果是继续正在播放的状态
 *        2.c3效果是存在的
 *        3.哪个音频正在播放，需要保存一个标识，把正在播放的歌的id存在里面
 *      2.点击不在播放的歌曲
 *        1.点击后
 */
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail: null,
    songId: null,
    isPlaying: false
  },
  // 点击播放按钮
  async handlePlay() {
    /**
     * 1.状态数据变成正在播放状态
     *  1.再点击时，又变成不可播放的图标
     *  2.如果是正在播放，则有c3效果
     * 2.播放背景音频
     *  1.获取歌曲播放地址
     *  2.播放
     *  3.再点击时要停止
     *    1.根据状态来确定是否停止
     * 3.如果正在播放，则把id保存到app中
     *    
     */
    if(!this.data.songId) return;
    this.setData({
      isPlaying: !this.data.isPlaying
    })
    if(this.data.isPlaying) {
      appInstance.globalData.songId = this.data.songId
    }
    let songUrl = await ajax(`song/url?id=${this.data.songId}`);
    songUrl = songUrl.data.data[0].url;
    console.log(songUrl);
    const backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onEnded(() => {
      this.setData({
        isPlaying: false
      })
    })
    backgroundAudioManager.title = this.data.songDetail.name;
    if(this.data.isPlaying) {
      /**
       * 1.正在播放
       */
      // backgroundAudioManager.play();
      backgroundAudioManager.src = songUrl;
    }else {
      /**
       * 1.暂停播放
       */
      backgroundAudioManager.pause();
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /**
     * 1.拿到从每日推荐页面传过来的id
     *  1.请求歌曲的详细信息
     *  2.拿到有用的数据，重新渲染页面
     *  3.设置navigationBarTitleText
     * 2.拿到正在播放的歌曲的id
     * 3.挂载时是不需要把值存到app中去的，只需要比较
     */
    const { songId } = options;
    if(songId=== "undefined") return;
    console.log(songId, appInstance.globalData.songId);
    if (songId === appInstance.globalData.songId){
      this.setData({
        isPlaying: true
      })
    }
    // console.log(appInstance.globalData);
    // appInstance.globalData.songId = songId;
    // console.log(appInstance.globalData);
    this.setData({
      songId
    })
    console.log(options);
    const songDetail = await ajax(`song/detail?ids=${songId}`);
    console.log(songDetail);
    if (songDetail.data.code === 200) {
      this.setData({
        songDetail: songDetail.data.songs[0]
      })
      console.log(this.data.songDetail.name);
      wx.setNavigationBarTitle({
        title: this.data.songDetail.name
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