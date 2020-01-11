<template>
  <div class="index">
      <header>
          <div class="user">
              <img src="../assets/u=1442998595,1306184984&fm=26&gp=0.jpg" alt="">
              <span>我是管理员</span>
              <a href="javascript:;">退出</a>
          </div>
      </header>
      <div class="aside">
          <h2>黑马头条</h2>
          <dl>
              <dt>文章管理</dt>
              <dd>文章列表</dd>
              <dd>发布文章</dd>
          </dl>
      </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang='less' scoped>
.index{
    width: 100%;
    height: 100%;
    header{
        position: absolute;
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #444;
        padding:20px 0;
        .user{
            float: right;
            margin-right: 40px;
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
            }
            span{
                margin: 0 20px 0 10px;
            }
        }
    }
    .aside{
        position: absolute;
        width: 200px;
        height: 100%;
        background-color: black;
        z-index: 999;
        color:#ccc;
        h2{
            font-weight: 700;
            font-size: 30px;
            margin: 50px 35px 70px;
        }
        dl{
            dt{
                font-size: 28px;
                height: 40px;
                padding: 0 0 10px 25px;
                line-height: 50px;
                &:hover{
                    background-color: #fff;
                }
            }
            dd{
                font-size: 20px;
                height: 30px;
                padding: 0 0 10px 25px;
                line-height: 40px;
                &:hover{
                    background-color: #fff;
                }
            }
        }
    }
}
</style>
