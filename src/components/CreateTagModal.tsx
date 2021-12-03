import { CSSProperties } from "react";
import '../styles/user-page.scss';

interface CreateTagModalProps {
    style:CSSProperties;
}

export function CreateTagModal({style}:CreateTagModalProps){



    return(
        <>
        <div style={style} className='modal-create-tag'>
            <header>
                <h1>Crie sua tag</h1>
            </header>
            <main>
                <input type="text" placeholder="digite sem a '#'" />
            </main>
            <button>Criar tag</button>
        </div>
        </>
    )

}