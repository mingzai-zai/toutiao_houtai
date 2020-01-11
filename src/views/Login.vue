<template>
  <div class="login">
    <div class="user_login">
      <img src="../assets/avatar.jpg" alt="" class="pic" />
      <el-form
        :model="user"
        :rules="rules"
        ref="user"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入靓仔/靓女名字"
            clearable
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <!-- 可以prefix-icon 和suffix-icon 属性在 input 组件首部和尾部增加显示图标,也可以通过 slot 来放置图标。可以在按钮那个位置找 -->
          <el-input
            type="password"
            v-model="user.password"
            placeholder="请输入昂仔/昂女密码"
            clearable
            prefix-icon="el-icon-key"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm" class="btn"
            >立即登录</el-button
          >
          <el-button @click="resetForm" class="btn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/apis/user.js';
export default {
  data() {
    return {
      user: {
        username: '10086',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入贵尊大名', trigger: 'blur' },
          { min: 1, message: '不能为空哦老板', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入贵尊密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '长度在 3 到 16 个字符',
            trigger: 'blur'
          },
          { pattern: /^\S+$/, message: '不能输入空的东西哦', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      // validate任一表单项被校验后触发
      this.$refs.user.validate(async valid => {
        console.log(valid);
        // console.log(this.$refs);
        if (valid) {
          //   console.log(this.user)
          //   alert('submit!');
          let res = await login(this.user);
          // console.log(res);
          if (res.data.message === '用户不存在') {
            this.$message.warning(res.data.message)
          } else {
            console.log(111)
          }
        } else {
          console.log('啊啊啊出错了');
          return false;
        }
      });
    },
    resetForm() {
      //   this.$refs[formName].resetFields();
      // resetFields()重置
      //   console.log(formName)---ruleForm
      //   console.log(this.$refs[formName])
      this.$refs.ruleForm.resetFields();
      //   console.log(this.$refs)// 是一个对象,再是一个属性
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #2f4050;
  .user_login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-55%, -55%);
    width: 450px;
    margin: 0 auto;
    .pic {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 45%;
      top: -75%;
      border-radius: 50%;
      border: 5px dotted #000;
    }
    .btn {
      margin-left: 60px;
    }
  }
}
</style>
