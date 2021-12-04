import { useContext, useState } from "react";
import { ModalIshownContext } from "../context/ModalIsShownContext";
import { createTag, NewTag } from "../service/Compliment";
import '../styles/user-page.scss';


export function CreateTagModal(){
    const [ tag, setTag ] = useState<NewTag>({name:''})

    const {  isShown, handleModalIsShown } = useContext(ModalIshownContext)

    var newTag:string | any = null;
    
    async function handleCreateTag(){

        newTag = await createTag(tag);
        if(newTag){
            return handleModalIsShown()
        }

    }



    return(
        <>
        <div style={{opacity:isShown ? 1 : 0}} className='modal-create-tag'>
            <header>
                <h1>Crie sua tag</h1>
            </header>
            <main>
                <input value={tag.name} onChange={(e)=> setTag({name:e.target.value})} type="text" placeholder="digite sem a '#'" />
            </main>
            <button onClick={handleCreateTag}>Criar tag</button>
        </div>
        </>
    )

}