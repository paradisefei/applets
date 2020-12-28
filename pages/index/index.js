import ajax from "../../utils/ajax.js";
//index.js
//获取应用实例
const app = getApp();
/**
 * 1.请求推荐歌曲的数据
 * 2.请求轮播图数据
 * 3.封装ajax函数
 * 4.拆分组件
 */
Page({
  data: {
    recommendSwiper: [],
    banners: [],
    /**
     * 1.排行榜一栏遍历的是一个数组，这个数组中的每一项是一个对象，每次把请求到的数据push到这个数组中
     */
    ranking: []
  },
  // 每日推荐
  dayRecommend() {
    /**
     * 1.跳转到新的页面
     *  1.navigateTo 会卸载
     *  2.redirectTo 不会卸载，指示隐藏
     * 2.获取数据
     *  1.recommendSong页面挂载成功时请求数据
     */
    console.log("每日推荐");
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong'
    })
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
    })

    // 请求banner轮播图
    const promiseBanner = ajax("banner");
    promiseBanner.then((res) => {
      this.setData({
        banners: res.data.banners
      })
    })
    
    // 请求排行榜数据
    let idx = 1;
    // 保存数据的数组
    let rankingListDemo = [];
    while (idx <= 5) {
      ajax("top/list", { idx }).then((res) => {
        /**
         * 1.把对象添加到数组中
         * 2.对返回回来的数据进行处理，拿到需要的数据放到对象中
         */
        rankingListDemo = this.data.ranking.concat({
          name: res.data.playlist.name,
          list: res.data.playlist.tracks
        });
        this.setData({
          ranking: rankingListDemo
        })
      })
      idx++;
    }
  }
})