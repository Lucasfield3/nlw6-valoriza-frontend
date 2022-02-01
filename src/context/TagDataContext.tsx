import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getToken } from "../service/Authenticate";
import { getTags, Tag } from "../service/Compliment";
import https from "../utils/https";
import { AuthContext } from "./AuthContext";

interface TagDataContextProp{
    tags:Tag[];
    getAllTags:()=>Promise<Tag[]>;
}

export const TagDataContext = createContext({} as TagDataContextProp)

interface TagDataProviderProps {
    children:ReactNode;
}

export function TagDataProvider({children}:TagDataProviderProps){

    const [ tags, setTags] = useState<Tag[]>()
    async function getAllTags():Promise<Tag[] | any>{

        return await https
        .get<Tag[]>('/tags')
        .then((res)=> {
            setTags(res.data)
        })
        .catch(err => console.log(err))
    
    }


  
    return(
        <TagDataContext.Provider value={{tags, getAllTags}}>
            {children}
        </TagDataContext.Provider>
    )

}