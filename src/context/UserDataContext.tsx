import { createContext, ReactNode, useState } from "react";
import { getPayload } from "../service/Authenticate";
import { getUser, getUsers, User } from "../service/User";

interface UserDataContextData {
    user: User;
    users: User[];
    getAllUsers:()=>User[] | any;
    getOneUser:()=>User | any;
}

const DEFAULT_CONTEXT_DATA = {
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

        const usersSend = await getUsers() as User[]
            if(usersSend){
                setUsers(usersSend)
                const payLoad = getPayload()
                let userFilter:User | null;
                
                users.map((user)=>{
                    if(payLoad.email === user.email){
                        return userFilter = user
                    }
                    return userFilter
                })
                setUser(userFilter)
            }
    }  

    let userSend:User | null;
    async function getOneUser():Promise<User | any>{
        userSend = await getUser() as User
        if(userSend){
            setUser(userSend)
        }
            
    }






    return(
        <UserDataContext.Provider value={{user, users, getAllUsers, getOneUser}}>
            {children}
        </UserDataContext.Provider>
    )

}