var userId,userToken;
var topicuserId;
Page({
	data:{
    userId:'',
    userToken:'',
    psgId:'',
    topicType:'',
    contentDetails:{},
		Pnum1:false,
		Pnum2:false,
		Pnum3:false,
		flag:1,	
		userInfo:null,
		bbid:0,		
		bbqdin:null,
    emoji: [
        "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝",
        "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐",
        "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔",
        "😬", "🤥", "🤐",
        "🤢", "🤧", "😷", "🤒", "🤕", "👻", "😈", "👿", "💩", "👏", "✌️", "🤘", "👌", , "👎", "👊", "✊", "🙏", "💪", "🌚", "🌝", "❤️", "💔", "🌹", "🌷", "🐷", "🙈", "🙉", "🙊", "🐔", "🐤"
      ],
      content: "",
      emojiShow: false,
      _num: 1
	},
	onLoad:function(options){
    userToken = getApp().globalData.userToken;
    userId = getApp().globalData.userId;
    var psgIdValue = options.psgId;
    var topicTypeValue = options.topicType;
    console.log(options);
    this.setData({
      psgId: psgIdValue,
      topicType: topicTypeValue
    });
    if(this.data.topicType == '1'){
      console.log('jaoyi');
      this.setTradeDetailsData();
    };
    if(this.data.topicType == '5'){
      this.setHelpDetailsData();
      console.log('help');
    };
    // 心得
    if (this.data.topicType == '2') {
      this.setFeelDetailsData();
      console.log('xinde');
    };
    // 招聘
    if (this.data.topicType == '4') {
      this.setRecruitDetailsData();
      console.log('zhaopin');
    };
    //话题
    if(this.data.topicType == '3'){
      this.setTopicDetailsData();
      console.log('topicType');
    };
    this.getComment();
	},
  //大图
  showDetail:function(event){
    var that = this;
    var index = 0;
    var watchUrl = [];
    for (index in that.data.contentDetails.img){
      watchUrl.push(that.data.contentDetails.img[index])
    }
    console.log(watchUrl)
    wx.previewImage({
      urls: watchUrl
    })
  },
  //获取评论
  getComment: function(){
    var that = this;
    wx.request({
      url:"https://api.lengren.com.cn/comment/getCommentByTopicId",
      method:"GET",
      data:{
        userId: userId,
        topicId: that.data.psgId,
        page: 1
      },
      header: {
          "content-type": "application/x-www-form-urlencoded",
          "userId": userId,
          "userToken": userToken
        },
        success:function(res){
          console.log('评论列表');
          console.log(res);
          that.setData({
            commentlists: res.data.data
          });
        }
    });
  },
  //获取交易详情信息
  setTradeDetailsData: function () {
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/topic/getTopicDetails',
      method: 'GET',
      data: {
        userId: userId,
        topicId: that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success: function (res) {
        topicuserId = res.data.data.topicUserId;
        that.setData({
          contentDetails: res.data.data,
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
      error: function () {

      }
    })
  },
  //获取帮忙详情信息
  setHelpDetailsData: function () {
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/topic/getTopicDetails',
      method: 'GET',
      data: {
        userId: userId,
        topicId: that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success: function (res) {
        topicuserId = res.data.data.topicUserId;
        that.setData({
          contentDetails: res.data.data,
        })
        if ( res.data.data.img == null){
          that.setData({
            imgLen: 0
          })
        }else{
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
      error: function () {

      }
    })
  },

  //招聘详情信息
  setRecruitDetailsData: function () {
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/topic/getTopicDetails',
      method: 'GET',
      data: {
        userId: userId,
        topicId: that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success: function (res) {
        topicuserId = res.data.data.topicUserId;
        that.setData({
          contentDetails: res.data.data
        })
        console.log('res.data.data.img');
        console.log(res.data.data.img);
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
      error: function () {

      }
    })
  },

  //心得详情
  setFeelDetailsData: function () {
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/topic/getTopicDetails',
      method: 'GET',
      data: {
        userId: userId,
        topicId: that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success: function (res) {
        topicuserId = res.data.data.topicUserId;
        that.setData({
          contentDetails: res.data.data,
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
      error: function () {

      }
    })
  },

  //话题详情
  setTopicDetailsData: function () {
    var that = this;
    wx.request({
      url: 'https://api.lengren.com.cn/topic/getTopicDetails',
      method: 'GET',
      data: {
        userId: userId,
        topicId: that.data.psgId
      },
      header: {
        "content-type": "application/x-www-form-urlencoded",
        'userId': userId,
        'userToken': userToken
      },
      success: function (res) {
        console.log(res)
        topicuserId = res.data.data.topicUserId;
        that.setData({
          contentDetails: res.data.data,
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
      error: function () {

      }
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
          topicStatus: that.data.topicType,
          content: that.data.content,
          formUId: userId,
          formUName: 'Mch',
          toUId:"",
          toContent:""
        },
        header: {
            "content-type": "application/json",
            "userId": userId,
            "userToken": userToken
          },
          success:function(res){
            console.log('评论成功');
            console.log(res);
            that.setData({
              content:''
            });
            that.getComment();
          }
      });
      
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