
/*
    封装ajax接口请求函数
 */

import axios from 'axios'

export const ajax = (url, data={}, type='GET') => {
    return new Promise((resolve, reject)=>{
        let promise;
        if(type==='GET'){
            promise = axios.get(url, {params: data})
        }else if(type==="POST"){
            promise = axios.post(url, data)
        }

        promise.then((response)=>{
            resolve(response.data)
        }).catch((err)=>{
            reject(err)
        })
    })
};
