import axios from '@/utils/myaxios.js'

export const getAllarticle = (params) => {
  return axios({
    url: '/post',
    params
  })
}
