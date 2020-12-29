// pages/play/play.js
import ajax from "../../utils/ajax.js";
import PubSub from "pubsub-js";
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
 * 5.切歌
 *  1.绑定点击事件
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
  // 点击播放上一首
  switchPrev() {
    if (!this.data.songId) return;
    PubSub.publish("toRecommend", "prev");
  },
  // 把请求歌曲详细信息封装成一个函数
  async getSongDetail(songId) {
    /**
     * 1.如果当前是正在播放的状态，则请求了新的数据之后需要自动播放当前的歌曲
     */
    this.setData({
      songId
    })
    if (this.data.isPlaying) {
      appInstance.globalData.songId = songId;
    }
    const songDetail = await ajax(`song/detail?ids=${songId}`);
    // console.log(songDetail);
    if (songDetail.data.code === 200) {
      this.setData({
        songDetail: songDetail.data.songs[0]
      })
      if(this.data.isPlaying) {
        this.getSongUrl();
      }
      // console.log(this.data.songDetail.name);
      wx.setNavigationBarTitle({
        title: this.data.songDetail.name
      })
    }
  },
  // 把请求歌曲的url封装成一个函数
  async getSongUrl() {
    /**
     * 
     */

    let songUrl = await ajax(`song/url?id=${this.data.songId}`);
    songUrl = songUrl.data.data[0].url;
    // const backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.title = this.data.songDetail.name;
    this.backgroundAudioManager.src = songUrl;
    if (this.data.isPlaying) {
      /**
       * 1.正在播放
       */
      console.log(this.data.isPlaying);
      this.backgroundAudioManager.play();
    } else {
      /**
       * 1.暂停播放
       */
      console.log(this.data.isPlaying, this.backgroundAudioManager);
      this.backgroundAudioManager.pause();
    }
  },
  // 点击播放下一首
  switchNext() {
    /**
     * 1.要拿到下一首歌的id，请求这个id的歌曲详细信息，重新渲染
     *  1.使用pubsub通信
     *  2.点击把这个歌的id传到每日推荐界面
     *  3.每日推荐界面通过这首歌的id找到下一首歌的id，传到play界面
     *  4.拿到id重新请求
     * 2.下载pubsub包
     *  1.点击时发送数据
     * 3.再点击时没有效果
     *  1.再点击时没有执行这个函数
     *  2.每一次点击都相当于多定义了一次回调，每点击一次就会叠加
     * 4.如果当前歌曲正在播放，切换到下一首时自动播放下一首
     *  1.点击下一首时，要先看一下当前的播放状态是什么样的
     *    1.如果当前正在播放，那么在切换到下一首时也是播放的状态
     */
    if (!this.data.songId) return;
    if(this.data.isPlaying){
      /**
       * 1.如果当前正在播放的状态，切换到下一首也是正在播放的状态
       *  1.那就需要把songId也更新
       *  2.就要拿到songId
       */
    }
    console.log(this.data.isPlaying);
    PubSub.publish("toRecommend", "next");
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
     * 4.没有播放时，切歌后就是没有播放的
     * 5.正在播放歌曲时，切歌后自动播放切歌后的那首歌
     *  
     */
    // console.log(111111111, this.data.songId);
    if(!this.data.songId) return;

    this.setData({
      isPlaying: !this.data.isPlaying
    })
    if(this.data.isPlaying) {
      appInstance.globalData.songId = this.data.songId
    }
    this.getSongUrl();

    // if(this.data.isPlaying) {
    //   /**
    //    * 1.正在播放
    //    */
    //   console.log(this.data.isPlaying);
    //   // this.backgroundAudioManager.play();
    // }else {
    //   /**
    //    * 1.暂停播放
    //    */
    //   console.log(this.data.isPlaying, this.backgroundAudioManager);
    //   this.backgroundAudioManager.pause();
    // }
  },
  // 添加音频管理的事件监听
  addBackgroundAudioManagerEvent() {
    this.backgroundAudioManager.onPlay(() => {
      this.setData({
        isPlaying: true
      })
      // console.log("开始播放");
    })
    this.backgroundAudioManager.onPause(() => {
      this.setData({
        isPlaying: false
      })
      appInstance.globalData.songId = this.data.songId;
      // console.log("暂停播放");
    })
    this.backgroundAudioManager.onEnded(() => {
      this.setData({
        isPlaying: false
      })
    })
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
     * 4.绑定pubsub事件
     * 5.进入该界面时确定是否继续c3效果
     */
    const { songId } = options;
    console.log(songId, appInstance.globalData.songId);
    console.log(+songId, +appInstance.globalData.songId);
    if(songId=== "undefined") return;
    // console.log(songId, appInstance.globalData.songId);
    if (+songId === +appInstance.globalData.songId){
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
    this.getSongDetail(songId);
    this.token = PubSub.subscribe("toPlay", (msg, nextId) => {
      console.log(msg, nextId);
      this.getSongDetail(nextId);
    });
    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.addBackgroundAudioManagerEvent();
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
    console.log(this.token);
    PubSub.unsubscribe(this.token);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log(this.token);
    PubSub.unsubscribe(this.token);
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