import ajax from "../..//utils/ajax.js";
//index.js
//获取应用实例
const app = getApp();
/**
 * 1.请求推荐歌曲的数据
 * 2.请求轮播图数据
 * 3.封装ajax函数
 */
Page({
  data: {
    recommendSwiper: [],
    banners: [],
    hotMusic: {},
    billBoard: {},
    original: {},
    list: [{
        "text": "对话",
        "iconPath": "/static/images/tabBar/home.png",
        "selectedIconPath": "/static/images/tabBar/homeCheck.png",
        dot: true
      },
      {
        "text": "设置",
        "iconPath": "/static/images/tabBar/play.png",
        "selectedIconPath": "/static/images/tabBar/playCheck.png",
        badge: 'New'
      }
    ]
  },
  onReady() {
    /**
     * 1.api
     * 2.地址
     * 3.请求方式
     * 4.返回值
     */
    // console.log("------onReady--------");
    // 请求推荐歌单
    const promiseRecSwiper = ajax("personalized");
    promiseRecSwiper.then((res) => {
      this.setData({
        recommendSwiper: res.data.result
      })
      // console.log(res);
    })
    // wx.request({
    //   url: 'http://localhost:3000/personalized',
    //   success: (res) =>{
    //     this.setData({
    //       recommendSwiper:res.data.result
    //     })
    //     // console.log(res);
    //   }
    // })
    // 请求banner轮播图
    const promiseBanner = ajax("banner");
    promiseBanner.then((res) => {
      this.setData({
        banners: res.data.banners
      })
      // console.log(res);
    })
    // wx.request({
    //   url: 'http://localhost:3000/banner',
    //   success: (res) => {
    //     this.setData({
    //       banners: res.data.banners
    //     })
    //     // console.log(res);
    //   }
    // })
    // 请求排行榜数据
    let idx = 1;
    let index = 1;
    const whiteList = [this.hotMusic, this.billBoard,this.original]
    while(idx <= 3) {
      console.log(idx);
      ajax("top/list", { idx }).then((res) => {
        /**
         * 1.then的回调属于微任务，整个循环结束之后才会执行then里面的代码
         */
        console.log(res, idx, index);
        // this.setData({
        //   hotMusic: res.data.playlist
        // })
        if(index === 1) {
          this.setData({
            hotMusic: res.data.playlist
          })
        }
        if(index === 2) {
          this.setData({
            billBoard: res.data.playlist
          })
        }
        if(index === 3) {
          this.setData({
            original: res.data.playlist
          })
        }
          index++;
      })
      idx++;
    }
    // 热歌榜
    // const promiseHotMusic = ajax("top/list", {idx: 1});
    // promiseHotMusic.then((res) => {
    //   this.setData({
    //     hotMusic: res.data.playlist
    //   })
    // })
    // wx.request({
    //   url: 'http://localhost:3000/top/list',
    //   data: {
    //     idx: 1
    //   },
    //   success: (res) => {
    //     this.setData({
    //       hotMusic: res.data.playlist
    //     })
    //     // console.log(res);
    //   }
    // })
    // billboard
    // const promiseBillBoard = ajax("top/list", { idx: 6 });
    // promiseBillBoard.then((res) => {
    //   this.setData({
    //     billBoard: res.data.playlist
    //   })
    // })
    // wx.request({
    //   url: 'http://localhost:3000/top/list',
    //   data: {
    //     idx: 6
    //   },
    //   success: (res) => {
    //     this.setData({
    //       billBoard: res.data.playlist
    //     })
    //     // console.log(res);
    //   }
    // })
    // 原创榜
    // const promiseOriginal = ajax("top/list", { idx: 2 });
    // promiseOriginal.then((res) => {
    //   this.setData({
    //     original: res.data.playlist
    //   })
    // })
    // wx.request({
    //   url: 'http://localhost:3000/top/list',
    //   data: {
    //     idx: 2
    //   },
    //   success: (res) => {
    //     this.setData({
    //       original: res.data.playlist
    //     })
    //   }
    // })
  }
})