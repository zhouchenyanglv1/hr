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

export function getUserDetalByIdAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}

export function saveUserDetailAPI(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

export function getPersonalInfoByIdAPI(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}

export function updatePersonalInfoByIdAPI(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'PUT'
  })
}
