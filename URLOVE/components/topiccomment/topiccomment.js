var userToken,userId;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userHead:{
      type:String,
      value:''
    },
    userName:{
      type:String,
      value:''
    },
    applaudNum:{
      type:String,
      value:""
    },
    contents:{
      type:String,
      value:''
    },
    commentuserId:{
      type:Number,
      value:0
    },
    commentId:{
      type:Number,
      value: 0
    },
    likeVerdict:{
      type:Boolean,
      value:false
    },
    topicType:{
      type:String,
      value:''
    },
    toUid:{
      type:Number,
      value:0
    },
    toContent:{
      type:String,
      value: ''
    },
    toCommentId:{
      type:Number,
      value:0
    },
    topicId:{
      type:Number,
      value:0
    },
    toUname:{
      type:String,
      value:''
    },
    toOtherContent:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    emoji: [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝",
        "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐",
        "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔",
        "😬", "🤥", "🤐",
        "🤢", "🤧", "😷", "🤒", "🤕", "👻", "😈", "👿", "💩", "👏", "✌️", "🤘", "👌", , "👎", "👊", "✊", "🙏", "💪", "🌚", "🌝", "❤️", "💔", "🌹", "🌷", "🐷", "🙈", "🙉", "🙊", "🐔", "🐤"
      ],
      content: "",
      emojiShow: false,
      _num: 1,
      zanicon:"",
      ifHide:''
  },

  /**
   * 组件的方法列表
   */
  
  ready:function(options){
    var that = this;
      userToken = getApp().globalData.userToken;
      userId = getApp().globalData.userId;
      if(that.properties.likeVerdict == true){
        that.setData({
          zanicon:"/images/HotSearch/bezan.png"
        })
      }else{
        that.setData({
          zanicon:"/images/HotSearch/zanlogo.png"
        })
      };
      if(that.properties.toUname == '' || that.properties.toContent == ''){
        that.setData({
          ifHide: 'hide'
        })
      }else{
        that.setData({
          ifHide: 'show'
        })
      }
    },
  methods: {

    gourl:function(res){
      var that = this;
      wx.navigateTo({
        url:"/pages/common/myinfofromothers/myinfofromothers?topicuserId=" + that.data.commentuserId
      })
    },

    choseEmoji: function (e) {
      var index = e.target.id;
      var that = this;
      that.setData({
        content: that.data.content + that.data.emoji[index]
      })
      console.log(that.data.content)
    },
    getcontentValue: function (e) {
      var that = this;
      that.setData({
        content: e.detail.value
      });
    //  console.log(that.data.content)
    },
    showEmoji: function () {
      var that = this;
      that.setData({
        emojiShow: !that.data.emojiShow
      })
      
    },
    commentOthers: function(e){
      var that = this;
      that.setData({
        _num: 0
      })
    },
    hideLeavemessege: function(e){
      var that = this;
      console.log(e)
      if(e.target.id != 'lm' && e.target.id != 'input'){
        that.setData({
          _num: 1
        })
      };
    },
    sendComment:function(){
      var that = this;
      // console.log(that.properties.topicId);
      // console.log(that.properties.topicType);
      // console.log(that.data.content);
      // console.log(userId);
      // console.log(that.properties.toUid);
      // console.log(that.properties.toContent);
      // console.log(that.properties.toCommentId);
      // console.log(typeof(that.properties.topicId));
      // console.log(typeof(that.properties.topicType));
      // console.log(typeof(that.data.content));
      // console.log(typeof(userId));
      // console.log(typeof(that.properties.toUid));
      // console.log(typeof(that.properties.toContent));
      // console.log(typeof(that.properties.toCommentId));
      wx.request({
        url:"https://api.lengren.com.cn/comment/addComment",
        method:"POST",
        data:{
          topicId: that.properties.topicId,
          topicStatus: that.properties.topicType,
          content: that.data.content,
          formUId: userId,
          fromUName: 'Mch',
          toUId:that.properties.toUid,
          toContent:that.properties.toContent,
          toCommentId:that.properties.toCommentId
        },
        header: {
            "content-type": "application/json",
            "userId": userId,
            "userToken": userToken
          },
          success:function(res){
            console.log('二级评论成功');
            console.log(res);
            that.setData({
              content:'',
              _num: 1
            });
            
          }
      });

    },
      ifZan: function(){
        var that = this;
        if(that.properties.likeVerdict==false)
        {
          wx.request({
            url:"https://api.lengren.com.cn/comment/commentisLikeAuto",
            method:"GET",
            data:{
              userId: userId,
              commentId: that.data.commentId
            },
            header: {
                "content-type": "application/json",
                "userId": userId,
                "userToken": userToken
              },
              success:function(res){
                console.log(res);
                console.log('点赞评论成功');
                that.setData({
                  zanicon: '/images/HotSearch/bezan.png',
                  applaudNum: parseInt(that.properties.applaudNum) + 1,
                  likeVerdict:true
                });
              }
          })
        };
        if(that.properties.likeVerdict==true){
          wx.request({
            url:"https://api.lengren.com.cn/comment/commentisLikeDecrement",
            method:"GET",
            data:{
              userId: userId,
              commentId: that.data.commentId
            },
            header: {
                "content-type": "application/json",
                "userId": userId,
                "userToken": userToken
              },
              success:function(res){
                console.log(res);
                console.log('取消点赞评论成功');
                that.setData({
                  zanicon: '/images/HotSearch/zanlogo.png',
                  likeVerdict:false,
                  applaudNum:  parseInt(that.properties.applaudNum)-1
                });
              }
          })
        }
        
      }
  }
})
