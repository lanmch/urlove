var userId,userToken;
Component({
  properties: {
    isLikeNum:{
      type:String,
      value:''
    },
    userId:{
      type:String,
      value:''
    },
    userToken:{
      type:String,
      value:''
    },
    psgId:{
      type:String,
      value:''
    },
    likeVerdict:{
      type:Boolean,
      value:false
    },
    // zanlogo:{
    //   type:String,
    //   value:''
    // }
  },
  data: {
    psgId:'',
    zanlogo:''
    // toggle:''   //true 已点赞  false 未点赞
  },
  ready:function(){
    var that = this;
    userToken = getApp().globalData.userToken;
    userId = getApp().globalData.userId;
    // console.log('likeverdict:')
    // console.log(that.properties.likeVerdict);
    if (that.properties.likeVerdict){
      that.setData({
        // toggle:true,
        zanlogo:'/images/HotSearch/bezan.png'
      })
    }
    else {
      that.setData({
        // toggle:false,
        zanlogo:'/images/HotSearch/zanlogo.png'
      })
    }
  },
  methods: {
    giveLike:function(){
      var that = this;
      if (that.properties.likeVerdict == false) {
        wx.request({
          url: "https://api.lengren.com.cn/love/addLike",
          method: "POST",
          data: {
            userId: userId,
            loveId: parseInt(that.properties.psgId)
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "userId": userId,
            "userToken": userToken
          },
          success: function (res) {
            console.log(res);
            console.log('点赞评论成功');
            that.setData({
              zanlogo: '/images/HotSearch/bezan.png',
              isLikeNum: parseInt(that.properties.isLikeNum) + 1,
              likeVerdict: true
            });
          }
        })
      };
      if (that.properties.likeVerdict == true) {
        wx.request({
          url: "https://api.lengren.com.cn/love/cancelLike",
          method: "POST",
          data: {
            userId: userId,
            loveId: parseInt(that.properties.psgId)
          },
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "userId": userId,
            "userToken": userToken
          },
          success: function (res) {
            console.log(res);
            console.log('取消点赞评论成功');
            that.setData({
              zanlogo: '/images/HotSearch/zanlogo.png',
              likeVerdict: false,
              isLikeNum: parseInt(that.properties.isLikeNum) - 1
            });
          }
        })
      };
    }
  }
})
