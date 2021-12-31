import { createContext, ReactNode, useState } from "react";
import { Compliment, getComplimentsListReceive, getComplimentsListSend } from "../service/Compliment";

interface ListsComplimetsContextData {
    listComplimentsSend:Compliment[];
    listComplimentsReceiver:Compliment[];
    getAllComplimentsSend:() => Promise<Compliment[]>;
    getAllComplimentsReceiver:() => Promise<Compliment[]>;
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

    async function getAllComplimentsSend():Promise<Compliment[]>{
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


    async function getAllComplimentsReceiver():Promise<Compliment[]>{
        const complimentsReceive = await getComplimentsListReceive()
        if(complimentsReceive){
            return await getComplimentsListReceive()
            .then((data:Compliment[])=>{
                if(data){
                    console.log(data)
                    setListComplimentsReceiver(data)
                }
            }) as Compliment[] | any
        }
    }


    return(
        <ListsComplimetsContext.Provider value={{
        listComplimentsSend, 
        getAllComplimentsSend, 
        getAllComplimentsReceiver, 
        listComplimentsReceiver}}>
            {children}
        </ListsComplimetsContext.Provider>
    )

}

