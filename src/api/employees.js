import request from '@/utils/request'

export function getEmployeesSimpleListAPI() {
  return request({
    url: '/sys/user/simple'
  })
}

export function getEmployeesListAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}

export function delEmployeesAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

export function addEmployeesAPI(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

export function importExcelEmployeesAPI(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
