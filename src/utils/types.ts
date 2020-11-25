
export interface IRequestModel {
  url: string,
  method?: 'post'| 'put' | 'get' | 'delete',
  data?: any,
  headers?: any
}