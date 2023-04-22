<!-- 设置页面！ -->
<template>
  <div class="settingPage">
    <!-- 最上方的更换头像部分 -->
    <div class="replaceProfileImg">
      <el-upload
        class="avatar-uploader"
        action=""
        :auto-upload="true"
        accept="jpg,jpeg,png,PNG"
        list-type="picture-card"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :http-request="handlePost"
      >
        <img v-if="profileImgUrl" :src="profileImgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <!-- 基本设置部分 -->
    <div class="basicSetting">
      <!-- 标题部分 -->
      <div class="title">
        <span class="iconfont icon-a-topliontubiaoku_shuju"></span>
        <span>基本设置</span>
      </div>

      <!-- 具体设置部分 -->
      <div class="basicSettingContent">
        <el-form ref="basicSettingForm" :model="basicSettingForm">
          <el-form-item label="昵称">
            <el-input v-model="basicSettingForm.userName"></el-input>
          </el-form-item>

          <el-form-item label="介绍">
            <el-input
              type="textarea"
              v-model="basicSettingForm.intro"
            ></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="basicSettingForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="生日">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="basicSettingForm.birthday"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="地区">
            <el-cascader
              :options="basicSettingForm.options"
              v-model="basicSettingForm.selectedOptions"
              @change="handleLocation"
            >
            </el-cascader>
          </el-form-item>
        </el-form>

        <button @click="saveSetting">保 存</button>
      </div>
    </div>

    <!-- 账号设置部分 -->
    <div class="accountSetting">
      <!-- 标题部分 -->
      <div class="title">
        <span class="iconfont icon-a-topliontubiaoku_denglutouxiang"></span>
        <span>账号设置</span>
      </div>

      <!-- 具体设置部分 -->
      <div class="accountSettingContent">
        <div class="top">
          <el-form ref="accountSettingForm" :model="accountSettingForm">
            <el-form-item label="邮箱">
              <el-input disabled v-model="accountSettingForm.eMail"></el-input>
            </el-form-item>
          </el-form>

          <button>修改密码</button>
        </div>

        <div class="bottom">
          <button>注销账户</button>
        </div>
      </div>
    </div>

    <!-- 主题设置部分 -->
    <div class="themeSetting">
      <!-- 标题部分 -->
      <div class="title">
        <span
          style="font-weight: bold"
          class="iconfont icon-yanseziduan"
        ></span>
        <span>主题设置</span>
      </div>

      <!-- 具体设置部分 -->
      <div class="themeSettingContent">
        <div class="top">
          <span>主题</span>
          <div class="themeBtn">
            <div v-for="theme in themeSettingData.themeList" :key="theme.id">
              <button
                :class="
                  theme.id === themeSettingData.checkedId ? 'isChecked' : ''
                "
                :style="
                  'background-color:' +
                  theme.backgroundColor +
                  ' ;box-shadow: 0px 0px 2px ' +
                  theme.backgroundColor +
                  ';'
                "
                @click="selectTheme(theme.id)"
              ></button>
              <span>{{ theme.explain }}</span>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="selfDefined">
            <span>自定义</span>
            <el-color-picker
              show-alpha
              v-model="themeSettingData.color1"
              size="small"
            ></el-color-picker>
            <el-color-picker
              show-alpha
              v-model="themeSettingData.color2"
              size="small"
            ></el-color-picker>
          </div>

          <div class="confirm">
            <button @click="confirm">确定</button>
          </div>
        </div>
        <!-- <button @click="changeTheme">修改样式</button> -->
      </div>
    </div>
  </div>
</template>

<script>
// 导入中国的省市数据
import { provinceAndCityData, CodeToText } from "element-china-area-data";

export default {
  name: "SettingPage",

  data() {
    return {
      // 头像的地址
      profileImgUrl:"",

      // 基本设置的数据，初始数据应该是从后端读取的当前账户的信息
      basicSettingForm: {
        userName: "zorient",
        gender: "男",
        intro: "这是一段介绍这是一段介绍",
        birthday: "2000/1/1",
        options: provinceAndCityData,
        // 选择的地区，数组内容是地址码
        selectedOptions: [],
      },

      accountSettingForm: {
        eMail: "12345@qq.com",
      },

      themeSettingData: {
        themeList: [
          { id: "1", backgroundColor: "#FF2D55", explain: "默认" },
          { id: "2", backgroundColor: "#4facfe", explain: "Ocean" },
          { id: "3", backgroundColor: "#a1c4fd", explain: "Violent" },
          { id: "4", backgroundColor: "#43e97b", explain: "Cyan" },
        ],

        // 标记哪个主题被选中，这个也需要localstorage存储
        checkedId: "1",
        color1: "#F082F0",
        color2: "#F082F0",
      },
    };
  },

  methods: {
    // 上传头像前的回调函数
    beforeAvatarUpload(file) {
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

    // 头像上传
    handlePost(file){
      console.log(file,file.url)
      // 上传成功之后把返回的头像网址赋值给profileImgUrl！

      this.profileImgUrl=file.url;
    },

    // 上传头像成功之后的回调函数
    handleAvatarSuccess(res, file) {
      this.profileImgUrl = URL.createObjectURL(file.raw);
    },

    // 提交地区信息
    handleLocation() {
      var location = "";
      for (let i = 0; i < this.basicSettingForm.selectedOptions.length; i++) {
        location += CodeToText[this.basicSettingForm.selectedOptions[i]];
      }
      //打印区域码所对应的属性值即中文地址
      console.log(location);
      // console.log(this.selectedOptions);
    },

    // 保存基本设置的修改
    saveSetting() {
      console.log("saveSetting");
    },

    // 选择主题
    selectTheme(id) {
      switch (id) {
        case "1":
          // console.log("1");
          document.documentElement.style.setProperty(
            "--primaryThemeLiner",
            "linear-gradient(120deg, #f40243 0%, #FF2D55 35%,#ff2d81 65%, #e6077e 100%)"
          );
          document.documentElement.style.setProperty(
            "--primaryThemeColor",
            "#FF2D55"
          );
          break;
        case "2":
          // console.log("3");
          document.documentElement.style.setProperty(
            "--primaryThemeLiner",
            "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
          );
          document.documentElement.style.setProperty(
            "--primaryThemeColor",
            "#4facfe"
          );
          break;
        case "3":
          // console.log("4");
          // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
          document.documentElement.style.setProperty(
            "--primaryThemeLiner",
            "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)"
          );
          document.documentElement.style.setProperty(
            "--primaryThemeColor",
            "#a1c4fd"
          );
          break;
        case "4":
          // console.log("4");
          // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
          document.documentElement.style.setProperty(
            "--primaryThemeLiner",
            "linear-gradient(120deg, #43e97b 0%, #38f9d7 100%)"
          );
          document.documentElement.style.setProperty(
            "--primaryThemeColor",
            "#43e97b"
          );
          break;
        default:
          console.log("Select Theme Error!");
      }

      this.themeSettingData.checkedId = id;
    },

    // 确认选择的自定义主题
    confirm() {
      // this.color1;
      // const color2=this.color2;
      const color1 = this.themeSettingData.color1;
      const color2 = this.themeSettingData.color2;

      this.themeSettingData.checkedId = -1;

      document.documentElement.style.setProperty(
        "--primaryThemeLiner",
        "linear-gradient(120deg, " + color1 + " 0%, " + color2 + " 100%)"
      );
      document.documentElement.style.setProperty("--primaryThemeColor", color1);
    },

    // 测试修改全局样式
    // changeTheme(){
    //   document.documentElement.style.setProperty("--primaryThemeLiner","linear-gradient(to right, #4facfe 0%, #00f2fe 100%)")
    // }
  },
};
</script>

<style scoped>
.settingPage {
  /* border: 1px solid brown; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.replaceProfileImg {
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  margin: 24px 0px;
}

.replaceProfileImg >>> .avatar-uploader .el-upload {
  width: 144px;
  background-color: var(--primaryBackgoundColor);
  height: 144px;
  border-radius: 100%;
  border: 2px dashed var(--primaryFontGreyColor);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s;
  box-shadow: 0px 4px 8px var(--primaryShadowColor);
}

.replaceProfileImg >>> .avatar-uploader .el-upload:hover {
  border-color: var(--primaryThemeColor);
}

.replaceProfileImg >>> .avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}

.replaceProfileImg >>> .avatar-uploader-icon {
  font-size: 24px;
  color: var(--primaryFontGreyColor);
}

.replaceProfileImg >>> .el-upload-list--picture-card{
  display: none;
}

.basicSetting,
.accountSetting,
.themeSetting {
  width: 80%;
}

.basicSettingContent,
.accountSettingContent,
.themeSettingContent {
  /* border: 1px solid red; */
  margin: 24px 0px;
  padding: 24px 72px;
  /* position: relative; */
  /* width: 80%; */
}

.basicSettingContent,
.accountSettingContent,
.themeSettingContent {
  box-shadow: 0px 0px 8px var(--primaryShadowColor);
  border-radius: calc(var(--borderRadius) * 1px);
}

.basicSettingContent >>> .el-input,
.basicSettingContent >>> .el-textarea,
.basicSettingContent >>> .el-cascader,
.accountSettingContent >>> .el-input {
  width: 60%;
  /* border: 1px solid red; */
}

.basicSettingContent >>> .el-input__inner,
.basicSettingContent >>> .el-textarea__inner,
.accountSettingContent >>> .el-input__inner {
  background-color: var(--primaryBackgoundColor);
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff !important;
  border: none;
  color: var(--primaryFontGreyColor);
}
.basicSettingContent >>> .el-input__inner::placeholder,
.basicSettingContent >>> .el-input__icon {
  color: var(--primaryFontGreyColor);
}

.basicSettingContent >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: var(--primaryThemeColor);
  background: var(--primaryThemeColor);
}

.basicSettingContent >>> .el-radio__inner {
  background-color: var(--primaryBackgoundColor);
  box-shadow: 0px 0px 4px var(--primaryShadowColor);
  transition: all 0.4s;
}

.basicSettingContent >>> .el-radio__input.is-checked + .el-radio__label {
  color: var(--primaryThemeColor);
}

.basicSettingContent >>> .el-radio__inner:hover {
  border-color: var(--primaryThemeColor);
}

.basicSettingContent button,
.themeSettingContent .bottom .confirm button {
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

.basicSettingContent button {
  margin-left: 84%;
}

.basicSettingContent button::before,
.accountSettingContent .top button::before,
.themeSettingContent .bottom .confirm button::before {
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

.basicSettingContent button:hover::before,
.accountSettingContent button:hover::before,
.themeSettingContent .bottom .confirm button:hover::before {
  display: flex;
  transform: scale(1);
}

.accountSettingContent .top {
  width: 100%;
  border-bottom: 1px solid var(--primaryShadowColor);
  /* border: 1px solid red; */
}

.accountSettingContent button {
  min-width: 88px;
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
  /* right: 0px; */
  margin-left: 84%;
  cursor: pointer;
  margin-bottom: 16px;
}
.accountSettingContent .bottom button {
  background: none;
  margin-top: 16px;
  margin-bottom: 0px;
  color: var(--primaryThemeColor);
  border: 2px dashed var(--primaryThemeColor);
  margin-left: 50%;
  transform: translateX(-50%);
}

/* .themeSetting {
  color: var();
} */

.themeSettingContent {
  /* border: 1px solid red; */
  color: #606266;
}

.themeSettingContent .top {
  /* border: 1px solid red; */
  /* line-height: 40px; */
  /* height: 40px; */
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
}

.themeSettingContent .top button {
  /* border: 1px solid red; */
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(var(--borderRadius) * 1px);
  border: none;
  margin: 0px 24px;
  cursor: pointer;
}

.themeSettingContent .top div button.isChecked::before {
  content: "✔";
  color: var(--primaryThemeWhite);
}

.themeSettingContent .top .themeBtn {
  display: flex;
}

.themeSettingContent .top .themeBtn div {
  display: flex;
  flex-direction: column;
}

.themeSettingContent .top .themeBtn span {
  text-align: center;
  font-size: 14px;
  padding: 8px 0px;
}

.themeSettingContent .bottom {
  /* border: 1px solid blue; */
  /* line-height: 40px;
  height: 40px; */
  /* display: flex; */
  /* align-items: center; */
  border-top: 1px solid var(--primaryShadowColor);
  margin-top: 16px;
  padding-top: 16px;
}

.themeSettingContent >>> .el-color-picker--small {
  margin: 0px 16px;
}

.themeSettingContent >>> .el-color-picker__color,
.themeSettingContent >>> .el-color-picker__color-inner {
  border: none;
  border-radius: calc(var(--borderRadius) * 1px);
}

.themeSettingContent .bottom .selfDefined {
  /* border: 1px solid red; */
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.themeSettingContent .bottom .confirm {
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
}

.themeSettingContent .bottom .confirm button {
  margin-top: 16px;
}

.title span {
  /* border: 1px solid red; */
  font-size: 18px;
  line-height: 24px;
  height: 24px;
  color: var(--primaryThemeColor);
  padding: 0px 4px;
  font-weight: bold;
}
</style>