<!-- 
    App中的header，包含搜索框和用户头像
 -->

<template>
  <div class="appHeader">
    <!-- 网站的名称 -->
    <span class="projectName">{{ projectName }}</span>

    <!-- 搜索框 -->
    <div class="searchBox">
      <span class="iconfont icon-sousuo"></span>
      <input type="text" placeholder="Search" />
    </div>

    <!-- 头像 -->
    <div class="userInfo">
      <span>{{ userNameAppHeader }}</span>
      <div @click="isSettingSpread = !isSettingSpread" class="imgContent">
        <el-image :src="profileImg" class="profile" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>

        <transition name="triangle">
          <!-- 上三角形 -->
          <div v-show="isSettingSpread" class="triangle"></div>
        </transition>

        <transition name="settings">
          <!-- 头像下拉框 -->
          <ul v-show="isSettingSpread" class="dropDown">
            <!-- <li v-for="(setting, index) in settingList" :key="index">
              <a href="#">
                <span :class="'iconfont ' + setting.iconClass"></span>
                <span>{{ setting.settingName }}</span>
              </a>
            </li> -->

            <router-link
              tag="li"
              v-for="setting in settingList"
              :key="setting.iconClass"
              :to="{
                name: `${setting.pageName}`,
              }"
            >
              <span :class="'iconfont ' + setting.iconClass"></span>
              <span>{{ setting.settingName }}</span>
            </router-link>

            <li @click="loginOut">
              <span class="iconfont icon rcd-close-circle icon-rcd-close-circle"></span>
              <span>登 出</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {
      projectName: "PaintLike",
      userNameAppHeader: "Moribund",
      settingList: [
        {
          iconClass: "icon-gerenxinxi",
          settingName: "个人信息",
          pageName: "SettingPage",
        },
        {
          iconClass: "icon-qingchu",
          settingName: "发布涂鸦",
          pageName: "PaintingPage",
        },
        {
          iconClass: "rcd-heart icon-rcd-heart",
          settingName: "我的喜欢",
          pageName: "UserPage",
        },
        {
          iconClass: "icon-yanseziduan",
          settingName: "切换主题",
          pageName: "SettingPage",
        },
        {
          iconClass: "icon-bangzhu",
          settingName: "关 于",
          pageName: "HelpPage",
        }
      ],
      // setting是否展开
      isSettingSpread: false,
      profileImg: require("../assets/img/cube2.jpg"),
    };
  },

  methods: {
    // 点击退出登录，并且跳转到登录页面
    loginOut(){
      console.log("Login Out");
    }
  },
};
</script>

<style scoped>
.appHeader {
  display: flex;
  box-sizing: border-box;
  /* border: 1px solid brown; */
  width: 100%;
  height: 72px;
  align-items: center;
  /* background-color: var(--primaryThemeColor); */
  background-image: var(--primaryThemeLiner);
  justify-content: space-around;
  box-shadow: 0px 0px 8px var(--primaryThemeLiner);
  position: fixed;
  top: 0px;
  z-index: 999;
}

.appHeader::before {
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

.projectName {
  font-size: 32px;
  color: var(--primaryThemeWhite);
  font-weight: bold;
}

.searchBox {
  /* border: 1px solid red; */
  height: 40px;
  width: 400px;
  line-height: 40px;
  border-radius: 12px;
  box-shadow: 0px 0px 8px var(--primaryThemeWhite);
  margin: 0px 20px;
  display: flex;
  align-content: center;
}

.searchBox span {
  color: var(--primaryThemeWhite);
  font-size: 20px;
  margin: 0px 12px;
}

.searchBox input {
  flex-grow: 1;
  background-color: transparent;
  color: var(--primaryThemeWhite);
}

.searchBox input::placeholder {
  color: var(--primaryThemeWhite);
  font-size: 16px;
}

.userInfo {
  display: flex;
  align-items: center;
  /* border: 1px solid brown; */
}

.userInfo span {
  color: var(--primaryThemeWhite);
  font-size: 16px;
  font-weight: bold;
  margin: 0px 20px;
}

.userInfo .profile {
  height: 56px;
  width: 56px;
  border-radius: 56px;
}

.userInfo .profile .image-slot {
  position: relative;
  width: 100%;
  height: 100%;
}

.userInfo .profile i::before {
  color: var(--primaryThemeWhite);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  font-size: 24px;
}

.imgContent:hover {
  box-shadow: 0px 0px 8px 2px var(--primaryThemeWhite);
}

.imgContent {
  border-radius: 56px;
  position: relative;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.imgContent .triangle {
  position: absolute;
  top: 52px;
  width: 0px;
  height: 0px;
  border: 10px solid;
  border-color: transparent transparent var(--primaryThemeWhite) transparent;
  opacity: 0.3;
}

.imgContent .dropDown {
  position: absolute;
  /* float: left; */
  /* bottom: 10px; */
  top: 72px;
  /* border: 1px solid brown; */
  padding: 16px;
  width: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: 0px 2px 6px var(--primaryShadowColor);
  /* opacity: 0.6;
    background-color: var(--primaryThemeWhite); */
}

.imgContent .dropDown li {
  padding-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid var(--primaryFontGreyColor);
  /* background-color: red; */
  cursor: pointer;
}

.imgContent .dropDown li:hover span {
  color: black;
}

.imgContent .dropDown li:last-child span {
  /* color:rgb(253, 85, 85); */
  opacity: 0.6;
  color: rgb(221, 0, 0);
}

.imgContent .dropDown li:last-child:hover span {
  color: rgb(221, 0, 0);
  opacity: 1;
}

.imgContent .dropDown li:not(:last-child) {
  margin-bottom: 20px;
}

.imgContent .dropDown span {
  color: var(--primaryFontGreyColor);
  margin: 0px 10px 0px 0px;
}

/* 动画 */
@keyframes spreadTriangle {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 0.3;
  }
}

@keyframes spreadSettings {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
  }
}

.triangle-enter-active {
  animation: spreadTriangle 0.4s;
}

.triangle-leave-active {
  animation: spreadTriangle 0.4s reverse;
}

.settings-enter-active {
  animation: spreadSettings 0.4s;
}

.settings-leave-active {
  animation: spreadSettings 0.4s reverse;
}
</style>
