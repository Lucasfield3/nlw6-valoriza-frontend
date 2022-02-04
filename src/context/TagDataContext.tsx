import { createContext, ReactNode,  useState } from "react";
import { getTags, Tag } from "../service/Compliment";


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
        const tagsSend = await getTags() as Tag[]
        if(tagsSend){
            setTags(tagsSend)
        }

    }
  
    return(
        <TagDataContext.Provider value={{tags, getAllTags}}>
            {children}
        </TagDataContext.Provider>
    )

}