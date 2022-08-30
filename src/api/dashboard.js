import request from '@/utils/request'

export function startProcessAPI(data) {
  return request({
    url: '/user/process/startProcess',
    method: 'POST',
    data
  })
}
