import request from '../utils/request'

export function getFun(url, params) {
    return request({
        url: url,
        method: 'get',
        params: params
    })
}