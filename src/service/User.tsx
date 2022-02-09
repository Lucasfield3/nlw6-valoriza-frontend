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
    admin?:boolean;
    password:string;
    created_at: Date;
    updated_at:Date;
}


export async function createUser(newUser:NewUser){
    console.log(newUser);
    return await https
        .post<User>('/users', newUser)
        .then(async(res)=> {
            return res.data
        })

}

export async function getUsers():Promise<User[] | any>{
 
        return await https
            .get<User[]>('/users')
            .then((res)=>{
                return  res.data as User[] | any
            })
            .catch((erro)=>{
                console.log(erro)
                
            })

}
