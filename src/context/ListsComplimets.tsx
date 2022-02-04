import { createContext, ReactNode, useContext } from "react";
import { Compliment,  getComplimentsListReceive, getComplimentsListSend } from "../service/Compliment";

import { AuthContext } from "./AuthContext";


interface ListsComplimetsContextData {
    getAllComplimentsSend:() => Promise<Compliment[]>;
    getAllComplimentsReceiver:() => Promise<Compliment[]>;
}

export const ListsComplimetsContext = createContext({} as ListsComplimetsContextData)


interface ListsComplimetsProviderProps {
    children:ReactNode;
}



export function ListsComplimetsProvider({children}:ListsComplimetsProviderProps) {

   
    const { userAuthenticated,  authenticated } = useContext(AuthContext)


            //console.log(userId.user.id)
    async function getAllComplimentsSend():Promise<Compliment[] | any>{
    
        const response = await getComplimentsListSend(userAuthenticated.user.id) as Compliment[]
        console.log(response)
        if(authenticated){
            //setCompliments(response, 'send')
        }
            
    }


    async function getAllComplimentsReceiver():Promise<Compliment[] | any>{
       
            const response = await getComplimentsListReceive(userAuthenticated.user.id) as Compliment[]
            console.log(response)
            if(authenticated){
               // setCompliments(response, 'receive')
            }

    }
 
    return(
        <ListsComplimetsContext.Provider value={{
        getAllComplimentsSend, 
        getAllComplimentsReceiver, 
        }}>
            {children}
        </ListsComplimetsContext.Provider>
    )

}

