<template>
  <div class="my-table">
    <el-table :data="data"
              border>
      <my-column v-for="(item,index) in col"  :key="index" :col="item"></my-column>
    </el-table>
  </div>
</template>

<script>
  import MyColumn from '../../components/panel/MyColumn.vue'
  export default {
    components: {
      MyColumn
    },
    props: {
      col: {
        type: Array
      },
      data: {
        type: Array
      }
    }
  }
</script>
<style scoped>
  .w300{
    width: 300px;
  }
</style>
