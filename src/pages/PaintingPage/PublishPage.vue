<!-- 发布模块组件 -->

<template>
  <div class="publishPage">
    <el-form ref="publishForm" :model="publishForm" label-position="top">
      <el-form-item label="发布内容">
        <el-input type="textarea" v-model="publishForm.content"></el-input>
      </el-form-item>

      <el-form-item label="发布版块">
        <el-radio-group v-model="publishForm.choose">
          <el-radio label="日常"></el-radio>
          <el-radio label="漫画"></el-radio>
          <el-radio label="活动"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item class="uploadImg">
        <el-upload
          action=""
          :auto-upload="true"
          accept="jpg,jpeg,png,PNG"
          :before-upload="beforeUpload"
          :http-request="handlePost"
          list-type="picture-card"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl"/>
        </el-dialog>
      </el-form-item>
    </el-form>

    <button @click="publish">发 布</button>
  </div>
</template>

<script>
// 引入nanoid
import { nanoid } from "nanoid";

export default {
  name: "PublishPage",

  data() {
    return {
      publishForm: {
        randomId:"",
        content: "",
        choose: "日常",
      },

      dialogImageUrl: "",
      dialogVisible: false,
    };
  },

  methods: {
    publish() {
    // 发布按钮的点击事件方法
    // 点击发布之后，上传帖子内容：publishForm,其中的randomId和图片是共用的
    console.log(this.publishForm);
    //   console.log("Publish");
    },

    // 上传之前的回调，判断图片的一些信息
    beforeUpload(file) {
      // 限制上传头像的类型
      var isJPG = /^image\/(jpeg|png|jpg)$/.test(file.type)
      // 现在上传头像的大小
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({
          showClose: true,
          message: "上传头像图片只能是 JPG、PNG 格式！",
          offset: 140,
          type: "error",
          duration: 0,
        });
      }
      if (!isLt2M) {
        this.$message({
          showClose: true,
          message: "上传头像图片大小不能超过 2MB！",
          offset: 140,
          type: "warning",
        });
      }
      return isJPG && isLt2M;
    },

    // 上传图片的回调
    handlePost(file) {
        // 在这里调用上传图片的接口，用户每点击一次加号上传图片，就请求一次handlePost
        // 即上传图片是选择之后自动上传
        // 这里上传的时候还需要一个obj对象
        console.log(this.publishForm.randomId)
        console.log(file)
    },
  },

    // 页面挂载时立即生成一个随机id，代表发布的帖子id
  mounted() {
    let randomId=nanoid();
    this.publishForm.randomId=randomId;
    console.log("@mounted",randomId)
  },
};
</script>

<style scoped>
.publishPage {
  /* border: 1px solid red; */
  margin: 24px 0px;
  padding: 24px 72px;
  /* position: relative; */
  /* width: 80%; */
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius) * 1px);
}

.publishPage >>> .el-form-item__label {
  font-size: 18px;
  color: var(--primaryThemeColor);
  font-weight: bold;
}

.publishPage >>> .el-textarea {
  width: 100%;
  /* border: 1px solid red; */
}

.publishPage >>> .el-textarea__inner {
  background-color: var(--primaryBackgoundColor);
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff !important;
  border: none;
  color: var(--primaryFontGreyColor);
  height: 80px;
}

.publishPage >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--primaryThemeColor);
  background: var(--primaryThemeColor);
}

.publishPage >>> .el-radio__inner {
  background-color: var(--primaryBackgoundColor);
  box-shadow: 0px 0px 4px var(--primaryShadowColor);
  transition: all 0.4s;
}

.publishPage >>> .el-radio__input.is-checked + .el-radio__label {
  color: var(--primaryThemeColor);
}

.publishPage >>> .el-radio__inner:hover {
  border-color: var(--primaryThemeColor);
}

.publishPage button {
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
  z-index: 1;
  cursor: pointer;
}

.publishPage button {
  margin-left: 84%;
}

.publishPage button::before {
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
  cursor: pointer;
}

.publishPage button:hover::before {
  display: flex;
  transform: scale(1);
}

.publishPage >>> .el-upload--picture-card {
  width: 144px;
  height: 144px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
  box-shadow: 0px 4px 8px var(--primaryShadowColor);
  border-color: var(--primaryShadowColor);
  background-color: var(--primaryBackgoundColor);
}

.publishPage >>> .el-upload--picture-card:hover {
  border-color: var(--primaryThemeColor);
}

.publishPage >>> .el-form-item__content div {
  display: flex;
  flex-wrap: wrap;
}

.publishPage >>> .el-form-item__content img {
  object-fit: cover;
}
</style>