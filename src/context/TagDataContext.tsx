import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getToken } from "../service/Authenticate";
import { getTags, Tag } from "../service/Compliment";
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
    const {userAuthenticated, authenticated} = useContext(AuthContext)
    async function getAllTags():Promise<Tag[] | any>{
        const tagsSend = await getTags() as Tag[]
        if(authenticated){
            setTags(tagsSend)
        }

    }


  
    return(
        <TagDataContext.Provider value={{tags, getAllTags}}>
            {children}
        </TagDataContext.Provider>
    )

}