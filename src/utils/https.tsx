import axios from 'axios'

const https = axios.create({
    baseURL:'https://nlw-mysql.herokuapp.com'
})

export const access_token = window.localStorage.getItem('access_token');

if(access_token){
    https.defaults.headers.common = {'Authorization': `bearer ${access_token}`}
}

export default https;