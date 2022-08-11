import request from '@/utils/request'

export function getCompanyListAPI() {
  return request({
    url: '/company/department'
  })
}

export function deleteCompanyListAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

export function addCompanyListAPI(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
