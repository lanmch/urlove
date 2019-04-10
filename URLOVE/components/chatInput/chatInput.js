var id;
var socketobj;
Component({
  data: {
    emoji: [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "☺️", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "😘", "😗", "😙", "😚", "😋", "😜", "😝",
      "🤑", "🤗", "🤓", "😎", "🤡", "🤠", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "😤", "😠", "😡", "😶", "😐",
      "😑", "😯", "😦", "😧", "😮", "😲", "😵", "😳", "😱", "😨", "😰", "😢", "😥", "🤤", "😭", "😓", "😪", "😴", "🙄", "🤔",
      "😬", "🤥", "🤐",
      "🤢", "🤧", "😷", "🤒", "🤕", "👻", "😈", "👿", "💩", "👏", "✌️", "🤘", "👌", "👎", "👊", "✊", "🙏", "💪", "🌚", "🌝", "❤️", "💔", "🌹", "🌷","🌸","🐷", "🙈", "🙉", "🙊", "🐔", "🐤","🐭","🐶","🐷","🍎","🍞","🥓","🍟","🌮","🍗","🍔"
    ],
    content: "",
    emojiShow: false,
    value:null,
  },
  properties: {
    'matchUser':{
      type:Number,
      value:0
    },
    "myId":{
      type:Number,
      value:0
    }
  },
  methods:{
    choseEmoji: function (e) {
      var index = e.target.id;
      this.setData({
        content: this.data.content + this.data.emoji[index]
      })
    },
    getcontentValue: function (e) {
      this.setData({
        content: e.detail.value
      })
    },
    showEmoji: function () {
      this.setData({
        emojiShow: !this.data.emojiShow
      })
   },
    sendMsg: function () {
      var that = this;
        this.setData({
          emojiShow:false
        })
        var obj = {
        from: id,
        to: that.data.matchUser,
        content:that.data.content
      }
      console.log(obj);
      this.setData({
        content:""
      })
      var sendUrl
      if (this.properties.myId == 0) {
        console.log("myId是0")
        sendUrl = "/app/anonymousChat"
      } else {
        console.log("myId不是0")
        sendUrl = "/app/privateChat"
      }
      console.log(obj);
      socketobj.send(sendUrl, {}, JSON.stringify(obj));
    }
      
  },
  ready:function(){
     var that = this;
     id = getApp().globalData.userId;
     socketobj = getApp().globalData.socketObj;
     var subscribeUrl;
     if(this.properties.myId==0){
       subscribeUrl="/user/queue/anonymous"
     }else{
       subscribeUrl="/user/queue/chat"
     }
     socketobj.subscribe(subscribeUrl, function (msg, headers) {
      console.log("1");
      var obj = JSON.parse(msg.body);
      if(obj.code==4){
        console.log(obj);
        var val = obj.data;
        var myEventDetail = {
          val: val
        }
        console.log(obj.data);
        that.triggerEvent('myevent', myEventDetail);
      }else{
        wx.showModal({
          title: '提示',
          content: '不好意思，对方已经不在了哦～',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
              url:"/pages/HomePage/waitMatch/waitMatch"
              });
            }
          }
        })
      }
    })
  }
})