import { createContext, ReactNode,  useContext,  useEffect,  useState } from "react";

import { getUsers, User } from "../service/User";
import { AuthContext } from "./AuthContext";

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
    const { authenticated} = useContext(AuthContext)
    async function getAllUsers():Promise<User[] | any>{
        const users = await getUsers() as User[] | any;
        if(users){
         
            setUsers(users)
           
        }  
        
    }  

    
    useEffect(() => {
        if(authenticated){
            getAllUsers()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

    return(
        <UserDataContext.Provider value={{ users, getAllUsers}}>
            {children}
        </UserDataContext.Provider>
    )

}