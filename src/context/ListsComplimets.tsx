import { createContext, ReactNode, useState } from "react";
import { Compliment, getComplimentsListSend } from "../service/Compliment";

interface ListsComplimetsContextData {
    listComplimentsSend:Compliment[];
    getAllComplimentsSend:()=> void;
}

export const ListsComplimetsContext = createContext({} as ListsComplimetsContextData)


interface ListsComplimetsProviderProps {
    children:ReactNode;
}

export function ListsComplimetsProvider({children}:ListsComplimetsProviderProps) {

    const [ listComplimentsSend, setListComplimentsSend ] = useState<Compliment[]>([])

    async function getAllComplimentsSend():Promise<Compliment[] | any>{
        return await getComplimentsListSend()
        .then((data:Compliment[])=>{
            if(data){
                setListComplimentsSend(data)
            }
        })
    }

    return(
        <ListsComplimetsContext.Provider value={{listComplimentsSend, getAllComplimentsSend}}>
            {children}
        </ListsComplimetsContext.Provider>
    )

}