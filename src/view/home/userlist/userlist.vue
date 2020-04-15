<template>
  <div class="userlist">
    <el-card>
      <el-form label-width="90px" :inline="true" ref="form" :model="form">
        <el-form-item label="用户名称" prop="username">
          <el-input class="setwidth" v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="用户邮箱" prop="email">
          <el-input class="setwidth" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-input class="setwidth" v-model="form.role_id"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态" class="setwidth">
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
    <br />
    <br />
    <el-card>
      <el-table :data="tableData" style="width: 100%" class="table">
        <el-table-column label="序号" width="180">
          <template
            slot-scope="scope"
          >{{(pagination.currentPage-1)*pagination.pageSize+scope.$index+1 }}</template>
        </el-table-column>

        <el-table-column label="用户名" prop="username"></el-table-column>
        <el-table-column label="电话" prop="phone"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="角色" prop="role_id"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>

        <el-table-column label="状态" width="100px">
          <template slot-scope="scope">{{scope.row.status==1?'启用':'禁用'}}</template>
        </el-table-column>

        <el-table-column label="操作" width="270px">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button
              @click="setstatus(scope,scope.row.id)"
              :type="scope.row.status==1? 'info' :'success'"
            >{{scope.row.status==1?'禁用':"启用"}}</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
    <adduserlist ref="adduserlist" :mode="fmode"></adduserlist>
  </div>
</template>

<script>
import adduserlist from "./adduserlist.vue";
import {
  getUserlist,
  setUserlistStatus,
  delUserlistData
} from "@/api/userlist.js";
export default {
  components: {
    adduserlist
  },
  data() {
    return {
      form: {
        username: "",
        email: "",
        role_id: "",
        status: ""
      },
      pagination: {
        pageSize: 2,
        currentPage: 1,
        total: 20
      },
      tableData: [],
      fmode: "add"
    };
  },
  methods: {
    search() {
      this.pagination.currentPage = 1;
      this.getData();
    },
    reset() {
      this.$refs.form.resetFields();
    },
    add() {
      this.fmode = "add";
      this.$refs.adduserlist.form = {
        remark: "",
        username: "",
        phone: "",
        email: "",
        status: "",
        role_id: ""
      };
      this.$refs.adduserlist.dialogFormVisible = true;
    },
    setstatus(scope, id) {
      console.log("scope", scope);
      setUserlistStatus({ id }).then(() => {
        this.$message.success("设置成功");
        this.search();
      });
    },
    edit(row) {
      this.fmode = "edit";
      this.$refs.adduserlist.form = JSON.parse(JSON.stringify(row));
      this.$refs.adduserlist.dialogFormVisible = true;
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delUserlistData({ id }).then(() => {
          this.$message.success("删除成功");
          this.search();
        });
      });
    },
    handleSizeChange(size) {
      // 原本是val改一下size
      this.pagination.pageSize = size;
      this.search();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.getData();
    },
    getData() {
      let parmas = {
        page: this.pagination.currentPage,
        limit: this.pagination.pageSize,
        ...this.form
      };
      getUserlist(parmas).then(res => {
        this.tableData = res.data.items;
        this.pagination.total = res.data.pagination.total;
      });
    }
  },
  created() {
    //  网页标题修改
    // document.title=this.$route.meta.title
    this.getData();
  }
};
</script>

<style lang="less">
.userlist {
  .setwidth {
    width: 90px;
  }
  .progress {
    text-align: center;
  }
}
</style>