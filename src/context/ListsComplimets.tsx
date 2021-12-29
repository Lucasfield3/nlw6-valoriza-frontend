import { createContext, ReactNode, useEffect, useState } from "react";
import { Compliment, getComplimentsListSend } from "../service/Compliment";

interface ListsComplimetsContextData {
    listComplimentsSend:Compliment[];
    getAllComplimentsSend:() => Promise<Compliment[] | any>;
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

    async function getAllComplimentsSend():Promise<Compliment[] | any>{
        const complimentsSend = await getComplimentsListSend()
        if(complimentsSend){
            return await getComplimentsListSend()
            .then((data:Compliment[])=>{
                if(data){
                    console.log(data)
                    setListComplimentsSend(data)
                }
            }) as Compliment[] | any
        }
    }


    return(
        <ListsComplimetsContext.Provider value={{listComplimentsSend, getAllComplimentsSend}}>
            {children}
        </ListsComplimetsContext.Provider>
    )

}

