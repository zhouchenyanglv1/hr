import request from '@/utils/request'

export function getEmployeesSimpleListAPI() {
  return request({
    url: '/sys/user/simple'
  })
}
