import https from '../utils/https';

export interface NewUser{
    name:string;
    email:string;
    password:string;
}

export interface User {
    id:string;
    name:string;
    email:string;
    password:string;
    created_at: Date;
    updated_at:Date;
}


export async function createUser(newUser:NewUser){
    console.log(newUser);
    https
        .post<User>('/users', newUser)
        .then(async(res)=> {
            console.log(res.data)
            return await res.data
        })

}

export async function getUsers():Promise<User[]>{

    return https
        .get('/users')
        .then(async(res)=>{
            console.log(res.data)
            return await res.data
        })
        .catch((erro)=>{
            console.log(erro)
        })

}