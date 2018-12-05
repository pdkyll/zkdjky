<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}
</script>

<style>
html, body, div, select, span, p, a, b, img, table, thead, tr, th, tbody, td, input, textarea, header, nav, menu, main, ul, li, dl, dd, dt, section, form, button, footer, aside, i, em, video, iframe, audio, sub, sup, :before, :after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body,
#app,
#app>.el-container,
#app>.el-container>.el-aside{
  height: 100%;
}
ul,
li{
  list-style: none;
}
a{
  text-decoration: none;
}
body .el-table th.gutter{
  display: table-cell!important;
}
.el-tree-node__content{
   height: 40px;
}
.pull-left{
  float: left;
}
.pull-right{
  float: right;
}
.color-green{
  color: #b7cc41;
}
.color-999{
  color: #999;
}
.mt-20{
  margin-top: 20px;
}
.ml-20{
  margin-left: 20px;
}
.ml-10{
  margin-left: 10px;
}
.mr-10{
  margin-right: 10px;
}
.mr-20{
  margin-right: 20px;
}
.mb-10{
  margin-bottom: 10px;
}
.mb-20{
  margin-bottom: 20px;
}
.no-mb{
  margin-bottom: 0;
}
.icon-green{
  color: #b7cc41;
}
.icon-red{
  color: #CC0F1B;
}
.clearFix:after {
  content:"";
  display: block;
  clear:both;
}
.fy-box{
  margin-top: 40px;
  width: 100%;
  text-align: center;
}
.w100{
  width: 100px;
}
.w200{
  width: 200px;
}
</style>
