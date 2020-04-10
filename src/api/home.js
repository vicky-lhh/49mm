import {instance} from '../util/request.js'

function getinfo(params) {
    return instance({
        url: "/info",
        method: "get",
        params
    })
}
function exitlogin() {
    return instance({
        url: "/logout",
        method: "get",
        
    })
}
export { getinfo , exitlogin}