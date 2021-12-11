import { createContext, ReactNode, useState } from "react";
import { getUser, getUsers, User } from "../service/User";

interface UserDataContextData {
    user: User;
    users: User[];
    getAllUsers:()=>void;
    getOneUser:()=>void;
}

export const UserDataContext = createContext({} as UserDataContextData)

interface UserDataProviderProps {
    children:ReactNode;
}

export function UserDataProvider({children}: UserDataProviderProps) {

    const [ user , setUser] = useState<User>()
    const [ users , setUsers] = useState<User[]>()

    async function getAllUsers(){

        const usersSend = await getUsers() as User[]

        if(usersSend){
            setUsers(usersSend)
        }
        
    }  


    async function getOneUser(){
        const userSend = await getUser() as User
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