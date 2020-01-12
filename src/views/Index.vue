<template>
  <div class="index">
    <el-container>
      <el-aside width="150px">Aside</el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px;height:60px;">
          <img src="../assets/u=1442998595,1306184984&fm=26&gp=0.jpg" alt="" />
          <span>我是管理员</span>
          <a href="javascript:;">退出</a>
        </el-header>
        <el-main>Main</el-main>
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
    width: 100%;
    height: 100%;
    .el-aside {
      height: 100%;
      background-color: rgb(27, 19, 19);
      color: #ccc;
    }
  }
}
.el-header {
  background-color: #555;
  color: #ccc;
  line-height: 40px;
  padding: 10px 0;
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      vertical-align: middle;
  }
  span {
      margin: 0 20px 0 10px;
  }
  a{
      margin-right: 40px;
  }
}
</style>
