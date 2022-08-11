import request from '@/utils/request'

export function getCompanyListAPI() {
  return request({
    url: '/company/department'
  })
}
