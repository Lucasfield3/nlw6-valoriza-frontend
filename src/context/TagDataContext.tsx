import { createContext, ReactNode, useState } from "react";
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

    async function getAllTags(){
        const tagsSend = await getTags()
        if(tagsSend){
            return await getTags().then((data:Tag[]) =>{
                if(data){
                    setTags(data)
                }
            }) as Tag[] | any
        }
            
            
      
       

    }


    return(
        <TagDataContext.Provider value={{tags, getAllTags}}>
            {children}
        </TagDataContext.Provider>
    )

}