import axios from '@/utils/myaxios.js'

export const getAllarticle = () => {
  return axios({
    url: '/post'
  })
}
