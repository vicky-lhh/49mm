<template>
   <el-dialog :visible.sync="dialogFormVisible"  class="addbusiness" width="600px" >
   <div slot="title" class="title">{{mode=="add"?"新增企业" :"编辑企业"}}</div>
     <el-form :model="form" label-width="100px" :rules="rules" ref="form">

    <el-form-item label="企业编号" prop="eid">
         <el-input  v-model="form.eid"></el-input>
       </el-form-item>

        <el-form-item label="企业名称" prop="name">
         <el-input  v-model="form.name"></el-input>
       </el-form-item>

      <el-form-item label="企业简称" prop="short_name">
         <el-input  v-model="form.short_name"></el-input>
       </el-form-item>

        <el-form-item label="企业简介" prop="intro">
         <el-input  v-model="form.intro"></el-input>
       </el-form-item>

        <el-form-item label="企业备注" prop="remark">
         <el-input  v-model="form.remark"></el-input>
       </el-form-item>




     </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confim">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {addBusiness ,editBusinessData} from "@/api/business.js"
export default {
    props:{
        mode:{
           type:String,
           
        }
    },
   data() {
       return {
           dialogFormVisible:false,
           form:{
              eid:"",
              name:"",
              short_name:"",
              intro:"",
              remark:""
           },
           rules:{
               eid:[{required:true,message:"请输入编号"}],
              name:[{required:true,message:"请输入企业名称"}],
               short_name:[{required:true,message:"请输入企业简称"}],
              remark:[{required:true,message:"请输入企业备注"}]
         }

       }
   },
   methods: {
       confim(){
         
         this.$refs.form.validate((res)=>{
             if(res){
                 if(this.mode=="add"){
                 addBusiness(this.form).then(()=>{
                     this.$message.success("添加成功")
                     this.$parent.search()
                     this.dialogFormVisible=false
                 })
                 }else{
                     editBusinessData(this.form).then(()=>{
                     this.$message.success("编辑成功")
                     this.$parent.search()
                     this.dialogFormVisible=false
                 })
                 }
             }
         })
       }
   },
   watch: {
      'dialogFormVisible'(newval){
            if(newval==false){
              this.$refs.form.resetFields();
                
            }
    } 
   },
}
</script>

<style lang="less">
.addbusiness{
    .title{
           text-align: center;
           color:#fff;
           background-color: rgb(14, 159,249 );
           height: 53px;
           line-height: 53px;
       }
    .el-dialog__header{
             padding: 0;
         }
         .el-icon-close{
             color:white ;
         }
}
</style>