import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'https://reqres.in/api/',
})

export default axiosApi
