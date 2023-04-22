<!-- 用户页面！ -->
<template>
  <div class="userPage">
    <!-- 上部用户信息部分 -->
    <div class="userInfo">
      <!-- 左侧头像部分 -->
      <div class="left">
        <el-image :src="profileImg" class="profile" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>

      <!-- 右侧信息部分 -->
      <div class="right">
        <!-- 上半部分 -->
        <div class="top">
          <!-- 用户名和性别 -->
          <div>
            <span>{{ userName }}</span>
            <span
              :class="
                gender === '男'
                  ? 'iconfont icon-xingbie-nan'
                  : 'iconfont icon-xingbie-nv'
              "
              :style="gender === '男' ? 'color: blue;' : 'color: red;'"
            ></span>
          </div>
          <!-- 编辑个人信息 -->
          <div>
            <button @click="editInfo">编辑个人信息</button>
          </div>
        </div>

        <div class="bottom">
          <span>所在地区：{{location}}</span>
          <span>年龄：{{age}}岁</span>
          <span>介绍：{{intro}}</span>
        </div>
      </div>
    </div>

    <!-- 中间两个nav -->
    <!-- <div class="navBtn">
      <button :class="isPublishPage?'activeBtn':''">我的发布</button>
      <button :class="!isPublishPage?'activeBtn':''">我的喜欢</button>
    </div> -->

    <!-- 导航条 -->
    <div class="navBtn">
      <router-link 
        active-class="activeBtn"
        v-for="(navBar,index) in navBtnList" 
        :key="index"
        :to="{
            name: `${navBar.pageName}`,
          }"
      >
        {{navBar.title}}
      </router-link>
    </div>

    <!-- 下方展示区，显示我的喜欢或我的发布 -->
    <div class="showArea">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",

  data() {
    return {
      // 单个登录用户的信息，可以包装成一个对象，不是数组！
      userName: "Maoribund",
      gender: "男",
      location:"四川省成都市",
      age:23,
      intro:"这是一段介绍🍤",
      profileImg: require("../assets/img/cube2.jpg"),

      // 该页面需要的变量
      navBtnList:[
        {pageName:"MyPublish",title:"我的发布"},
        {pageName:"MyLikes",title:"我的喜欢"},
      ]
    };
  },

  methods: {
    editInfo(){
      this.$router.push({
            name:"SettingPage",
        })
    }
  },
};
</script>

<style scoped>
.userPage {
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.userInfo,
.navBtn,
.showArea {
  /* border: 1px solid green; */
  display: flex;
  width: 80%;
}

.userInfo{
  margin-top: 32px;
}

.userInfo .profile {
  height: 152px;
  width: 152px;
  border-radius: 100%;
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

.userInfo .right{
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  /* align-items: center; */
  justify-content: center;
  margin-left: 24px;
  padding: 16px;
}

.userInfo .top{
  display: flex;
  align-items: center;
  justify-content:space-between;
}

.userInfo .top span{
  color: var(--primaryThemeColor);
  font-weight: bold;
  font-size: 24px;
  margin-right: 16px;
}

.userInfo .top button{
  border: none;
  background-image: var(--primaryThemeLiner);
  border-radius: calc(var(--borderRadius)*1px);
  height: 32px;
  width: 100px;
  color: var(--primaryThemeWhite);
  font-weight: bold;
  position: relative;
  z-index: 1;
  cursor: pointer;
}

.userInfo .top button::before{
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-image: var(--primaryThemeLiner);
  border-radius: calc(var(--borderRadius) * 1px);
  z-index: -1;
  filter: blur(8px);
  transition: all 0.4s;
  transform: scale(0.6);
  cursor: pointer;
}

.userInfo .top button:hover::before{
  transform: scale(1);
}

.userInfo .bottom{
  display: flex;
  flex-direction: column;
  color: var(--primaryFontGreyColor);
  font-size: 14px;
  line-height: 24px;
  margin-top: 16px;
}

.navBtn {
  /* border: 1px solid yellow; */
  justify-content: center;
  width: 40%;
  height: 48px;
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius)*1px);
  position: sticky;
  overflow: hidden;
  top:80px;
  z-index: 999;
}

.navBtn a{
  width: 50%;
  border: none;
  background-color: var(--primaryBackgoundColor);
  color: var(--primaryFontGreyColor);
  font-weight: bold;
  font-size: 18px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navBtn a:hover{
  color: var(--primaryThemeColor);
}

.navBtn a.activeBtn{
  /* background-image: var(--primaryThemeLiner); */
  color:var(--primaryThemeColor);
  animation: navBarChange 0.4s;
}

/* .navBtn a::before{
  content: "";
  position: absolute;
  top: 48px;
  width: 0px;
  height: 0px;
  border: 16px solid;
  border-color: var(--primaryShadowColor) transparent transparent transparent;
  opacity: 0.3;
  z-index: -1;
} */

.showArea{
  margin-top: 24px;
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