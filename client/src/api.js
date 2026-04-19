import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

instance.interceptors.response.use((res) => res, (err)=>{
    if(err.response.status >= 400){
        throw new Error(err.response.data)
    }
    return Promise.reject(err)
})

export default instance
