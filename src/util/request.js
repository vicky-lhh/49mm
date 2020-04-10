import axios from 'axios'
import { Message } from 'element-ui'
import {getToken ,removeToken} from "../util/token.js"
import router from '@/myrouter/router.js'
const instance = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true //跨域照样协带cookie
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
if(getToken()){  config.headers.token=getToken()}
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
if(response.data.code==200){
        // 因为返回数据里面axios帮我们额外的包了一层data但实际我们基本不用，所以我们把它干掉
 
  return response.data;
}else if(response.data.code==206){
  Message.error(response.data.message)
  router.push("/")
  removeToken()
  return Promise.reject("error");

}
else{
  Message.error(response.data.message)
  return Promise.reject("error");
}
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export {instance}