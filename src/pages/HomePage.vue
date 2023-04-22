<!-- 主页！ -->
<template>
  <div class="homePage">
    <!-- 走马灯 -->
    <div class="marquee">
      <el-carousel :interval="4000" type="card" height="240px">
        <el-carousel-item v-for="item in imgList" :key="item.id">
          <img :src="item.imgSrc" class="marqueeImg"/>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 导航条 -->
    <div class="navigation">
      <router-link 
        active-class="navBarActive"
        v-for="(navBar,index) in navigatorList" 
        :key="index"
        :to="{
            name: `${navBar.pageName}`,
          }"
      >
        {{navBar.title}}
      </router-link>
    </div>

    <!-- 主页下方显示区 -->
    <div class="routerView">
      <keep-alive><router-view></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {
      imgList:[
        {id:0,imgSrc:require('../assets/img/cube0.jpg'),},
        {id:1,imgSrc:require('../assets/img/cube1.jpg'),},
        {id:2,imgSrc:require('../assets/img/cube2.jpg'),},
        {id:3,imgSrc:require('../assets/img/cube3.jpg'),},
        {id:4,imgSrc:require('../assets/img/cube4.jpg'),},
        {id:5,imgSrc:require('../assets/img/cube5.jpg'),},
      ],

      // navigatorList:["热 门","日 常","漫 画","活 动"],
      navigatorList:[
        {pageName:"HotPage",title:"热 门"},
        {pageName:"DailyPage",title:"日 常"},
        {pageName:"CaricaturePage",title:"漫 画"},
        {pageName:"EventPage",title:"活 动"},
      ]
    }
  },
};
</script>

<style scoped>
.homePage{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marquee{
  margin: 20px 0px;
  width: 100%;
}

.marquee >>> .el-carousel__arrow{
  /* background-color: brown; */
  height: 24px;
  width: 24px;
}

.marquee >>> .el-carousel__item--card{
  /* background-color: var(--primaryThemeWhite); */
  border-radius: calc(var(--borderRadius)*1px);
}

.marquee >>> .is-active button{
  background-color: var(--primaryThemeColor);
}

.marqueeImg{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.navigation{
  display: flex;
  position: sticky;
  top:80px;
  /* border: 1px solid brown; */
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  width: 80%;
  height: 48px;
  border-radius: calc(var(--borderRadius)*1px);
  background-color: var(--primaryBackgoundColor);
  z-index: 999;
}

.navigation a{
  flex-grow: 1;
  text-align: center;
  line-height: 48px;
  /* border-bottom: 2px solid brown */
  color: var(--primaryFontGreyColor);
  font-size: 18px;
  font-weight: bold;
  
}

.navigation a.navBarActive {
  /* border-bottom: 4px solid var(--primaryThemeColor); */
  color: var(--primaryThemeColor);
  animation: navBarChange 0.4s;
  /* box-shadow: inset 4px 4px 4px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius)*1px); */
}

.navigation a:hover{
  color: var(--primaryThemeColor);
}

.routerView{
  margin-top: 20px;
  width: 80%;
  /* border: 1px solid brown; */
}

@keyframes navBarChange{
  from{
    transform: scale(0.4);
    /* width: 0px; */
  }to{
    transform: scale(1);
    /* width: 25%; */
  }
}
</style>