<template>
  <el-dialog :visible.sync="dialogFormVisible"  class="addsubject" width="600px" >
          <div slot="title" class="title">{{mode=='add'? "新增学科" : "编辑学科"}}</div>
    <el-form :model="form" label-width="100px" :rules="rules" ref="form">
       <el-form-item label="学科编号" prop="rid">
         <el-input  v-model="form.rid"></el-input>
       </el-form-item>

        <el-form-item label="学科名称" prop="name">
         <el-input  v-model="form.name"></el-input>
       </el-form-item>

      <el-form-item label="学科简称" prop="short">
         <el-input  v-model="form.short"></el-input>
       </el-form-item>

        <el-form-item label="学科简介" prop="intro">
         <el-input  v-model="form.intro"></el-input>
       </el-form-item>

        <el-form-item label="学科备注" prop="remark">
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
import { addSubjectData,editSubjectData} from "../../../api/subject.js"
export default {
    props:{
       mode:{
           type:String,
           default:'add'
       }
    },
    data() {
        return {
            dialogFormVisible:false,
            form:{
                rid:"",
                name:"",
                short_name:"",
                intro:"",
                remark:""
            },
            rules:{
               rid:[{ required: true, message: "请输入学科编号", trigger: "blur" }],
               name:[{ required: true, message: "请输入学科名字", trigger: "blur" }],

            }
        }
    }, 
    watch: {
    'dialogFormVisible'(newval){
            if(newval==false){
              this.$refs.form.resetFields();
                
            }
    }
  },
    methods: {
        confim(){
          this.$refs.form.validate((result)=>{
            console.log(result);
            if(result){
                if(this.mode=="add"){
                addSubjectData(this.form).then(()=>{
               this.$message.success("新增成功")
               this.dialogFormVisible=false;
               this.$parent.search()
            })
                }else{
                    editSubjectData(this.form).then(()=>{
                         this.$message.success("编辑成功")
                      this.dialogFormVisible=false;
                     this.$parent.search()
                    })
                }
           
                
            }
          }) 
        }
    },

}
</script>

<style lang="less">
  .addsubject{
    
       .title{
           text-align: center;
           color:#fff;
           background-color: rgb(14, 159,249 );
           height: 53px;
           line-height: 53px;
       }
       .el-icon-close {
        color: white;
         }
         .footer{
             text-align: center;
         }
         .el-dialog__header{
             padding: 0;
         }
  }
</style>