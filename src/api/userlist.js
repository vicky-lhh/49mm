import {instance} from '../util/request.js'

function getUserlist(params){
    return instance({
        url:"/user/list",
        method:"get",
        params
    })
}


function setUserlistStatus(data){
    return instance({
        url:"/user/status",
        method:"post",
         data
    })
}

function delUserlistData(data){
    return instance({
        url:"/user/remove",
        method:"post",
         data
    })
}

function editUserlistData(data){
    return instance({
        url:"/user/edit",
        method:"post",
         data
    })
}

function addUserlistData(data){
    return instance({
        url:"/user/add",
        method:"post",
         data
    })
}

export {getUserlist, setUserlistStatus,delUserlistData,editUserlistData,addUserlistData}
