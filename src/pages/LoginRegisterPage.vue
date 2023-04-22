<template>
  <div class="LoginRegisterPage">
    <div class="container">
      <!-- 左侧注册盒子 -->
      <div class="registerBox">
        <h1>SIGN UP</h1>
        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerForm"
        >
          <el-form-item prop="email">
            <el-input
              placeholder="邮箱"
              type="email"
              v-model="registerForm.email"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              show-password
              v-model="registerForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item prop="checkPassword">
            <el-input
              placeholder="确认密码"
              show-password
              v-model="registerForm.checkPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('registerForm')">注 册</el-button>
            <el-button @click="resetForm('registerForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 右侧登录盒子 -->
      <div class="loginBox">
        <h1>SIGN IN</h1>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="account">
            <el-input
              placeholder="账号"
              type="email"
              v-model="loginForm.account"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              show-password
              autocomplete="off"
              v-model="loginForm.password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="submitForm('loginForm')">登 录</el-button>
            <el-button @click="resetForm('loginForm')">重 置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 移动遮罩 -->
      <div :class="isLogin ? 'cover loginAni' : 'cover registerAni'">
        <!-- 登陆时的提示信息 -->
        <div v-show="isLogin" class="loginInfo">
          <h2>Hello,Friend!</h2>
          <p>Enter your personal details and start juorney with us</p>
          <button @click="signUp">SIGN UP</button>
        </div>

        <!-- 注册时的提示信息 -->
        <div v-show="!isLogin" class="registerInfo">
          <h2>Welcome Back!</h2>
          <p>To connect with us please login with your personal info</p>
          <button @click="signIn">SIGN IN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 注册表单的密码验证
    var validatePassRegister = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPassword !== "") {
          this.$refs.registerForm.validateField("checkPassword");
        }
        callback();
      }
    };

    // 注册表单的确认密码验证
    var validatePassRegister2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    // 登录表单的账号验证
    var validateAccountLogin = (rule, value, callback) => {
      // 数据测试
      if (value === "") {
        callback(new Error("请输入账户/邮箱"));
      } else if (value !== "zorient") {
        callback(new Error("该账户不存在"));
      } else {
        callback();
      }
    };

    var validatePassLogin = (rule, value, callback) => {
      // 数据测试
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      // 显示哪个表单(默认为登录)
      isLogin: true,

      // 注册表单数据
      registerForm: {
        email: "",
        password: "",
        checkPassword: "",
      },

      // 登录表单数据
      loginForm: {
        account: "",
        password: "",
      },

      // 注册表单规则
      registerRules: {
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          { validator: validatePassRegister, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6-10个字符",
            trigger: "blur",
          },
        ],
        checkPassword: [{ validator: validatePassRegister2, trigger: "blur" }],
      },

      // 登录表单规则
      loginRules: {
        account: [{ validator: validateAccountLogin, trigger: "blur" }],

        password: [
          { validator: validatePassLogin, trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度应为6-10个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!" + formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 切换到登录
    signIn() {
      // console.log("signIn", this.isLogin);
      if (this.isLogin !== true) {
        this.isLogin = true;
      }

      // console.log("signIn", this.isLogin);
    },
    // 切换到注册
    signUp() {
      // console.log("signUp", this.isLogin);
      if (this.isLogin === true) {
        this.isLogin = false;
      }

      // console.log("signUp", this.isLogin);
    },
  },
};
</script>

<style scoped>
.LoginRegisterPage {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: aquamarine; */
}

.container {
  /* border:1px solid blue; */
  display: flex;
  width: 90%;
  position: relative;
  box-shadow: 4px 4px 12px #cbced1, -4px -4px 12px #fff;
  border-radius: calc(var(--borderRadius) * 2px);
}

.container h1 {
  font-size: 32px;
  text-align: center;
  color: var(--primaryThemeColor);
  font-weight: bold;
  margin: 36px 0px;
}

.container >>> .el-form-item {
  margin-bottom: 20px;
}

.container >>> .el-input {
  display: flex;
  justify-content: center;
  position: relative;
  line-height: 100%;
}

.container >>> .el-input__suffix {
  right: 24%;
  font-size: 20px;
}

.container >>> .el-input__inner {
  width: 60%;
  border: none;
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: inset 4px 4px 4px #cbced1, inset -4px -4px 4px #fff !important;
  transition: all 0.8s;
}

.container >>> .el-input__inner:focus{
  border-radius: 32px;
}

.container >>> .el-form-item__content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.container >>> .el-form-item__error {
  color: var(--primaryThemeColor);
  left: 22%;
}

.container >>> .el-button {
  border-radius: calc(var(--borderRadius) * 1px);
  box-shadow: 2px 2px 6px var(--primaryShadowColor);
  border: none;
  font-size: 16px;
  margin: 0px;
  width: 40%;
  padding: 10px;
  text-align: center;
  margin-bottom: 12px;
  font-weight: bold;
  color: var(--primaryThemeColor);
  position: relative;
}

.container >>> .el-button:before {
  content: "";
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0) 50%,
    rgba(255, 255, 255, 0.4) 50%
  );
  background-size: 210% 100%;
  border-radius: calc(var(--borderRadius) * 1px);
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  transition: all 0.4s;
  background-position: right bottom;
}

.container >>> .el-button:first-child {
  background-color: var(--primaryThemeColor);
  color: var(--primaryThemeWhite);
}

.container >>> .el-button:hover::before {
  background-position: left bottom;
}

.registerBox,
.loginBox {
  /* border:1px solid brown; */
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cover {
  /* background-color: aqua; */
  background-image: var(--primaryThemeLiner);
  width: 50%;
  border-radius: calc(var(--borderRadius) * 2px) 0px 0px
    calc(var(--borderRadius) * 2px);
  box-shadow: 0px 0px 8px var(--primaryThemeColor);
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  transition: all 0.4s;
  color: var(--primaryThemeWhite);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  text-align: center;
}

.cover h2{
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  margin: 32% 0px 8% 0px;
}

.cover p{
  font-size: 14px;
  width: 80%;
  text-align: center;
  /* border: 1px solid brown; */
}

.cover button{
  width: 56%;
  height: 40px;
  color: var(--primaryThemeWhite);
  font-weight: bold;
  font-size: 20px;
  border-radius: calc(var(--borderRadius) * 1px);
  border: 2px solid var(--primaryThemeWhite);
  background-color: transparent;
  margin-top: 20px;
  transition: all 0.4s;
}

.cover button:hover{
  background-color: var(--primaryThemeWhite);
  color: var(--primaryThemeColor);
  border-radius: calc(var(--borderRadius) * 3px);
}

.loginInfo,
.registerInfo{
  /* border: 1px solid brown; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
}

.loginAni {
  transform: translateX(0%);
  border-radius: calc(var(--borderRadius) * 2px) 0px 0px
    calc(var(--borderRadius) * 2px);
}

.registerAni {
  transform: translateX(100%);
  border-radius: 0px calc(var(--borderRadius) * 2px)
    calc(var(--borderRadius) * 2px) 0px;
}
</style>
