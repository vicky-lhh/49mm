<template>
  <el-dialog :visible.sync="dialogFormVisible" :show-close="false" class="resgiter">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="baseurl+'/uploads'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
 
      <el-form-item label="昵称" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item label="图形码" prop="code">
        <el-row>
          <el-col :span="16" label="图形码">
            <el-input v-model="form.code" placeholder="请输入图形码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="code" :src="codeurl" @click="getcode" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item   label="验证码" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" placeholder="请输入验证码" prefix-icon="el-icon-key"></el-input>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-button @click="getrecode" :disabled="totaltime!=60">获取验证码<span v-if="totaltime!=60" >{{totaltime}}</span></el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confim">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getphonecode, register }  from '../../api/register.js'
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        username: "",
        avatar: "",
        email: "",
        phone: "",
        password: "",
        code: "",
        rcode: ""
      },
      totaltime:60,
      codeurl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      baseurl: process.env.VUE_APP_URL,
      imageUrl: "",
      rules: {
        avatar: [{ required: true, message: "上传头像", trigger: "change" }],
        username: [
          { required: true, message: "请输入昵称", trigger: "change" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "change" }
        ],
        email: [
          {
            required: true,
            validator: (rule, value, callback) => {
              let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (reg.test(value)) {
                callback();
              } else {
                callback("输入正确邮箱");
              }
            },
            trigger: "change"
          }
        ],
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
        password: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 6, max: 10, message: "长度在6到 10个字符", trigger: "blur" }
        ],
          code: [{ required: true, message: "图形码", trigger: "blur" }],
          rcode: [{ required: true, message: "验证码"}]
      }
    };
  },
  watch: {
    'dialogFormVisible'(newval){
            if(newval==false){
              this.$refs.form.resetFields();
                  this.imageUrl = "";
            }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.imageUrl = this.baseurl+"/"+res.data.file_path
      console.log(res);
      
      this.form.avatar = res.data.file_path;
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    confim() {
      this.$refs.form.validate(result => {
        if(result){register(this.form).then((res)=>{
            window.console.log("注册返回信息", res);
        
          this.$message.success("注册成功");
          this.dialogFormVisible = false;
        
        })}
       
      });
    },
    // 获取图形码
    getcode(){
        // process.env.VUE_APP_URL + "/captcha?type=sendsms&t="+Date.now()或者随机数 Math.random()*100 
         this.codeurl = this.codeurl +Date.now();
    },
    // 获取验证码 
    getrecode() {
      let pass = true;
      this.$refs.form.validateField(["code", "phone"], err => {
        if (err != "") {
          pass = false;
        }
      });
      if (pass === false) {
        return;
      } else {
        //  调用接口验证码
        // axios({
        //   url: process.en` v.VUE_APP_URL + "/sendsms",
        //   method: "post",
        //   data: { code: this.form.code, phone: this.form.phone },
        //      withCredentials: true //跨域带cookie
        // })
        this.totaltime--
   let time = setInterval(()=>{
      this.totaltime--;
      if(this.totaltime<=0){
        clearInterval(time)
        this.totaltime = 60
      }
   },1000)
 
  getphonecode({ code: this.form.code, phone: this.form.phone }).then(res => {
          //成功回调
           this.$message.success(res.data.captcha + "")
          console.log(res);
        });
      }
    }
  }
};
</script>

<style lang="less">
.resgiter {
  .title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    background-color: skyblue;
    text-align: center;
  }
  .el-dialog__header {
    padding: 0;
  }
  .avatar-uploader {
    margin: auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .dialog-footer button{
          text-align: center;
  }
 
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .code{
     height: 42px;
  
  }
}
</style>
<style>
  .el-dialog__footer{
    text-align: center;
  }
</style>