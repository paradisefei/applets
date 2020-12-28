import ajax from "../../utils/ajax.js";
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
 * 4.收集到数据发送请求
 *    1.小程序表单校验
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "18720587332",
    password: "18720587332"
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
  // 点击登录
  submit() {
    /**
     * 1.发送请求
     *    1.使用封装好的函数
     * 2.登录成功后返回到个人中心页面，需要的数据有
     *    1.头像
     *    2.用户名
     *    3.听歌历史
     *  并成功渲染到页面上
     * 3.把数据保存在storage中
     * 4.校验
     * 5.发送请求
     *  
     */
    const {phone, password} = this.data;
    if(!phone){
      /**
       * 1.如果号码为空，进行校验
       * 2.显示的图标
       */
      wx.showToast({
        title: '号码为空',
        icon: "none"
      })
      return;
    }
    // 手机号正则
    const phoneReg = /^[1]([3-9])[0-9]{9}$/;
    if(!phoneReg.test(phone)){
      wx.showToast({
        title: '手机号格式错误',
        icon: "none"
      })
      return;
    }
    if (!password){
      wx.showToast({
        title: '密码为空',
        icon: "none"
      })
      return;
    }
    // 密码正则
    const passwordReg = /^[\w]{6,12}$/;
    if (!passwordReg.test(password)) {
      wx.showToast({
        title: '密码格式错误',
        icon: "none"
      })
      return;
    }


    // const data = {
    //   phone: this.data.phone,
    //   password: this.data.password
    // }
    const promiseLogin = ajax("login/cellphone", this.data);
    // console.log(promiseLogin);
    promiseLogin.then((res) => {
      /**
       * 1.跳转
       *    1.定义事件
       *    2.在成功的回调中传送数据
       * 2.把数据保存在storage中再跳转
       *    1.调用api保存数据到storage
       *    2.数据返回成功
       *    3.保存成功之后进行跳转
       */
      if(res.data.code === 200){
        /**
         * 1.功能成功
         * 2.保存数据到storage中
         * 3.返回的cookies中，有用的那个cookie不一定是确定的在数组中的某个位置的
         */
        
        console.log(res, res.data.profile);
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(res.data.profile)
        })
        const cookie = res.cookies.find((cookie) => {
          if(cookie.startsWith("MUSIC_U")){
            return true;
          }
        });
        // console.log(cookie);
        // 把cookies保存到storage中
        wx.setStorage({
          key: 'cookie',
          data: JSON.stringify(cookie)
        })
      }else{
        wx.showToast({
          title: '登录失败',
          icon:"none"
        })
        return;
      }
      // console.log(res);
      wx.switchTab({
        url: '/pages/personal/personal'
      })
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