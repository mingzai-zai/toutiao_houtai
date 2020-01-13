<template>
  <div class="send">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-loading">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 加了一个el-form设置了label-width为了后面的标签都能设置宽度不用一个一个设置 -->
      <el-form ref="post" :model="post" label-width="80px">
        <!-- title文本框 -->
        <el-form-item label="标题：">
          <el-input v-model="post.title"></el-input>
        </el-form-item>
        <!-- 单选框 -->
        <el-form-item label="类型：">
          <el-radio-group v-model="post.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 编辑器 -->
        <!-- 文章 -->
        <el-form-item label="内容：" v-if="post.type === 1">
          <VueEditor :config="config" ref="vueEditor" />
        </el-form-item>
        <!-- 视频 -->
        <el-form-item label="内容：" v-if="post.type === 2">
            <!-- 这里也是element ui自己又headers，封装了内部的异步操作，不用axios -->
          <el-upload class="upload-demo" action="http://localhost:3000/upload" :headers="setToken()" :on-success='vedio_ss' :before-upload='sure'>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能视频啊啊啊啊啊啊啊啊啊啊啊啊
            </div>
          </el-upload>
        </el-form-item>
        <!-- 复选框 -->
        <el-form-item label="栏目：">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="post.categories" @change="handleCheckedCitiesChange">
            <el-checkbox
              v-for="cate in catelist"
              :label="cate.id"
              :key="cate.id"
              >{{ cate.name }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item label="封面：">
            <!-- action就等于发一次请求的地址 -->
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :on-success='send_fengmian'
            :headers="setToken()"
            :on-remove='remove'
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- 按钮 -->
         <el-button type="danger" style="margin: 10px; border-radius:50%;" @click="send">点我啊锤子发布文章</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import VueEditor from 'vue-word-editor';
import 'quill/dist/quill.snow.css';
import { GETcatelist } from '@/apis/cate.js';
import { publishArticle } from '@/apis/article.js'
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      catelist: [],
      isIndeterminate: false,
      checkAll: false,
      post: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.setToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            // console.log(res);
            // 输出一下看能不能请求成功
            // 第二次就是看设置的对不对res.data.data还是res.data
            insert('http://localhost:3000' + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          headers: this.setToken(),
          uploadSuccess(res, insert) {
            insert('http://localhost:3000' + res.data.data.url);
          }
        }

      }
    };
  },
  async mounted() {
    let res = await GETcatelist();
    // console.log(res)
    // 因为验证了token所以有关注和头条需要从第二个开始，一开始是没有token所以才为1
    // this.catelist = res.data.data.splice(1);
    this.catelist = res.data.data.splice(2);
    // console.log(this.catelist)
  },
  methods: {
    setToken() {
      // 因为图片和视频都要设置headers所以封装一下
      let token = localStorage.getItem('houtai_user_token');
      // headers需要传的是对象
      return { Authorization: token }
    },
    // 提交数据
    async send() {
      if (this.post.type === 1) {
        this.post.content = this.$refs.vueEditor.editor.root.innerHTML
      }
      console.log(this.post)
      this.post.categories = this.post.categories.map(e => {
        return { id: e }
      })
      let res = await publishArticle(this.post)
      console.log(res);
      if (res.data.message === '文章发布成功') {
        this.$message.success(res.data.message)
        this.$router.push({ name: 'Postlist' })
      }
    },
    // 视频类型的视频上传ok
    vedio_ss(res) {
      console.log(res);
      if (res.message === '文件上传成功') {
        this.post.content = 'http://127.0.0.1:3000' + res.data.url;
      }
    },
    // 判断是否是视频
    sure(file) {
    //   console.log(file)
      if (file.type.indexOf('video/') === -1) {
        return false;
      }
    },
    // 封面上传成功
    send_fengmian(res) {
      console.log(res);
      this.post.cover.push({ id: res.data.id })
    },
    // 封面移除的时候触发时间，因为封面有可能被删除，但是显示的是还是两个数组，所以要触发on-remove
    remove(file) {
      console.log(file)
      let id = file.response.data.id;
      this.post.cover = this.post.cover.filter(e => {
        return e.id !== id
      })
    },
    // 多选框的做法
    handleCheckAllChange(val) {
    //   console.log(val);true/false
      //   this.checkedCities = val ? cityOptions : [];
      //   console.log(this.catelist)
      this.post.categories = val ? this.catelist.map(e => {
        return e.id
      }) : []
      //   this.post.categories = val ? this.catelist.map(e => {
      //     return {id:e.id}
      //   }) : []
      // 不要这么写因为这样子是不等于label的值选不了的
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
    //   console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.catelist.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.catelist.length;
    }
  }
};
</script>

<style lang="less" scpoed>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-button{
    width: 100%;
       letter-spacing: 6em;
}
</style>
