<template>
  <el-dialog :visible.sync="dialogFormVisible" class="addbusiness" width="600px">
    <div slot="title" class="title">{{mode=="add"? "新增用户":"编辑用户"}}</div>

    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>

      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>

      <el-form-item label="角色" prop="role_id">
        <el-select v-model="form.role_id">
          <el-option value="1" label="麻雀"></el-option>
          <el-option value="2" label="管理员"></el-option>
          <el-option value="3" label="教师"></el-option>
          <el-option value="4" label="学生"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option value="0" label="禁用"></el-option>
          <el-option value="1" label="启用"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click="confim">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addUserlistData, editUserlistData } from "@/api/userlist.js";
export default {
    props:{
        mode:String
    },
   data() {
    return {
      dialogFormVisible: false,
      form: {
        remark: "",
        username: "",
        phone: "",
        email: "",
        status: "",
        role_id: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名昵称" }],
        email: [{ required: true,  validator: (rule, value, callback) => {
              let _reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("输入正确邮箱号");
              }
            }, }],
        phone: [
          {
            required: true,
          
            validator: (rule, value, callback) => {
              let _reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
              if (_reg.test(value)) {
                callback();
              } else {
                callback("输入正确手机号");
              }
            }
          }
        ],
        role_id: [{ required: true, message: "请输入角色" }]
      }
    };
  },
  methods: {
    confim() {
      this.$refs.form.validate(res => {
        if (res) {
            if(this.mode=="add"){
          addUserlistData(this.form).then(() => {
            this.$message.success("新增成功");
              this.$parent.search();
            this.dialogFormVisible = false;
          
          });
            }else{
                editUserlistData(this.form).then(() => {
            this.$message.success("编辑成功");
             this.$parent.search();
            this.dialogFormVisible = false;
           
          });
            }
        }
      });
    }
  },
  watch:{
      "dialogFormVisible"(newval){
          if(newval==false){
            this.$refs.form.resetFields();
          }
      }
  },
};
</script>

<style>
</style>