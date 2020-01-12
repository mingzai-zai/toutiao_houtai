<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
          <img src="../assets/u=1442998595,1306184984&fm=26&gp=0.jpg" alt="" class="pic">
        <!-- default-active默认展开一定要设置的是二级菜单 -->
        <!-- unique-opened设置只能有一个一级菜单展开boolean就是动态的标识符 -->
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="1-1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <!-- router是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
            <el-menu-item index="/index/postlist">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>文章列表</span>
              </template>
            </el-menu-item>
            <el-menu-item index="2-2">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>发布文章</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>哈栏目管理</span>
            </template>
            <el-menu-item index="3-1">
              <template slot="title">
                <i class="el-icon-s-operation"></i>
                <span>栏目列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="height:60px;">
          <span class="el-icon-s-unfold"></span>
          <h3>传智播客</h3>
          <div class="person">
            <span>欢迎啊： 肥仔</span>
            <span>退出</span>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
    // background-color:#545c64;
    .el-aside {
      height: 100%;
      background-color: #545c64;
    }
  }
}
.el-header {
  display: flex;
  background-color: #545c64;
  padding: 0;
  color: #fff;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
  .el-icon-s-unfold {
    font-size: 60px;
  }
  h3 {
    font-size: 35px;
  }
  span {
    margin-right: 20px;
  }
}
.el-menu{
    border: 0;
}
.pic{
    width: 172px;
}
</style>
