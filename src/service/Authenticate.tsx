import https from "../utils/https";
import jwt_decode from "jwt-decode";

export interface Credentials {
    email: string;
    password: string;
}

export interface AccessToken {
    access_token: string;
}

export interface PayLoad {
    email: string;
    iat:number;
    exp:number;
    sub:string;
}

export async function login(credentials: Credentials, isLoggedIn:boolean):Promise<string | any>{

    console.log(credentials);

    return https
    .post('/login', credentials)
    .then(async(res)=> {
        isLoggedIn = true
        return await res.data as string
         
    })
    .catch(err => {
        console.error(err)
        return isLoggedIn = false
    })

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