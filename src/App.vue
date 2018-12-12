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

<style lang="scss">
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
.el-date-table td.end-date span, .el-date-table td.start-date span{
  background-color: #b7cc41;
}
.el-date-table td.current:not(.disabled) span{
  background-color: #b7cc41;
}
.el-date-table td.today span{
  color: #b7cc41;
}
.el-date-table td.available:hover{
  color: #b7cc41;
}
.el-select-dropdown__item.selected{
  color: #b7cc41;
}
.el-select .el-input.is-focus .el-input__inner {
  border-color: #b7cc41;
}
.el-select .el-input__inner:focus{
  border-color: #b7cc41;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color: #b7cc41;
}
.el-range-editor.is-active, .el-range-editor.is-active:hover{
  border-color: #b7cc41;
}
.green-btn{
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
.el-button--primary,.el-button--default{
  color: white;
  border-color: #d5d655;
  background-image: linear-gradient(to right, #b7cc41,#d5d655);
  &:hover,
  &:focus{
    color: white;
    border-color: #d5d655;
    background-image: linear-gradient(to right, #A2B53A,#A7A842);
  }
}
.el-button--text{
  color: #B8B94A;
}
.el-button--text:focus, .el-button--text:hover{
  color: #d5d655;
}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #b7cc41;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #b7cc41;
}
.el-textarea__inner:focus{
  border-color: #d5d655;
}
input:-webkit-autofill,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0px 1000px rgb(15,95,112) inset !important;
  -webkit-text-fill-color: #fff !important;
}
</style>
