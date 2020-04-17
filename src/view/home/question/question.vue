<template>
  <div class="question">
     <el-card>
      <el-form label-width="40px" :inline="true" ref="form" :model="form" >
 <el-row>
     <el-col :span="6">
        <el-form-item label="学科" prop="subject">
            <el-select  v-model="form.subject" placeholder="请选择学科" class="setwidth">
               <el-option  v-for="(item, index) in subjectList" :key="index"  :label="item.name" :value="item.id"></el-option>
                
              </el-select>
          </el-form-item>
    </el-col>

    <el-col :span="6">
        <el-form-item label="阶段" prop="step">
            <el-select  v-model="form.step" placeholder="请选择阶段" class="setwidth">
                    <el-option :value="1" label="初级"></el-option>
                <el-option :value="2" label="中级"></el-option>
                <el-option :value="3" label="高级"></el-option>
              </el-select>
          </el-form-item>
    </el-col>

     <el-col :span="6">
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
    </el-col>

   <el-col :span="6">
        <el-form-item label="题型" prop="type">
            <el-select  v-model="form.type" placeholder="请选择学科" class="setwidth">
                 <el-option :value="1" label="单选"></el-option>
                <el-option :value="2" label="多选"></el-option>
                <el-option :value="3" label="简答"></el-option>
              </el-select>
          </el-form-item>
    </el-col>
  </el-row>

   <el-row>
      <el-col :span="6">
        <el-form-item label="难度" prop="diffculty">
             <el-select v-model="form.diffculty" placeholder="请选择难度">
                <el-option :label="val" :value="+key" v-for="(val,key, index) in $store.state.queObj" :key="index"></el-option>
                <!-- <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option> -->
              </el-select>
          </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="作者" prop="username">
             <el-input  v-model="form.username"></el-input>
          </el-form-item>
      </el-col>


          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
       
       <el-col :span="6">
         <el-form-item label="日期" prop="create_date" >
     <el-date-picker v-model="form.create_date"  type="date" placeholder="选择日期" class="setwidth">
    </el-date-picker>
          </el-form-item>
      </el-col>

       
   </el-row>
     
    <el-row>
          <el-col :span="10">
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>

           <el-col :span="10">
            <el-form-item label-width='0'>
                 <el-button class="btn" type="primary" @click="search">搜索</el-button>
              <el-button @click="reset">清除</el-button>
              <el-button type="primary" @click="add">+新增试题</el-button>
            </el-form-item>
          </el-col>
    </el-row>
    </el-form>
     </el-card>
     <br><br>
     <!-- table -->
     <el-card>
           <el-table :data="tableData" style="width: 100%" class="table" :border="true">
         <el-table-column label="序号">
            <template slot-scope="scope">
               {{scope.$index+1}}
            </template>
         </el-table-column>

        <el-table-column label="题目" >
          <template slot-scope="scope">
             <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科阶段" prop="step">
          <template slot-scope="scope">
            {{scope.row.subject_name+":"+{1:"初级",2:"中级",3:"高级"}[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column label="题型" prop="type">
          <template slot-scope="scope">
          {{{1:"单选",2:"多选",3:"简答"}[scope.row.type]}}
          </template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise"></el-table-column>
        <el-table-column label="创建者" prop="enterprise_name"></el-table-column>
        <el-table-column label="状态" prop="status">
           <template slot-scope="scope">
           {{scope.row.status==0? "禁用":"启用"}}
           </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads"></el-table-column>

        <el-table-column label="操作" width="270px" >
          <template slot-scope="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setstatus(scope,scope.row.id)"
              :type="scope.row.status==1? 'info' :'success'"
            >{{scope.row.status==1?'禁用':"启用"}}</el-button>
            <el-button type="danger"   @click="del(scope,scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
           </el-table>


 <div class="progress">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[2, 4, 8, 10]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
     </el-card>

   <addquestion ref="addquestion" :subjectList="subjectList"  :businessList="businessList"></addquestion>



  </div>
 
</template>

<script>
import {getQuestionData} from '@/api/question.js'
import { getSubject} from "@/api/subject.js"
import {getBusiness} from "@/api/business.js"
import addquestion from './addquestion.vue'
export default {
  components:{
    addquestion
  },
  data() {
    return {
      form:{
        subject:"",
        title:"",
        enterprise:"",
        type:"",
        step:"",
        username:"",
        status:"",
        difficulty:"",
        create_date:"",

      },
      pagination:{
        currentPage:1,
        pageSize:5,
        total:20
        },
      tableData:[],
      businessList:[],
      subjectList:[]
    }
  },
  methods: { 
    
    handleSizeChange(size) {
  // 原本是val改一下size
        this.pagination.pageSize=size
        this.search()
      },
      handleCurrentChange(val)  {
        console.log(`当前页: ${val}`);
        this.pagination.currentPage=val
          this.getData()
      },
    setstatus(){},
    edit(){},
    del(scope){
       console.log("scope",scope)
    },
    reset(){
      this.$refs.form.resetFields()
    },
    getData(){
      let params = {
        limit:this.pagination.pageSize,
        page:this.pagination.currentPage,
        ...this.form
      }
      getQuestionData(params).then(res=>{
        console.log( "res列表",res);
        this.tableData = res.data.items
        this.pagination.total = res.data.pagination.total
      })
    },
    search(){
      this.pagination.currentPage=1;
      this.getData()
    },
    add(){
       this.$refs.addquestion.dialogFormVisible=true
    }
  },
  created() {
   this.getData()
  // 获取学科
      getSubject().then((res)=>{
          this.subjectList =res.data.items
      })
      // 获取企业
     getBusiness().then(res=>{
       this.businessList = res.data.items
     })
  },

}
</script>

<style lang="less">
.question{

  .el-date-editor.el-input{
   width: 200px;
 }

.progress{
     text-align: center;
     margin-top: 20px;
   }

}
 
 
</style>