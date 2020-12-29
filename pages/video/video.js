// pages/video/video.js
import ajax from "../../utils/ajax.js";
/**
 * 1.点击某个视频标题，该标题加一个active的样式，其它标题的active去掉
 *    1.渲染在这里的数据是后端请求回来的
 *      1.发送请求
 *        1.登录成功的时候发送请求
 *        2.把cookie保存到浏览器的storage中
 * 2.请求视频数据了
 * 3.点击title时，重新获取视频数据重新渲染
 * 4.loading的效果
 * 5.下拉刷新
 *  1.只能拖拽一点
 * 6.一次只能播放一个视频
 *  1.点击播放某个视频，会触发事件
 * 7.分享
 *  1.绑定点击事件
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoTitleList:[],
    selectedId: "",
    isGettingVideo: false,
    // 视频数据
    videoList:[],
    // image标签还是video标签
    showVideo: ""
  },
  // 点击图片渲染video标签
  showVideo (event) {
    /**
     * 1.从image变成video，大小会变
     * 2.变成video后直接播放
     */
    // console.log(event.target.dataset.id, this.id);
    this.vid = event.currentTarget.dataset.id;
    this.setData({
      showVideo: this.vid
    })
    const videoContext = wx.createVideoContext(this.vid);
    videoContext.play();
  },
  // 点击播放视频触发的事件
  handlePlay(event) {
    /**
     * 1.调用函数主动去播放某个视频
     * 2.点击播放时，把上一个正在播放的视频停掉，开始播放这个视频
     *  1.创建上下文需要video的id
     *  2.拿到video的id
     *  3.创建上下文
     *  4.播放
     *  5.暂停
     * 3.第一次进来时
     * 4.第二次进来时
     */
    const { id } = event.currentTarget;
    if(!this.vid || this.vid === id) {
      this.vid = id;
      return;
    }
    const videoContext = wx.createVideoContext(this.vid);
    videoContext.pause();
    this.vid = id;
  },
  // 下拉刷新的开始下拉事件
  handleDragStart() {
    this.setData({
      isGettingVideo: true
    })
  },
  // 自定义下拉刷新被触发
  // handleRefresh() {
  //   console.log(222222222222);
  // },
  // 给标题加active样式
  async handleAddActive(event) {
    /**
     * 1.拿到新的id值再请求一次
     *   1.那既然是这样的话就把请求视频数据封装成一个函数
     * 2.loading的效果
     *  1.什么时候关闭loading
     *  2.加载时，为空白
     */
    wx.showLoading({
      title: '正在加载视频...',
    })
    this.setData({
      videoList:[],
      selectedId: event.currentTarget.dataset.id
    })
    const videoList = await this.getVideoList();
    this.setData({
      videoList
    })
    wx.hideLoading();
  },
  // 封装一个请求视频数据的函数
  async getVideoList() {
    let videoList = await ajax("video/group", { id: this.data.selectedId });
    videoList = videoList.data.datas.map((video) => {
      return video.data;
    })
    return Promise.resolve(videoList);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    /**
     * 1.返回回来的数据过多，需要处理一下
     * 2.请求视频数据
     *  1.需要有cookie
     *  2.需要有id
     */
    // console.log(cookie);
    // if(!cookie) {
    //   wx.showToast({
    //     title: '未登录',
    //     icon:"none"
    //   })
    //   return
    //   };

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 定义一个测试获取videoList的事件
  // async getVideoTest() {
  //   console.log(111111111);
  //   /**
  //    * 1.获取视频标签列表
  //    *  1.艹，这个不需要cookie
  //    */
    

  // },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /**
     * 1.登录成功，会在storage中保存一个cookie，判断这个cookie是不是以MUSIC_U开头的即可
     * 2.我怎么知道你保存的cookie就是我服务器返回的那个cookie
     *  1.服务器返回的那个cookie要怎么保存在当前的这个实例身上
     *  2.在发送请求的时候把cookie放到header中去请求，所以现在就需要去处理以下请求api了
     */
    wx.getStorage({
      key: 'cookie',
      success: async (res) => {
        let videoTitleList = await ajax("video/group/list");
        videoTitleList = videoTitleList.data.data.slice(0, 14);
        this.setData({
          videoTitleList,
          selectedId: videoTitleList[0].id
        })
        /**
         * 1.需要视频地址，名称，
         */
        const videoList = await this.getVideoList()
        this.setData({
          videoList
        })
      },
      fail(res) {
        wx.showToast({
          title: '未登录',
          icon: "none"
        })
        return;
      }
    })

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
  onShareAppMessage: function ({from, target}) {
    /**
     * 1.给button开启了open-type="share"之后，点击也会触发这个函数的执行
     * 2.页面的分享
     *  1.分享整个页面
     * 3.单个视频的分享
     *  1.分享图片，标题
     *  2.事件传参
     */
    const { title, imageurl } = target.dataset;
    if(from === "button"){
      return {
        title,
        path: "/pages/index/index",
        imageUrl: imageurl
      }
    }
  }
})