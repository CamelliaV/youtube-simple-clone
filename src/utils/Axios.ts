import axios from 'axios'

export default axios.create({
  baseURL: 'https://youtube-simple-clone-production.up.railway.app' + '/api',
  withCredentials: true
})
