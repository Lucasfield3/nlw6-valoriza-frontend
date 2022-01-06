import { createContext, ReactNode,  useEffect,  useState } from "react";

import { getUsers, User } from "../service/User";

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

    const [ users , setUsers] = useState<User[]>([])

    async function getAllUsers():Promise<User[] | any>{
        const users = await getUsers()
        if(users){
           return await getUsers().then((data:User[])=>{
                setUsers(data)
            }) as User[]
        }  
        
    }  

    
    useEffect(() => {
        getAllUsers()
    }, [])
  

    return(
        <UserDataContext.Provider value={{ users, getAllUsers}}>
            {children}
        </UserDataContext.Provider>
    )

}