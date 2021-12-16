import { useContext, useState } from "react";
import { ModalIshownContext } from "../context/ModalIsShownContext";
import { TagDataContext } from "../context/TagDataContext";
import { createTag, NewTag } from "../service/Compliment";
import '../styles/user-page.scss';


export function CreateTagModal(){
    const [ tag, setTag ] = useState<NewTag>({name:''})

    const {  isShown, handleModalIsShown } = useContext(ModalIshownContext)
    const { getAllTags} = useContext(TagDataContext)
    var newTag:string | any = null;
    
    async function handleCreateTag(){

        newTag = await createTag(tag);
        if(newTag){
            handleModalIsShown()
            getAllTags()
        }

    }



    return(
        <>
        <div style={{opacity:isShown ? 1 : 0, zIndex:isShown ? 80 : -80}} className='modal-create-tag'>
            <header>
                <h1>Crie sua tag</h1>
            </header>
            <main>
                <input  value={tag.name} onChange={(e)=> setTag({name:e.target.value})} type="text" placeholder="digite sem a '#'" />
            </main>
            <button  onClick={handleCreateTag}>Criar tag</button>
        </div>
        </>
    )

}