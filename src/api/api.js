import service from './service.js'
const qs = require('qs');
const get = function (url) {
    return service.get(url)
};
const post = function (url, data) {
    return service.post(url, qs.stringify(data))
};

const postS = function (url, data) {
    return service.post(url, data,{headers:{'Content-Type': 'application/json;charset=UTF-8'}})
};

const postX = function (url, data) {
    return service.post(url, qs.stringify(data),{headers:{'Content-Type': 'application/json;charset=UTF-8'}})
};

export default {
    get,
    post,
    postS,
    postX
}