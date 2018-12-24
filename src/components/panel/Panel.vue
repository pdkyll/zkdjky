/**
 * Created by zhangxin on 2018/11/16.
 */
<template>
  <div>
    <el-row class="table-list" :gutter="20" v-loading="dialogVisible">
      <el-col :span="6" v-for="(i, index) in panel" :key="index">
        <div class="panel-publicInformation">
          <div class="panel-heading">
            <div class="panel-title">{{i.title}}</div>
          </div>
          <div class="panel-body">
            <ul class="list">
              <li v-for="item in i.content" :key="item.title">
                <div style="text-align: left; width: 43%" :title="item.INFO_NAME">{{item.INFO_NAME}}</div>
                <!--<div style="text-align: center;" :title="item.WEIGHTINESS">{{item.WEIGHTINESS}}</div>-->
                <div style="width: 29%;">
                  <el-rate v-model="item.WEIGHTINESS" :title="'权重'+item.WEIGHTINESS+'星'" disabled style="line-height: 0.2;"></el-rate>
                </div>
                <div style="text-align: center; width: 19%;" :title="item.CREATION_TIME">{{item.CREATION_TIME}}</div>
                <div style="text-align: right; width: 9%">
                  <!--<i class="el-icon-view" @click="showItem(item.ID,item.DATA_TYPE)"></i>-->
                  <i class="el-icon-download" v-if="$store.getters.getPermissions.indexOf('downloFormulaSetting')>-1" style="cursor: pointer" @click="downItem(item.ID)"></i>
                  <i v-if="item.DATA_TYPE===1" class="el-icon-document"></i>
                  <i v-if="item.DATA_TYPE===2" class="el-icon-service"></i>
                  <i v-if="item.DATA_TYPE===3" class="el-icon-caret-right"></i>
                  <i v-if="item.DATA_TYPE===4" class="el-icon-picture"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
/**
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */

export default{
  props:['time'],
  name: "child",
  data () {
    return {
      dom: '',
      dialogVisible: true,
      panel: [{
        title:'',
        content:[
          /*{
            CPCC: "108",
            CPCCName: "中可点击yy",
            CREATION_TIME: "2018-12-14",
            DATA_TYPE: 1,
            ID: 21,
            INFO_NAME: "win10激活密码",
            WEIGHTINESS: 2,
          },
          {
            CPCC: "108",
            CPCCName: "中可点击yy",
            CREATION_TIME: "2018-12-14",
            DATA_TYPE: 1,
            ID: 21,
            INFO_NAME: "win10激活密码",
            WEIGHTINESS: 2,
          }*/
        ]
      }],
      imgSrc:'',
      playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: "" //url地址
        }],
        poster: "../../static/images/test.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      docSrc:'',
      imgShow:'',

    }
  },
  components: {
  },
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    closeLook(){
      this.dialogVisible = false
      this.imgSrc = []
      this.docSrc = []
      this.playerOptions.sources[0].src = []
    },
    /*预览文件*/
    /*showItem (val,code) {
      let vm = this
      this.imgShow = code
      console.log(this.imgShow)
      this.dialogVisible = true
      let param = {
        id:val,
      }

      let header = {
        accessToken:sessionStorage.getItem('accessToken')
      }
      this.$store.dispatch('LINK_DOWNLOAD', { param, header }).then((res, req) => {
        if(res.status == 200){
          console.log(res)
          if(code == 1){
            //vm.docSrc = 'http://api.tpaas.youedata.com/swift/v1/AUTH_9rkxf4dl9w02o0z4/0827/%E9%A2%86%E8%A2%96%E5%B3%B0%E4%BC%9A-%E6%95%B0%E5%AD%97%E5%8C%96%E6%97%B6%E4%BB%A3IT%E5%BB%BA%E8%AE%BE%E4%B9%8B%E6%88%91%E8%A7%81-%E6%9D%8E%E4%BC%9F-%E8%B4%9D%E4%B8%9A%E6%96%B0%E5%85%84%E5%BC%9F-%E4%B8%8B%E8%BD%BD%E7%89%88.pdf?temp_url_sig=07dfaee7ce8ed1c5d7930448bd94e236bd06d594&temp_url_expires=1543631419'
            vm.docSrc = res.data
          }else if(code == 2){
            //vm.playerOptions.sources[0].src = 'http://m10.music.126.net/20181201101034/02a1f47c17ed08d617aedefb34165433/ymusic/404c/f4ba/5bdf/62eb0288d45d635ad464651cfac004cb.mp3'
            vm.audioSrc = res.data
          }else if(code == 3){
            //vm.playerOptions.sources[0].src = 'http://111.73.46.246/st/AVI-%E8%A5%BF%E8%92%99%E5%A8%9CANE%E7%9A%84%E7%AC%A6%E5%92%92-%E8%BD%A6%E6%A8%A1%E7%8B%82%E8%88%9E-%E6%B1%BD%E8%BD%A6%E5%AF%BC%E8%88%AA%E4%B8%93%E7%94%A8MV%E8%A7%86%E9%A2%91%E6%AD%8C%E6%9B%B2.flv'
            vm.playerOptions.sources[0].src = res.data
          }else{
            //vm.imgSrc = 'http://api.tpaas.youedata.com/swift/v1/AUTH_9rkxf4dl9w02o0z4/20181201/1191540303700_.pic_hd.jpg?temp_url_sig=d142cae91e88faee46cbb0bca296e30a34b0d7c8&temp_url_expires=1543625518'
            vm.imgSrc = res.data
          }
        }
      }).catch((error) => {
        console.error(error)
      })
    },*/
    /*点击下载文件*/
    downItem(val){
      let param = {
        id:val,
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId :sessionStorage.getItem('projectId')
      }
      this.$store.dispatch('LINK_DOWNLOAD', { param, header }).then((res, req) => {
        if(res.status == 200){
          this.download(res.data.data);
        }
      }).catch((error) => {
        console.error(error)
      })
    },
    download(url) {
      var iframe = document.createElement("iframe")
      iframe.style.display ="none";
      iframe.src = url;
      document.body.appendChild(iframe);
    },
    /*获取公司信息*/
    getPublicMsg(company,start,end){
      this.dialogVisible = true
      let param = {
        startDate:start,
        endDate:end,
        cpcc:company
      }
      let header = {
        accessToken: sessionStorage.getItem('accessToken'),
        projectId :sessionStorage.getItem('projectId')
      }
      this.$store.dispatch('PUBLIC_MSG', { param, header }).then((res, req) => {
        let data = res.data.data
        if(res.data.code == 16000003){
          this.panel = []
          var a = {};
          for (var i = 0; i < data.length; i++) {
            a[data[i].CPCCName] = new Array();
          }
          for (let i of data) {
            for(let j in a){
              if(i.CPCCName==j){
                a[i.CPCCName].push(i);
              }
            }
          }
          for (let i in a){
            var temp ={};
            temp.title= i ;
            temp.content = new Array();
            for( let j of a[i]){
              temp.content.push(j);
            }
            if(temp.title!=='null'){
              this.panel.push(temp);
            }
          }
        }
        this.dialogVisible = false
      }).catch((error) => {
        console.error(error)
      })
    },

  },
  created () {
    /*this.dom = document.getElementById('iframeBox')*/
    this.getPublicMsg("","","")
  },
  mounted () {
  },
}
</script>
<style scoped lang="scss">
  .iframeBox{
    width: 100%;
    height:500px;
  }
.panel-publicInformation{
  /*height:450px;*/
 height:auto;
  /*padding: 20px 20px;*/
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 29px rgba(#b1c4d0, .48);
  /*.panel-heading{
    padding: 0 0 20px 0;
    border-bottom: 1px solid #eceff2;
    .panel-title{
      font-size: 24px;
      font-weight: bold;
      color: #bfd046;
      text-align: center;
    }
  }*/
 .panel-heading{
    /*padding: 0 0 20px 0;*/
    border-bottom: 1px solid #eceff2;
    height:145px;
    line-height:145px;
    background:#bad115;
    .panel-title{
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      text-align: center;
    }
  }
  .panel-body{
    /*height: 80%;*/
    height:400px;
    overflow-y: auto;
    /*padding-top: 20px;
    padding-bottom: 20px;*/
   padding:20px
  }
}
.list{
  li{
    display: flex;
    font-size: 14px;
    color: #303030;
    >div{
      line-height: 26px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
     }
  }
}
</style>
