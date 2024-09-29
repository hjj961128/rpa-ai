import request from '@/utils/request'


// 获取第三方流程厂家列表
export function getVendorAPI() {
  return request({
    url: '/api/vendor',
    method: 'get',
    params:{limit:false}
  })
}
