import { createContext, ReactNode,  useState } from "react";
import { User } from "../service/User";
import https from "../utils/https";


interface UserDataContextData {
    users: User[];
    getAllUsers:()=>Promise<User[] | any>;
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

    const [ users , setUsers] = useState<User[]>()
    async function getAllUsers():Promise<User[] | any>{
 
        return await https
            .get<User[]>('/users')
            .then((res)=>{
                const users = res.data
                setUsers(users)
            })
            .catch((erro)=>{
                console.log(erro)
                
            })
    
    }



    return(
        <UserDataContext.Provider value={{ users, getAllUsers}}>
            {children}
        </UserDataContext.Provider>
    )

}