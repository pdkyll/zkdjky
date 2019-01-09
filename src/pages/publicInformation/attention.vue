<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!--<el-tab-pane label="定制表" name="first">定制表</el-tab-pane>-->
        <el-tab-pane label="订阅表" name="second">
          <!--<el-row :gutter="20">
            <el-col :span="24">
              <el-button class="pull-right qx" size="small">取消全部订阅</el-button>
            </el-col>
          </el-row>-->
          <el-row :gutter="20">
            <el-col :span="24">
              <attention-panel></attention-panel>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
// import PanelDy from '@/components/panel/PanelDy'
import attentionPanel from '@/components/panel/attentionPanel'
export default {
  data () {
    return {
      activeName: 'second'
    }
  },
  components: {
    attentionPanel
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__header {
    padding: 0;
    /*position: fixed;*/
    background: #fafafa;
    /*z-index: 1;*/
    width: 100%;
    margin-bottom:15px;
    /*margin-top: -20px;*/
  }
  .el-tabs__content{
    /*padding-top: 30px;*/
   padding-top: 5px;
  }
  .el-tabs__item.is-active{
    color: #bfd046;
  }
  .el-tabs__item:hover{
    color: #bfd046;
  }
  .el-tabs__active-bar{
    background-color: #bfd046;
  }
  .qx{
    margin-right: 1%;
    color: white;
    border-color: #d5d655;
    background-image: linear-gradient(to right, #b7cc41,#d5d655);
  &:hover,
  &:focus{
     color: white;
     border-color: #d5d655;
     background-image: linear-gradient(to right, #b7cc41,#d5d655);
   }
  }
  .el-row{
    margin-bottom: 20px;
  }
</style>
