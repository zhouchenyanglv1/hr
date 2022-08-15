import request from '@/utils/request'

export function getCharactorListAPI(params) {
  return request({
    url: '/sys/role',
    Query: { params }
  })
}
