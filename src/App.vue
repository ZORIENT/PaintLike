<template>
  <div class="app">
    <AppHeader/>

    <div class="section">
      <!-- section左边的部分 -->
      <div class="sectionLeft">
        <AppFloatNav></AppFloatNav>
      </div>

      <!-- section中间的部分 -->
      <div class="sectionCenter">
        <keep-alive><router-view></router-view></keep-alive>
      </div>

      <!-- section右边的部分 -->
      <div class="sectionRight">
        
      </div>

    </div>

    <AppFooter/>

  </div>
</template>

<script>


import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppFloatNav from "./components/AppFloatNav.vue"

export default {
  name:"App",

  components:{ AppHeader,AppFooter,AppFloatNav },

}
</script>

<!-- 忘了这段代码是干什么的了，好像是取消a标签的默认跳转 -->
  <!-- $("body").on("mousedown", "a", function (e) {
    e.preventDefault();
  }); -->

<style>
/* 定义全局css变量 */
:root{
  --primaryBackgoundColor:#dfdfdf;
  --primaryThemeColor:#FF2D55;
  /* --primaryThemeColor:#4facfe; */
  --primaryThemeWhite:#fff;
  --primaryShadowColor:#A6A6A6;
  --primaryFontGreyColor:#646464;
  --borderRadius:8;
  --primaryThemeLiner:linear-gradient(120deg, #f40243 0%, #FF2D55 35%,#ff2d81 65%, #e6077e 100%);
  /* --primaryThemeLiner: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); */
}

/* 全局样式 */
html,
body{
  height:100%;
  background-color: var(--primaryBackgoundColor);
}

/* 点击图片预览按钮的样式 */
.el-image-viewer__wrapper span{
  /* background-color: var(--primaryThemeColor); */
  opacity: 0.6;
  border: 2px solid var(--primaryThemeWhite);
  background: none;
}

.el-image-viewer__wrapper .el-image-viewer__actions{
  /* background-color: var(--primaryThemeColor); */
  background: none;
  border: 2px solid var(--primaryThemeWhite);
  opacity: 0.6;
  border-radius: calc(var(--borderRadius)*1px);
}

/* 顶部弹出提示框的样式 */
.el-message{
  background-image: var(--primaryThemeLiner);
  border-radius: calc(var(--borderRadius)*1px) !important;
  border: none !important;
  opacity: 0.8;
  box-shadow: 0px 0px 8px var(--primaryThemeColor);
}

.el-message .el-message__icon.el-icon-info,
.el-message--info .el-message__content,
.el-message .el-icon-error,
.el-message__closeBtn,
.el-message__icon.el-icon-warning,
.el-message--warning .el-message__content,
.el-message--error .el-message__content,
.el-message .el-icon-success,
.el-message--success .el-message__content{
  color: var(--primaryThemeWhite) !important;
  font-size: 16px;
}

/* 日期选择弹出框的样式 */
.el-picker-panel.el-date-picker{
  background-color:var(--primaryBackgoundColor);
  border: none;
  border-radius: calc(var(--borderRadius)*1px);
  /* color: red; */
}

.el-date-picker__header-label:hover,
.el-month-table td .cell:hover,
.el-month-table td.current:not(.disabled) .cell,
.el-date-table .available:hover div span,
.el-date-picker__header button:hover{
  color: var(--primaryThemeColor) !important;
}

.el-date-table td.current:not(.disabled) span{
  background-color: var(--primaryThemeColor) !important;
}

.el-popper .popper__arrow{
  /* 取消弹出选框的小三角 */
  display: none !important;
}

/* 地区选择弹出框样式 */
.el-cascader__dropdown{
  background: var(--primaryBackgoundColor) !important;
  border: none !important;
  border-radius: calc(var(--borderRadius)*1px) !important;
}

.el-cascader-node:hover,
.el-cascader-node:not(.is-disabled):focus, 
.el-cascader-node:not(.is-disabled):hover{
  background-color: var(--primaryShadowColor) !important;
}

.el-cascader-node.in-active-path,
.el-cascader-node.is-active{
  background-color: #bbbbbb!important;
  color: var(--primaryThemeColor) !important;
}

/* select下拉框的样式 */
.el-select-dropdown{
  width: 40px;
  border: none;
}
.el-select-dropdown{
  background-color: var(--primaryBackgoundColor) !important;
  border: none !important;
  box-shadow: 0px 0px 8px var(--primaryShadowColor) !important;
}

.el-select-dropdown__item.hover{
  background-color: #bbbbbb !important;
}

.el-select-dropdown__item.selected{
  color: var(--primaryThemeColor) !important;
}

.el-select-dropdown__item{
  display: flex;
  justify-content: center;
}

/* 颜色下拉框的样式 */
.el-color-picker__panel{
  background-color: var(--primaryBackgoundColor) !important;
  border: none !important;
  border-radius: calc(var(--borderRadius)*1px) !important;
  padding: 8px !important;
}

.el-input__inner{
  background-color: var(--primaryBackgoundColor) !important;
  border: none !important;
  border-radius: calc(var(--borderRadius)*1px) !important;
  box-shadow: 0px 0px 8px var(--primaryShadowColor) !important;
}

.el-color-dropdown__btns .el-button{
  background-color:  var(--primaryBackgoundColor);
  border: none;
  color: var(--primaryFontGreyColor);
}

.el-color-dropdown__btns .el-button:last-child{
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
}

.el-color-dropdown__btns .el-button:hover,
.el-color-dropdown__btns .el-button:hover span{
  background-color:  var(--primaryBackgoundColor) !important;
  color: var(--primaryThemeColor);
}

/* 设置隐藏滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

/* app中的样式 */

.app{
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.section{
  margin-top: 72px;
  width: 100%;
  /* height:1000px; */
  flex-grow: 1;
  /* background-color: brown; */
  display: flex;
}

.sectionLeft{
  /* border: 1px solid brown; */
  width: 20%;
  /* flex-grow: 1; */
}

.sectionCenter{
  /* border: 1px solid brown; */
  /* flex-grow: 1; */
  width: 60%;
}

.sectionRight{
  /* border: 1px solid brown; */
  width: 20%;
  /* flex-grow: 1; */
}

</style>