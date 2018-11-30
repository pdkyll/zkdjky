/**
 * Created by zhangxin on 2018/11/16.
 */
<template>
  <div>
    <el-row class="table-list" :gutter="20">
      <el-col :span="6" v-for="(i, index) in panel" :key="index">
        <div class="panel-publicInformation">
          <div class="panel-heading">
            <div class="panel-title">{{i.title}}</div>
          </div>
          <div class="panel-body">
            <ul class="list">
              <li v-for="item in i.content" :key="item.title">
                <div>{{item.title}}</div>
                <div style="text-align: center;">{{item.datetime}}</div>
                <div style="text-align: right;">
                  <i class="el-icon-view" @click="showItem(item.lookUrl)"></i>
                  <i class="el-icon-download"></i>
                  <i :class="item.fileType === 'video' ? 'el-icon-picture' : 'el-icon-document'"></i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose">
      <iframe src="publicInformation" frameborder="0" id="iframeBox" class="iframeBox"></iframe>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
/**
 * import '../../assets/vendor/iCkeck-v1.0.2/js/icheck.min';
 * import "vue-style-loader!css-loader!sass-loader!../../assets/vendor/iCkeck-v1.0.2/css/skins/square/blue.css";
 * import loginButton from './components/loginButton.vue';
 */
export default{
  data () {
    return {
      dom: '',
      dialogVisible: false,
      msg: '123',
      panel: [
        {
          title: '南京天晴',
          content: [
            {
              title: '公司年报',
              datetime: '2018-01-02',
              lookUrl: '/home',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '集团本年度盈利',
              datetime: '2018-01-02',
              lookUrl: 'publicInformation',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '行业回顾',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '公司年会',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'video'
            }
          ]
        },
        {
          title: '南京天晴',
          content: [
            {
              title: '公司年报',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '集团本年度盈利',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '行业回顾',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '公司年会',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'video'
            }
          ]
        },
        {
          title: '南京天晴',
          content: [
            {
              title: '公司年报',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '集团本年度盈利',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '行业回顾',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '公司年会',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'video'
            }
          ]
        },
        {
          title: '南京天晴',
          content: [
            {
              title: '公司年报',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '集团本年度盈利',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '行业回顾',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '公司年会',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'video'
            }
          ]
        },
        {
          title: '南京天晴',
          content: [
            {
              title: '公司年报',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '集团本年度盈利',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '行业回顾',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'text'
            },
            {
              title: '公司年会',
              datetime: '2018-01-02',
              lookUrl: 'http://localhost:8080',
              download: 'http://localhost:8080',
              fileType: 'video'
            }
          ]
        }
      ]
    }
  },
  components: {},
  methods: {
    handleClose () {
      this.dialogVisible = false
    },
    showItem (val) {
      this.dialogVisible = true
    }
  },
  created () {
    this.dom = document.getElementById('iframeBox')
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
  .iframeBox{
    width: 100%;
    height:500px;
  }
.panel-publicInformation{
  height:450px;
  padding: 20px 20px;
  margin-bottom: 20px;
  background-color: #fff;
  box-shadow: 0 0 29px rgba(#b1c4d0, .48);
  .panel-heading{
    padding: 0 0 20px 0;
    border-bottom: 1px solid #eceff2;
    .panel-title{
      font-size: 24px;
      font-weight: bold;
      color: #bfd046;
      text-align: center;
    }
  }
  .panel-body{
    height: 200px;
    overflow-y: auto;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
.list{
  li{
    display: flex;
    font-size: 14px;
    color: #303030;
    >div{
      flex: 1;
      line-height: 26px;
      overflow: hidden;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
     }
  }
}
</style>
