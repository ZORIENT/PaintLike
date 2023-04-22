<!-- 
    底部导航栏
 -->

<template>
  <div class="appFooter">
      <div class="footerLeft">
          <!-- 项目标题 -->
          <h2 class="projectName">{{projectName}}</h2>
          <!-- 标语介绍 -->
          <span class="intro">{{projectIntro}}</span>
          <!-- 分享链接的icon -->
          <div class="iconList">
            <a href="#"  v-for="(icon,index) in iconList" :key="index">
                <span :class="'iconfont '+icon"></span>
            </a>
          </div>
      </div>

      <div class="footerRight">
          <!-- 五个导航 -->
          <div class="navigationItems">
            <router-link 
                v-for="(item,index) in navigationItems" 
                :key="index"
                :to="{
                    name: `${item.pageName}`,
                }"    
            >
                <span>{{item.itemName}}</span>
            </router-link>
          </div>

          <!-- 分割线 -->
          <hr>

          <!-- 版权信息 -->
          <h3>{{copyrightInfo}}</h3>
      </div>

  </div>
</template>

<script>
export default {
    name:"AppFooter",

    data() {
        return {
            projectName:"PaintLike",
            projectIntro:"Paint what you perfer",
            iconList:["icon-shejiao-weixin","icon-shejiao-QQ","icon-qqkongjian","icon-weibo"],
            copyrightInfo:"Copyright © Company names All rights reserved",
            navigationItems:[
                {itemName:"Home",pageName:"HomePage"},
                {itemName:"Personal",pageName:"UserPage"},
                {itemName:"Creation",pageName:"PaintingPage"},
                {itemName:"Information",pageName:"HelpPage"},
                {itemName:"Settings",pageName:"SettingPage"},
            ],
        }
    },
}
</script>

<style scoped>
    .appFooter{
        display: flex;
        justify-content: center;
        height: 146px;
        /* border: 1px solid brown; */
        /* background-color: var(--primaryThemeColor); */
        background-image: var(--primaryThemeLiner);
        color: var(--primaryThemeWhite);
        font-size: 16px;
        /* box-shadow: 0px 0px 8px var(--primaryThemeColor); */
        position: relative;
        z-index: 999;
    }

    .appFooter::before{
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-image: var(--primaryThemeLiner);
        filter: blur(8px);
        z-index: -1;
    }

    .footerLeft{
        width:40%;
        /* border: 1px solid brown; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .footerLeft .projectName{
        font-size: 32px;
        font-weight: bold;
    }

    .intro{
        margin: 12px;
        text-align: center;
    }

    .iconList{
        display: flex;
    }

    .iconList a{
        /* border: 1px solid brown; */
        padding: 4px;
        border: 2px solid var(--primaryThemeWhite);
        border-radius: 100%;
        margin: 0px 8px;
        position: relative;
        transition: all 0.2s;
    }

    .iconList a:hover{
        transform: translateY(-4px);
        box-shadow:0 0 8px var(--primaryThemeWhite);
    }


    .iconList a span{
        color: var(--primaryThemeWhite);
        font-size: 20px;
    }

    .footerRight{
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .footerRight hr{
        width: 72%;
        border: 1px solid var(--primaryThemeWhite);
        background-color: var(--primaryThemeWhite);
    }

    .footerRight h3{
        font-size: 16px;
        text-align: center;
    }

    .navigationItems{
        display: flex;
        justify-content: center;
        flex-flow: wrap;
    }

    .navigationItems a{
        padding:0px 24px;
        color: var(--primaryThemeWhite);
        font-weight: bold;
        transition: all 0.2s;
    }

    .navigationItems a:hover{
        /* transform: scale(1.1); */
        transform: translateY(-4px);
    }
</style>