import axios from "axios"

const service = axios.create({
    baseURL:'http://127.0.0.1:8300'
});

// 请求拦截
service.interceptors.request.use(config => {
    let token = window.localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = 'Bearer '+token;
    }
    return config
});

//相应拦截
service.interceptors.response.use(function (response) {
    return response.data
})

export default service