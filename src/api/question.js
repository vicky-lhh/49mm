import {instance} from '../util/request.js'
function getQuestionData(params){
    return instance({
        url:"/question/list",
        method:"get",
        params
    })
}  

export {getQuestionData}