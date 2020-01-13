import axios from 'axios';
// 哪里需要默认就在哪里搞嘛真的是
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
//   因为富文本编辑器内部有内置的headers而且是异步做的，并没有经过axios拦截器
//   console.log(123)
  let token = localStorage.getItem('houtai_user_token')
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default axios
