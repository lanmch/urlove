var userId,userToken;
var topicuserId;
Page({
	data:{
    loveContentDetails:{},
    imgLen:'',
    index:'',
    userId:'',
    userToken:'',
    psgId:'',     //文章id
    showBig:'',
    touchImg:false,
    Pnum1: false,
    Pnum2: false,
    Pnum3: false,
    emoji: [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝",
        "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐",
        "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔",
        "😬", "🤥", "🤐",
        "🤢", "🤧", "😷", "🤒", "🤕", "👻", "😈", "👿", "💩", "👏", "✌️", "🤘", "👌", , "👎", "👊", "✊", "🙏", "💪", "🌚", "🌝", "❤️", "💔", "🌹", "🌷", "🐷", "🙈", "🙉", "🙊", "🐔", "🐤"
      ],
      content: "",
      emojiShow: false,
      _num:1
	},
	onLoad:function(options){
     userToken= getApp().globalData.userToken;
     userId = getApp().globalData.userId;

    var psgIdValue = options.psgId;
    console.log(options);
    this.setData({
     psgId: psgIdValue
    })
   this.setLoveDetailsData();
   // this.getComment();
	},
  // getComment: function(){
  //   var that = this;
  //   wx.request({
  //     url:"http://120.78.165.40:9090/comment/getCommentByTopicId",
  //     method:"GET",
  //     data:{
  //       userId: userId,
  //       loveId: that.data.psgId,
  //       page: 1
  //     },
  //     header: {
  //         "content-type": "application/x-www-form-urlencoded",
  //         "userId": userId,
  //         "userToken": userToken
  //       },
  //       success:function(res){
  //         console.log(res);
  //         that.setData({
  //           commentlists: res.data.data
  //         });         
  //       }
  //   });
  // },
  //表白详情
  setLoveDetailsData:function(){
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/love/getDetailLove',
      method:'GET',
      data:{
        userId :userId,
        loveId:that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success:function(res){
        topicuserId = res.data.data.userId;
        that.setData({
          loveContentDetails: res.data.data,
          loveId: that.data.psgId
        })
        if (res.data.data.img == null) {
          that.setData({
            imgLen: 0
          })
        } else {
          that.setData({
            imgLen: res.data.data.img.length
          })
        }
        if (that.data.imgLen == 1) {
          that.setData({
            Pnum1: true
          })
        } else if (that.data.imgLen % 3 == 0) {
          that.setData({
            Pnum3: true
          })
        } else if (that.data.imgLen % 2 == 0 && that.data.imgLen != 8) {
          that.setData({
            Pnum2: true
          })
        }else{
          that.setData({
            Pnum3: true
          })
        }
      },
      error:function(){

      }
    })
  },

  showDetail:function(event){
    var that = this;
    var index = 0;
    var watchUrl = [];
    for (index in that.data.loveContentDetails.img){
      watchUrl.push(that.data.loveContentDetails.img[index])
    }
    console.log(watchUrl)
    wx.previewImage({
      urls: watchUrl
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

  sendComment:function(){
      var that = this;
      wx.request({
        url:"https://api.lengren.com.cn/comment/addComment",
        method:"POST",
        data:{
          topicId: that.data.psgId,
          topicStatus: 1,
          content: that.data.content,
          formUId: userId,
          formUName: '',
          toUId:"",
      toUName:"",
      toContent:""
        },
        header: {
            "content-type": "application/json",
            "userId": userId,
            "userToken": userToken
          },
          success:function(res){
            console.log(res);
          }
      });
      that.getComment();
  },

  showLeavemessege: function(e){
    var that = this;
    that.setData({
      _num: 0
    })
  },
  hideLeavemessege: function(e){
    var that = this;
    if(e.target.id != 'lm' && e.target.id != 'input'){
      that.setData({
        _num: 1
      })
    };
  },
	gotoOther:function(){
    console.log(topicuserId)
    if(userId == topicuserId){
      wx.navigateTo({
        url:"/pages/common/myinfofromme/myinfofromme?topicuserId="+topicuserId
      })
    }else{
      wx.navigateTo({
        url:"/pages/common/myinfofromothers/myinfofromothers?topicuserId="+topicuserId
      })
    }
  }
})	