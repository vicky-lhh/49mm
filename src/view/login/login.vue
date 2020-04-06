<template>
  <div class="login">
    <div class="left">
      <div class="tit">
        <img src="@/assets/xiao1.png" alt />
        <span class="titname">黑马面面</span>
        <span class="titline">|</span>
        <span class="titname2">用户登录</span>
      </div>
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item prop="phone">
          <el-input
            class="user"
            v-model="form.phone"
            placeholder="请输入用户名"
            prefix-icon="el-icon-s-custom"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            class="pass"
            v-model="form.password"
            placeholder="请输入密码"
            :show-password="true"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="code" src="@/assets/11.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form.ischeck">
            <span>我已阅读条款</span>
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="btn" type="primary" @click="loginclick">登陆</el-button>
          <br />
          <el-button class="btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        ischeck: ""
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "change" }],
        password: [
          { required: true, message: "请争取输入密码", trigger: "change" },
          { min: 4, max: 10,message: "密码四到十位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请争取验证码", trigger: "change" },
          { min: 4, max: 4, message: "密码四位数", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    loginclick() {
      this.$refs.form.validate(res => {
        if (res) {
          this.$message.success("我是message的成功");
        } else {
          this.$notify.error({
            title: "错误",
            message: "登陆失败请从新输入"
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .left {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    font-family: SourceHanSansCN;
    font-weight: 400;
    color: rgba(12, 12, 12, 1);
    padding-left: 42px;
    padding-right: 42px;
    img {
      margin: 0 15px;
    }
    .titname {
      font-size: 24px;
    }
    .titline {
      font-size: 24px;
      color: gray;
      margin: 0 15px;
    }
    .titname2 {
      font-size: 22px;
    }
    .tit {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    .pass,
    .user {
      width: 394px;
      height: 45px;
    }
    .code {
      height: 45px;
    }
    .btn {
      width: 100%;
      margin-bottom: 30px;
    }
  }
  .right {
  }
}
</style>

<style >
@import url(~@/style/base.css);
</style>