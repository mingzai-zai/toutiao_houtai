<template>
  <div class="postlsit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-loading">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表格 -->
    <el-table :data="postlist" border style="width: 100%">
      <el-table-column label="" width="50" type="index"> </el-table-column>
      <el-table-column prop="user.nickname" label="姓名" width="100">
      </el-table-column>
      <el-table-column  label="日期" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.user.create_date | timer}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="500"> </el-table-column>
      <el-table-column prop="type" label="类型" width="50"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="info" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAllarticle } from '@/apis/article.js';
export default {
  data() {
    return {
      postlist: []
    };
  },
  async mounted() {
    let res = await getAllarticle();
    console.log(res);
    this.postlist = res.data.data;
  },
  methods: {
    handleEdit(index, data) {
      console.log(index, data);
    }
  },
  filters: {
    timer(time, spe) {
      time = new Date();
      spe = spe || '/';
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let h = time.getHours();
      let mm = time.getMinutes();
      let s = time.getSeconds();
      return `${y}${spe}${m}${spe}${d}  ${h}:${mm}:${s}`
    }
  }
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
