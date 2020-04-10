import {instance} from '../util/request.js'
// 登陆的axiso请求
function tologin(data) {
    return instance({
        url: "/login",
        method: "post",
        data
    })
}


export { tologin }