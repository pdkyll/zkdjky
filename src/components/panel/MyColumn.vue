<template>
  <el-table-column v-if="isRefresh" :prop="col.column_name"
                   :label="col.column_comment"
                   :resizable=false
                   align="center">
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
</style>
