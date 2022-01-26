import https from "../utils/https";
import jwt_decode from "jwt-decode";
import { User } from "./User";
import { Compliment } from "./Compliment";

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

export interface UserAuthenticated {
    token: string;
    user: User;
    compliments:{
        send:Compliment[];
        receive:Compliment[];
    }
}

export async function login(credentials: Credentials):Promise<UserAuthenticated | any>{

    console.log(credentials);

    return https.post('/login', credentials) as UserAuthenticated | any
    
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
    if(token){
        return jwt_decode(token) as PayLoad
    }
}