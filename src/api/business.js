import {instance} from '../util/request.js'

function getBusiness(params){
    return instance({
         url: "/enterprise/list",
         method: "get",
         params //data: data  
        
       })
       }

       function addBusiness(data) {
        return instance({
            url: "/enterprise/add",
            method: "post",
            data
        })
    }

   
    // 状态修改
function setBusinessStatus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data
    })
}

function delBusinessData(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data
    })
}

function editBusinessData(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data
    })
}
export {getBusiness,addBusiness,setBusinessStatus,delBusinessData,editBusinessData}
