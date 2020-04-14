import {instance} from '../util/request.js'

function getSubject(params){
    return instance({
         url: "/subject/list",
         method: "get",
         params //data: data  
        
       })
       }


   function setSubjectStatus(data) {
        return instance({
            url: "/subject/status",
            method: "post",
            data
        })
    }
    function delSubjectData(data) {
      return instance({
          url: "/subject/remove",
          method: "post",
          data
      })
  }


  function addSubjectData(data) {
    return instance({
        url: "/subject/add",
        method: "post",
        data
    })
}
function editSubjectData(data) {
  return instance({
      url: "/subject/edit",
      method: "post",
      data
  })
}
    
 export {getSubject, setSubjectStatus ,delSubjectData, addSubjectData,editSubjectData} 