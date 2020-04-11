
    
<template>
   <el-container class="layout">
    <el-header class="header">
      <div class="left">
        <i class="el-icon-s-fold setheight" @click="collapse=!collapse" ></i>
        <img class="marginlr" src="../../assets/xiao1.png" alt />
        <span class="title">黑马面面</span>
      </div>

     <div class="right">
        <img class="avatar" :src="$store.state.userinfo.avatar" alt />
        <span class="name">{{$store.state.userinfo.username}},欢迎你</span>
        <el-button type="primary" @click="exit">退出</el-button>
    </div>


    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
         <el-menu   :router="true"
          :default-active="$route.fullPath" class="el-menu-vertical-demo" 
          :collapse="collapse">
        <el-menu-item index="/home/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>

          <el-menu-item index="/home/userlist">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          
          <el-menu-item index="/home/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>

          <el-menu-item index="/home/businness">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
       

        <el-menu-item index="/home/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {getinfo , exitlogin} from '../../api/home.js'
import {removeToken,getToken} from "@/util/token.js"


export default {
    data() {
        return {
            userinfo:"",
            collapse:false
        }
    },
    created() {
       if(!getToken()){
                  this.$router.push("/")
               }
        // 页面已加载请求axios 
        getinfo().then(res=>{
            this.userinfo = res.data;
            this.userinfo.avatar = process.env.VUE_APP_URL+"/"+this.userinfo.avatar
            this.$store.state.userinfo=this.userinfo
            console.log("用户信息",res)
        })
    },
    methods: {
      exit() {
        this.$confirm('确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         exitlogin().then(()=>{
               //   移除token
            removeToken();
            // 跳至登陆页
            this.$router.push("/");
         })
        })
      }

    },
  
    
}
</script>

 <style lang="less">
   .layout {
  height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .left {
      .setheight {
        font-size: 20px;
      }
      .marginlr {
        margin-left: 10px;
        margin-right: 10px;
      }
      .title {
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      align-items: center;
      .avatar {
        width: 43px;
        height: 43px;
      }
      .name {
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
 
  .aside {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(63, 63, 63, 0.35);
    .el-menu-vertical-demo:not(.el-menu--collapse) {
            width: 180px;
          
        }
  }
} 



</style>