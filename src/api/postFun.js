import request from '../utils/request'

export function postFun(url, data) {
    return request({
        url: url,
        method: 'post',
        data: data
    })
};