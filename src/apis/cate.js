import axios from '@/utils/myaxios.js'
export const GETcatelist = () => {
  return axios({
    url: '/category'
  })
}
