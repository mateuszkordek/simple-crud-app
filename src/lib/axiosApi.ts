import axios from 'axios'

const apiKey = import.meta.env.VITE_REQRES_API_KEY

const axiosApi = axios.create({
    baseURL: 'https://reqres.in/api/',
    headers: {
        'x-api-key': apiKey,
    },
})

export default axiosApi
