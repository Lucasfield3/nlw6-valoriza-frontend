import { createContext, ReactNode, useState } from "react";
import { getTags, Tag } from "../service/Compliment";

interface TagDataContextProp{
    tags:Tag[];
    getAllTags:()=>void;
}

export const TagDataContext = createContext({} as TagDataContextProp)

interface TagDataProviderProps {
    children:ReactNode;
}

export function TagDataProvider({children}:TagDataProviderProps){

    const [ tags, setTags] = useState<Tag[]>()

    async function getAllTags(){

        const tagsSend = await getTags()
        if(tagsSend){
            setTags(tags)
            console.log(tags)
        }

    }

    return(
        <TagDataContext.Provider value={{tags, getAllTags}}>
            {children}
        </TagDataContext.Provider>
    )

}