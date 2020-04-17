<template>
  <el-dialog :visible.sync="dialogFormVisible"  class="addbusiness" width="100%" >
   <div slot="title" class="title">新增题库设置</div>
     <el-form :model="form" label-width="100px" :rules="rules" ref="form">

    <el-form-item label="学科" prop="subject">
         <el-select v-model="form.subject">
          <el-option
            v-for="(item, index) in subjectList"
            :key="index"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
       </el-form-item>

        <el-form-item label="阶段" prop="step">
        <el-select placeholder="请选择阶段" v-model="form.step">
          <el-option :value="1" label="初级"></el-option>
          <el-option :value="2" label="中级"></el-option>
          <el-option :value="3" label="高级"></el-option>
        </el-select>
       </el-form-item>

      <el-form-item label="企业" prop="enterprise">
      <el-select v-model="form.enterprise" placeholder="请选择企业">
               <el-option
                 v-for="(item, index) in businessList"
                 :key="index"
                 :label="item.name"
                 :value="item.id"
               ></el-option>
              </el-select>
       </el-form-item>

        <!-- <el-form-item label="城市" prop="intro">
         <el-input  v-model="form.intro"></el-input>
       </el-form-item>

        <el-form-item label="题型" prop="remark">
         <el-input  v-model="form.remark"></el-input>
       </el-form-item>

      <el-form-item label="难度" prop="remark">
         <el-input  v-model="form.remark"></el-input>
       </el-form-item> -->


     </el-form>
   <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confim">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
    props: ["subjectList", "businessList"],
   data() {
       return {
           dialogFormVisible:false,
           form:{
               subject:"",
               enterprise:"",
               step:"",
           },
           rules:{

           }
       }
   },
   methods: {
       confim(){

       }
   },
}
</script>

<style>

</style>