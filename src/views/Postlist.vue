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
          <i class="el-icon -time"></i>
          <span style="margin-left: 10px">{{ scope.row.user.create_date | timer}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="480"></el-table-column>
      <el-table-column  label="类型" width="80">
        <template slot-scope="scope">
          {{ scope.row.type===1?'文章':'视频'}}
        </template>
        </el-table-column>
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
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getAllarticle } from '@/apis/article.js';
export default {
  data() {
    return {
      postlist: [],
      pageIndex: 1,
      pageSize: 2,
      total: null,
      time: null
    };
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await getAllarticle({ pageSize: this.pageSize, pageIndex: this.pageIndex });
      console.log(res);
      this.postlist = res.data.data;
      this.total = res.data.total;
    },
    handleEdit(index, data) {
      console.log(index, data);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageIndex = val;
      // 每次改变都要发一次请求
      this.init();
    }

  },
  filters: {
    timer(time, spe) {
      time = new Date(time);
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
