<!-- 
  主页中的用户分享内容组件
 -->

<template>
  <div class="shareItem">
    <!-- 上部头像框部分 -->
    <div class="topPart">
      <!-- 用户头像 -->
      <div class="userImg">
        <!-- <img src="../../assets/img/cube0.jpg" /> -->
        <el-image :src="profileImg" class="profile" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <!-- 用户信息 -->
      <div class="userInfo">
        <div class="userName">{{ name }}</div>
        <div class="time">{{ date }} {{ time }}</div>
      </div>
    </div>

    <!-- 中部内容部分 -->
    <div class="centerPart">
      <!-- 文字内容部分 -->
      <div class="content">{{ content }}</div>
      <!-- 图片内容,遍历数组 -->
      <div class="contentImg">
        <el-image
          v-for="url in imgUrls"
          :key="url"
          :src="url"
          lazy
          :preview-src-list="imgUrls"
          class="elImg"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <!-- 内容区icon -->
      <div class="iconList">
        <div :class="isLikeBtnChecked ? 'iconCheckedState' : ''">
          <span @click="clickLike" class="iconfont icon-rcd-heart"></span>
          <span>{{ likes }}</span>
        </div>
        <div :class="isDislikeChecked ? 'iconCheckedState' : ''">
          <span @click="clickDislike" class="iconfont icon-buxihuan"></span>
          <span>不喜欢</span>
        </div>
        <div>
          <span
            @click="isUnfold = !isUnfold"
            class="iconfont icon-pinglun1"
          ></span>
          <span>{{ commentList.length }}</span>
        </div>
      </div>
    </div>

    <!-- 下方评论区 -->
    <div v-show="isUnfold" class="bottomPart">
      <!-- 第一部分：发布评论区域 -->
      <div class="commentArea">
        <input
          v-model="postInput"
          placeholder="评论"
          @keyup.enter="postComment"
        />
        <button @click="postComment">评 论</button>
      </div>

      <!-- 第二部分：评论展示区域 -->
      <div class="commentList">
        <CommentPage
          v-for="commentInfo in commentList"
          :key="commentInfo.observerName"
          :commentInfo="commentInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
// 引入评论组件
import CommentPage from "./CommentPage.vue";

export default {
  name: "ShareItem",

  components: { CommentPage },

  data() {
    return {
      // 动态发布者昵称
      name: "Zorient",
      // 动态发布者头像
      profileImg:require("../../assets/img/cube5.jpg"),

      // 动态发布时间
      date: "5月23日",
      time: "13:42",

      // 其他数据
      likes: 56,
      isLikeBtnChecked: false,
      isDislikeChecked: false,
      // 该动态的评论区是否展开
      isUnfold: false,

      // 发布动态的文字内容
      content: `
        的好时机阿德凯撒肯德基，
        登记卡点卡我都没收，
        五日带你们学科绝对是看出，
        多哈win是大姐夫和数据。
      `,

      // 发布动态的图片地址数组
      imgUrls: [
        require("../../assets/img/cube0.jpg"),
        require("../../assets/img/cube1.jpg"),
        require("../../assets/img/cube2.jpg"),
        require("../../assets/img/cube3.jpg"),
        require("../../assets/img/cube4.jpg"),
        require("../../assets/img/cube5.jpg"),
      ],

      // 发布评论的输入框内容
      postInput: "",

      // 动态下的评论区数据
      commentList: [
        {
          // 评论者的昵称
          observerName: "Zorient",
          // 评论者的头像
          observerProfileImg: require("../../assets/img/cube0.jpg"),
          // 评论日期
          observerDate: "5月13日",
          // 评论时间
          observerTime: "13:25",
          // 评论内容
          observerContent: "编号1，你好，这是一段测试评论内容",
          // 评论点赞数
          observerLikes: 12,
        },
        {
          observerName: "July",
          observerProfileImg: require("../../assets/img/cube2.jpg"),
          observerDate: "10月28日",
          observerTime: "2:15",
          observerContent: "编号2，你好，这是一段测试评论内容",
          observerLikes: 5,
        },
        {
          observerName: "Halon",
          observerProfileImg: require("../../assets/img/cube5.jpg"),
          observerDate: "11月28日",
          observerTime: "9:20",
          observerContent: "编号3，你好，这是一段测试评论内容",
          observerLikes: 5,
        },
      ],
    };
  },

  methods: {
    // 喜欢按钮的点击事件
    clickLike() {
      this.isDislikeChecked = false;
      this.isLikeBtnChecked = !this.isLikeBtnChecked;
      this.isLikeBtnChecked ? (this.likes += 1) : (this.likes -= 1);
      // console.log("clickLIke:",this.isLikeBtnChecked,this.isDislikeChecked);
    },

    // 不喜欢按钮的点击事件
    clickDislike() {
      if (this.isLikeBtnChecked) {
        this.likes -= 1;
        this.isLikeBtnChecked = false;
      }
      this.isDislikeChecked = !this.isDislikeChecked;
      // console.log("clickLIke:",this.isLikeBtnChecked,this.isDislikeChecked);
    },

    // 发布评论（输入框和按钮）
    postComment() {
      // console.log("postComment");
      // 校验数据
      if (!this.postInput.trim()) {
        return this.$message({
          showClose: true,
          message: "评论内容不能为空！",
          offset: 140,
          type: "error",
        });
      }

      // 获取当前月份
      let date = new Date();
      // console.log("date",date);
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      // console.log("month",month);
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;

      // 将用户的输入包装成一个对象
      const obj = {
        observerName: localStorage.getItem("token"),
        observerProfileImg: require("../../assets/img/cube5.jpg"),
        observerDate: `${MM}月${d}日`,
        observerTime: `${h}:${m}`,
        observerContent: this.postInput,
        // 刚发布的评论点赞数为0
        observerLikes: 0,
      };

      // console.log("obj",obj);

      // 将包装好的对象插入到commentList中
      this.commentList.unshift(obj);
      this.postInput = "";
    },
  },
};
</script>

<style scoped>
.shareItem {
  /* border: 1px solid brown; */
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  display: flex;
  flex-direction: column;
  border-radius: calc(var(--borderRadius) * 1px);
  margin-bottom: 24px;
}

.topPart {
  /* border: 1px solid brown; */
  border-bottom: 1px solid var(--primaryShadowColor);
  display: flex;
}

.topPart .userImg{
  display: flex;
}

.topPart .userImg .profile {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 100%;
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  margin: 8px 8px;
  /* background-color: red; */
}

/* 头像加载失败时的样式 */
.topPart .userImg .profile .image-slot{
  /* width: 100%; */
  height: 100%;
  position: relative;
}

.topPart .userImg .profile i::before{
  position: absolute;
  left: 50%;
  top:50%;
  font-size: 24px;
  transform: translateX(-50%) translateY(-50%);
  color:var(--primaryFontGreyColor);
}


.topPart .userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.topPart .userInfo .userName {
  /* color: brown; */
  color: var(--primaryThemeColor);
  font-weight: bold;
  margin-bottom: 8px;
}

.topPart .userInfo .time {
  color: var(--primaryFontGreyColor);
  font-size: 14px;
}

.centerPart {
  /* border: 1px solid brown; */
  margin: 8px 80px;
}

.centerPart .content {
  margin: 8px 0px;
  font-size: 16px;
  line-height: 24px;
}

.centerPart .contentImg {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
}

.centerPart .contentImg >>> .el-image {
  width: 30%;
  margin: 12px 0px;
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
}

.centerPart .contentImg >>> .el-image:not(:nth-child(3n)) {
  margin-right: 5%;
}

.centerPart .iconList {
  display: flex;
}

.centerPart .iconList div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 16px;
  /* border: 1px solid brown; */
}

.centerPart .iconList div span {
  font-size: 14px;
}

.centerPart .iconList div span:first-child {
  font-size: 24px;
  cursor: pointer;
}

.bottomPart {
  /* border: 1px solid brown; */
  /* height: 100px; */
  margin: 0px 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius) * 1px);
  margin-bottom: 16px;
  transition: all 0.4s;
}

.commentArea {
  /* border: 1px solid brown; */
  /* border-bottom: 1px solid var(--primaryShadowColor); */
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 12px 0px;
  height: 64px;
}

.commentArea input {
  height: 32px;
  padding: 16px;
  margin: 0px 24px;
  width: 72%;
  border-radius: calc(var(--borderRadius) * 1px);
  background-color: var(--primaryBackgoundColor);
  box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff;
  transition: all 0.8s;
}

.commentArea input:focus{
  border-radius: 32px;
}

.commentArea button {
  width: 16%;
  min-width: 52px;
  height: 100%;
  margin-right: 24px;
  border-radius: calc(var(--borderRadius) * 1px);
  height: 32px;
  border: none;
  background-image: var(--primaryThemeLiner);
  color: var(--primaryThemeWhite);
  font-weight: bold;
  font-size: 16px;
  position: relative;
}

.commentArea button::before {
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
  transform: scale(0.8);
  transition: all 0.4s;
}

.commentArea button:hover::before {
  display: flex;
  transform: scale(1);
}

.commentList {
  /* border:1px solid blue; */
  display: felx;
  flex-direction: column;
}

.iconCheckedState {
  color: var(--primaryThemeColor);
}
</style>
