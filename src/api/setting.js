import request from '@/utils/request'

export function getCharactorListAPI(params) {
  return request({
    url: '/sys/role',
    Query: { params }
  })
}

export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

export function delCharactorAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

export function updateCharactorAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

export function getCharactorInfoAPI(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

export function addCharactorAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

export function putAssignPermissionAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
