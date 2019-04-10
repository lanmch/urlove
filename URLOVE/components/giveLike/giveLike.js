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
      value:''
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
    console.log('是否点赞likeverdict:')
    console.log(that.properties.likeVerdict);
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
          url: "https://api.lengren.com.cn/topic/topicLikeAuto",
          method: "POST",
          data: {
            userId: userId,
            topicId: that.properties.psgId
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
          url: "https://api.lengren.com.cn/topic/topicLikeDecrement",
          method: "POST",
          data: {
            userId: userId,
            topicId: that.properties.psgId
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

      // if(that.properties.likeVerdict){
      //   console.log('toggle true');
      //   that.setData({
      //     toggle:true
      //   })
      // }else{
      //   console.log('toggle false');
      //   that.setData({
      //     toggle:false
      //   })
      // }
      //   if(that.properties.likeVerdict){
      // if(that.properties.likeVerdict){
      //   console.log('toggle true');
      //   that.setData({
      //     likeVerdict:true
      //   })
      // }else{
      //   console.log('toggle false');
      //   that.setData({
      //     likeVerdict:false
      //   })
      // }
      // if(that.data.toggle == false){
//       if(that.data.likeVerdict == false){
//         requestUrl = 'https://api.lengren.com.cn/topic/topicLikeAuto'
//       }else{
//         requestUrl = 'https://api.lengren.com.cn/topic/topicLikeDecrement'
//       }
//       wx.request({
//         url: requestUrl,
//         data: {
//           userId: that.properties.userId,
//           topicId: that.properties.psgId
//         },
//         header: {
//           "content-type": "applciation/json",
//           'userId': that.properties.userId,
//           'userToken': that.properties.userToken
//         },
//         method: "GET",
//         success: function (res) {
//           if (that.data.likeVerdict) {
//             console.log('jiajiajia');
//             that.setData({
//                isLikeNum:parseInt(that.properties.isLikeNum)-1
//             })
//           }else{
//             console.log('jianjianjian');
//             that.setData({
//                isLikeNum:parseInt(that.properties.isLikeNum)+1
//             })
//           }
//           that.setData({
//             // toggle: !(that.properties.toggle),
//             likeVerdict:!(that.data.likeVerdict)
//           })
//           console.log(that.data.likeVerdict);
//         },
//         fail: function (err) { },//请求失败
//         complete: function () { }//请求完成后执行的函数
//       })
//     }
//   }
// })
