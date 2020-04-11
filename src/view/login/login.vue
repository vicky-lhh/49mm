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
         <el-form-item  prop="code">
        <el-row>
          <el-col :span="16" label="图形码">
            <el-input v-model="form.code" placeholder="请输入图形码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="8">
            <img class="code" :src="codeurl" @click="getcode" alt />
          </el-col>
        </el-row>
      </el-form-item>
        <el-form-item prop="ischeck">
          <el-checkbox v-model="form.ischeck">
            <span>我已阅读条款</span>
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button class="btn" type="primary" @click="loginclick">登陆</el-button>
          <br />
          <el-button class="btn" type="primary" @click="resgiter">注册</el-button>
          
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <img src="@/assets/login_banner_ele.png" alt />
    </div>
    <resgiter ref="resg"></resgiter>5
  </div>
</template>

<script>
import resgiter from './resgiter.vue'
import { tologin } from "@/api/login.js";
import {saveToken,getToken} from "../../util/token.js"
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
       codeurl: process.env.VUE_APP_URL + "/captcha?type=login&t",
     
      rules: {
       phone: [
          {
            required: true,
              //  validator自定义验证规则 value用的多，callback一定要调用
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("输入正确手机号");
              }
            },
            trigger: "change"
          }
        ],
        ischeck:[{ required: true,validator: (rule, value, callback) => {
             
              if (value==true) {
                callback();
              } else {
                callback("请勾选协议");
              }
            },},],
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
  components:{
      resgiter
  },
  methods: {
    loginclick() {
      this.$refs.form.validate(result => {
        if (result) {
         tologin(this.form).then(res=>{
             window.console.log(res);
              this.$message.success("登录的成功");
               saveToken(res.data.token);
              
                  this.$router.push("/home")
               
         })
        } else {
          this.$notify.error({
            title: "错误",
            message: "登陆失败请从新输入"
          });
        }
      });
    },
     getcode(){
        // process.env.VUE_APP_URL + "/captcha?type=sendsms&t="+Date.now()或者随机数 Math.random()*100 
         this.codeurl = this.codeurl +Date.now();
    },

    resgiter(){
       this.$refs.resg.dialogFormVisible= true
    }
  },
  mounted() {
    // alert(process.env.VUE_APP_URL);
  },
  created() {
     if(getToken()){
                  this.$router.push("/home")
               }
  },
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
      height: 42px;
      width: 115px;
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