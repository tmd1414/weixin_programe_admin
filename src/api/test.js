import request from '@/utils/request'

export function getTableData(params) {
  return request({
    url: 'subject',
    method: 'get',
    params
  })
}
