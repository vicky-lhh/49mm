 import {instance} from '../util/request.js'


function getphonecode(data){
   return instance({
        url: "/sendsms",
        method: "post",
        data  //data: data  
       
      })

}

function register(data){
  return instance({
    url: "/register",
    method: "post",
    data  //data: data  
  })
}

export  {getphonecode,register}