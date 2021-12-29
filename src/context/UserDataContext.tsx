import { createContext, ReactNode, useEffect, useState } from "react";
import { getPayload, PayLoad } from "../service/Authenticate";
import { getUser, getUsers, User } from "../service/User";

interface UserDataContextData {
    user: User;
    users: User[];
    getAllUsers:()=>Promise<User[] | any>;
    getOneUser:()=>User | any;
}

export const DEFAULT_CONTEXT_DATA = {
    id:'',
    name:'',
    email:'',
    password:'',
    created_at: new Date(),
    updated_at:new Date()
}   

export const UserDataContext = createContext({} as UserDataContextData)

interface UserDataProviderProps {
    children:ReactNode;
}

export function UserDataProvider({children}: UserDataProviderProps) {

    const [ user , setUser] = useState<User>(DEFAULT_CONTEXT_DATA)
    const [ users , setUsers] = useState<User[]>([])


    async function getAllUsers():Promise<User[] | any>{
        const users = await getUsers()
        if(users){
           return await getUsers().then((data:User[])=>{
                setUsers(data)
                const payLoad = getPayload() as PayLoad
                let userFilter:User;
                data.map((user)=>{
                    if(payLoad.email === user.email){
                        return userFilter = user
                    }
                    return userFilter
                })

                setUser(userFilter)
            }) as User[] | any  
        }  
        
    }  



    let newUser:User
    async function getOneUser(){
       return await getUser()
       .then((data:User)=>{
           if(data){
            newUser = data
               console.log(newUser)
               //setUser(newUser)
           }
       })
    }
    

useEffect(()=>{ 
    getAllUsers()
}, [])



    return(
        <UserDataContext.Provider value={{user, users, getAllUsers, getOneUser}}>
            {children}
        </UserDataContext.Provider>
    )

}