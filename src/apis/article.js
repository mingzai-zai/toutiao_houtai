import axios from '@/utils/myaxios.js'

export const getAllarticle = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const publishArticle = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
