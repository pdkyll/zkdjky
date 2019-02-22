<template>
  <el-table-column v-if="isRefresh"
                   :prop="col.column_name"
                   :label="col.column_comment"
                   :width="col.column_comment=='项目' ? '350' : '150' "
                   :resizable=false
                   :align="col.column_comment=='项目' ? 'left' : 'center' ">
    <template v-if="col.children">
      <my-column v-for="(item, index) in col.children"
                 :key="index"
                 :col="item">
      </my-column>
    </template>
  </el-table-column>
</template>
<script>
  export default {
    name: 'MyColumn',
    props: {
      col: {
        type: Object
      }
    },
    data(){
      return{
        isRefresh:true,
      }
    },
    watch:{
      col:function (oldValue,newValue) {
        this.isRefresh = this.isRefresh?false:true;
        this.$nextTick(function(){//DOM变化回调函数：v-for渲染已完成
          this.isRefresh = this.isRefresh?false:true;
        })
      }
    }
  }
</script>
<style scoped>
  .w300{
     width: 300px;
   }
  .w100{
    width: 100px;
  }
</style>
