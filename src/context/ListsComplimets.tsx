import { createContext, ReactNode, useContext,  useState } from "react";
import { Compliment,  getComplimentsListReceive, getComplimentsListSend } from "../service/Compliment";

import { AuthContext } from "./AuthContext";


interface ListsComplimetsContextData {
    listComplimentsSend:Compliment[];
    listComplimentsReceiver:Compliment[];
    getAllComplimentsSend:() => Promise<Compliment[]>;
    getAllComplimentsReceiver:() => Promise<Compliment[]>;
    clearAll:() => void;
}

export const ListsComplimetsContext = createContext({} as ListsComplimetsContextData)


interface ListsComplimetsProviderProps {
    children:ReactNode;
}

let DEFAULT_CONTEXT_DATA:Compliment = {
    created_at: new Date(),
    id:'',
    message:'',
    tag_id:'',
    user_receiver:'',
    user_sender:''
}

export function ListsComplimetsProvider({children}:ListsComplimetsProviderProps) {

    const [ listComplimentsSend, setListComplimentsSend ] = useState<Compliment[]>([DEFAULT_CONTEXT_DATA])
    const [ listComplimentsReceiver, setListComplimentsReceiver ] = useState<Compliment[]>([DEFAULT_CONTEXT_DATA])
    const { userAuthenticated } = useContext(AuthContext)


            //console.log(userId.user.id)
    async function getAllComplimentsSend():Promise<Compliment[] | any>{
    
        const response = await getComplimentsListSend(userAuthenticated.user.id)
        console.log(response)
        if(response){
            setListComplimentsSend(response)
        }
            
        
    }


    async function getAllComplimentsReceiver():Promise<Compliment[] | any>{
       
            const response = await getComplimentsListReceive(userAuthenticated.user.id) 
            console.log(response)
            if(response){
                setListComplimentsReceiver(response)
            }
        
    }
    function clearAll(){
        setListComplimentsReceiver([])
        setListComplimentsReceiver([])
    }


    return(
        <ListsComplimetsContext.Provider value={{
        listComplimentsSend, 
        getAllComplimentsSend, 
        getAllComplimentsReceiver, 
        listComplimentsReceiver,
        clearAll
        }}>
            {children}
        </ListsComplimetsContext.Provider>
    )

}

