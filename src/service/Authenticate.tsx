import https from "../utils/https";
import jwt_decode from "jwt-decode";

export interface Credentials {
    email: string;
    password: string;
}

export interface AccessToken {
    access_token: string;
}

export async function login(credentials: Credentials):Promise<string | any>{

    console.log(credentials);

    return https
    .post('/login', credentials)
    .then(async(res)=> {
        return await res.data as string
    })
    .catch(err => {console.error(err)})

}

export const storeToken = (access_token:string)=>{
    console.log(access_token)
    
    return window.localStorage.setItem('access_token', access_token)
}

export const getToken = () =>{
    return window.localStorage.getItem('access_token')
}

export const getPayload = ()=>{
    const token = window.localStorage.getItem('access_token')
    console.log(token)
    return jwt_decode(token)
}