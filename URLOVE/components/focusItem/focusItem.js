var userId;
Component({
  properties: {
    userLogo: {
      type: String,
      value: ''
    },
    userName: {
      type: String,
      value: ''
    },
    focusTime: {
      type: String,
      value: '2016-211-034'
    },
    signature:{
      type: String,
      value: '关注了我'
    },
    userId:{
      type: Number,
      value:0
    }
  },
  data: {

  },
  ready:function(){
    userId = getApp().globalData.userId;
  },
  methods: {
    showDetail:function(){
      console.log(this.properties.userId);
      if(userId == this.properties.userId){
        wx.navigateTo({
          url:"/pages/common/myinfofromme/myinfofromme?topicuserId="+this.properties.userId
        })
      }else{
        wx.navigateTo({
          url:"/pages/common/myinfofromothers/myinfofromothers?topicuserId="+this.properties.userId
        })
      }
    }
  }
})