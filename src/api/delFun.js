import request from '../utils/request'

export function delFun(url, data) {
    return request({
        url: url,
        method: 'delete',
        params: data
    })
};