<!-- 
    侧边浮动导航栏
 -->

<template>
  <div class="appFloatNav">
    <ul class="floatNavBtns">
      <!-- <li class="navBtn" v-for="(navBtn, index) in floatNavBtns" :key="index">
        <router-link
            :to="{
                    name:'testC',
                }
            "
            active-class="navBtnActive"
        >
          <span :class="'iconfont ' + navBtn"></span>
        </router-link>
      </li> -->

        <router-link
          active-class="navBtnActive"
          class="navBtn"
          v-for="(navBtn, index) in floatNavBtns"
          :key="index"
          :to="{
            name: `${navBtn.pageName}`,
          }"
        >
          <span :class="'iconfont ' + navBtn.icon"></span>
        </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppFloatNav",

  data() {
    return {
      floatNavBtns: [
        { icon: "icon-home-copy", pageName: "HomePage" },
        { icon: "icon-gerenxinxi", pageName: "UserPage" },
        { icon: "icon-zengjia", pageName: "PaintingPage" },
        { icon: "icon-bangzhu", pageName: "HelpPage" },
        { icon: "icon-a-topliontubiaoku_shezhi", pageName: "SettingPage" },
      ],
    };
  },
};
</script>

<style scoped>
.appFloatNav {
  /* border: 1px solid brown; */
  width: 56px;
  height: 360px;
  position: fixed;
  top: 240px;
  left: 18%;
  transform: translateX(-100%);
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  padding: 20px 0px;
}

.floatNavBtns {
  /* border: 1px solid brown; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.navBtn {
  width: 44px;
  height: 44px;
  /* margin: 10px 0px; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: var(--primaryThemeColor); */
  border-radius: calc(var(--borderRadius) * 1px);
  position: relative;
  z-index: 999;
}

.navBtn span {
  font-size: 26px;
  color: var(--primaryFontGreyColor);
  font-weight: 100;
}

.navBtnActive{
  background-image: var(--primaryThemeLiner);
  animation: navBtnChange 0.4s;
}
.navBtnActive span {
  /* background-image: var(--primaryThemeLiner); */
  color: var(--primaryThemeWhite);
  animation: navBtnChange 0.4s;
}

.navBtnActive::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-image: var(--primaryThemeLiner);
  filter: blur(8px);
  border-radius: calc(var(--borderRadius) * 1px);
  z-index: -1;
  transition: all 0.4s;
}

@keyframes navBtnChange{
  from{
    transform: scale(0.4);
  }to{
    transform: scale(1);
  }
}
</style>
