<template>
  <div class="subject">
    <el-card>
      <el-form label-width="80px" :inline="true" ref="form" :model="form">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="setwidth" v-model="form.rid"></el-input>
        </el-form-item>

        <el-form-item label="学科名称" prop="name">
          <el-input class="setwidth" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="创建者" prop="username">
          <el-input class="setwidth" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select placeholder="请选择状态" class="setwidth" v-model="form.status">
            <el-option value="1" label="启用"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="add">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column label="编号" width="180">
          <template slot-scope="scope">{{( pagination.currentPage-1)* pagination.pageSize+scope.$index+1}}</template>
        </el-table-column>

        <el-table-column label="学科编号 " prop="rid"></el-table-column>
        <el-table-column label="学科名称 " prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者 " prop="username"></el-table-column>
        <el-table-column label="创建日期 " prop="create_time"></el-table-column>

        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope,scope.row.id)">{{scope.row.status==1?'禁用':"启用"}}</el-button>
            <el-button  @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="progress">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.currentPage"
          :page-sizes="[1, 2, 30, 40]"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
     <addsubject ref="addsubject" :mode="mode"></addsubject>
  </div>
</template>

<script>
import { getSubject, setSubjectStatus,delSubjectData } from "../../../api/subject.js";
import addsubject from './addsubject.vue'
export default {
  data() {
    return {
      mode:"add",
      form: {
        rid: "",
        name: "",
        username: "",
        status: ""
      },
      tableData: [],
       pagination: {
        pageSize: 1,//10条一页
        currentPage: 1,//当前页数
        total: 40  //总页数
      },
    };
  },
  components:{
    addsubject
  },
  methods: {
    setStatus(scope,id) {
      console.log("scope",scope);
    setSubjectStatus({id}).then(()=>{
         this.$message.success("状态设置成功！");
         this.search()
    })
    },
       handleSizeChange(size) {
  
        this.pagination.pageSize=size
        this.pagination.currentPage=1
          this.getData()
      },
      handleCurrentChange(val)  {
        console.log(`当前页: ${val}`);
        this.pagination.currentPage=val
          this.getData()
      },
      search(){
          this.pagination.currentPage=1
          this.getData()
      },
      reset(){
            this.$refs.form.resetFields()
      //       this.form = {
      //   rid: "", //学科编号
      //   name: "", //学科名称
      //   username: "", //创建者
      //   status: "" //状态
      // };
                this.search();
      },
      add(){
        this.mode="add",
        this.$refs.addsubject.form={
                rid:"",
                name:"",
                short_name:"",
                intro:"",
                remark:""
            }
         this.$refs.addsubject.dialogFormVisible=true
      },
      edit(row){
           this.mode="edit"
           this.$refs.addsubject.form=JSON.parse(JSON.stringify(row))
            this.$refs.addsubject.dialogFormVisible=true
      },
      del(id){
        
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delSubjectData({id}).then(()=>{
            this.$message.success("删除成功");
            this.search()
          })
         
        })
      
      },
      getData(){
      let params = {
      page:this.pagination.currentPage,
      limit:this.pagination.pageSize,
      ...this.form
    }
    getSubject(params).then(res => {
      this.tableData = res.data.items;
      this.pagination.total = res.data.pagination.total
      window.console.log(res);
    });
      }
  },
  created() {
   this.getData()
  }
};
</script>

<style lang="less">
.subject{
  .setwidth {
  width: 100px;
}
.progress{
  text-align: center;
  margin-top: 30px;
}
.table{
  margin-top: 30px;
}
}
</style>