<template>
  <div class="business">
    <el-card>
       <el-form label-width="80px" :inline="true" ref="form" :model="form">

         <el-form-item label="企业编号" prop="eid">
          <el-input class="setwidth" v-model="form.eid"></el-input>
        </el-form-item>
         
           <el-form-item label="企业名称" prop="name">
          <el-input class="setwidth" v-model="form.name"></el-input>
        </el-form-item>

          <el-form-item label="创建者" prop="username">
          <el-input class="setwidth" v-model="form.username"></el-input>
        </el-form-item>

         <el-form-item label="状态" prop="status">
          <el-select placeholder="请选择状态" class="setwidth" v-model="form.status">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
<br><br>
    <el-card>
     <el-table :data="tableData" style="width: 100%" class="table">
         <el-table-column label="序号" width="180">
           <template slot-scope="scope">{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1}}</template>
         </el-table-column>

       <el-table-column label="企业编号" prop="eid"></el-table-column>
       <el-table-column label="企业名称" prop="name"></el-table-column>
       <el-table-column label="创建者"   prop="username"></el-table-column>
       <el-table-column label="创建日期 " prop="create_time"></el-table-column>


        <el-table-column label="状态" width="100px"  >
          <template slot-scope="scope">
          {{scope.row.status==1?'启用':'禁用'}}
         </template>
        </el-table-column>
      

        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" >编辑</el-button>
            <el-button @click="setstatus(scope,scope.row.id)"
             :type="scope.row.status==1? 'info' :'success'">{{scope.row.status==1?'禁用':"启用"}}</el-button>
            <el-button  type="danger" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
     </el-table>

        <div class="progress">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 2, 300, 4]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
    <adduserlist ref="adduserlist" :mode="mode"></adduserlist>
  </div>
</template>

<script>
import {getBusiness ,setBusinessStatus,delBusinessData} from "@/api/business.js"
import adduserlist from './adduserlist.vue'
export default {
  data() {
    return {
     
      pagination: {
        pageSize: 1,//10条一页
        currentPage: 1,//当前页数
        total: 40  //总页数
      },
      form:{
        eid:"",
        name:"",
        username:"",
        status:""
      },
      mode:"add",
      tableData:[],
    }
  },
   components:{
     adduserlist
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
      setstatus(scope,id){
          console.log("scope",scope);
          setBusinessStatus({id}).then(()=>{
            { 
              this.$message.success("状态设置成功！");
              this.search()
            }
          })
      },
    add(){ 
      this.mode="add"
       this.$refs.adduserlist.form={
              eid:"",
              name:"",
              short_name:"",
              intro:"",
              remark:""
       }
       this.$refs.adduserlist.dialogFormVisible=true
    },
    edit(row){
       this.mode="edit";
       this.$refs.adduserlist.form=JSON.parse(JSON.stringify(row))
          this.$refs.adduserlist.dialogFormVisible=true
    },
    del(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delBusinessData({id}).then(()=>{
            this.$message.success("删除成功");
            this.search()
          })
         
        })
    },
    search(){
     this.pagination.currentPage=1,
     this.getData()
    },
    reset(){
      this.$refs.form.resetFields();
      // 清空表单两种方式
      // this.form={
      //     eid:"",
      //   name:"",
      //   username:"",
      //   status:""
      // }
      this.search();
    },
    getData(){
      let params={
        page:this.pagination.currentPage,
        limit:this.pagination.pageSize,
        ...this.form
      }
      getBusiness(params).then((result)=>{
        console.log("企业列表",result);
        if(result){
          
          this.tableData=result.data.items
          this.pagination.total=result.data.pagination.total
        }
      })
    }
  },
  created() {
      this.getData()
  },
}
</script>

<style lang="less">
  .business{
     .setwidth{
     width: 100px;
   }
   .red{
     color: red;
   }
   
   .progress{
     text-align: center;
     margin-top: 20px;
   }
  }
</style>