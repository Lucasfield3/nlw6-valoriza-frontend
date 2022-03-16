import { DEFAULT_TAG_ID } from '../pages/Home';
import '../styles/modals.scss';

interface ModalComplimentsProps {
    isShown:boolean;
    email:string[];
    tag:string[];
    message:string;
    forFrom:string;
}

export function ModalCompliments({isShown, email, tag, message, forFrom}:ModalComplimentsProps){

  

    return(
        <>
             <div style={{opacity:isShown ? 1 : 0, zIndex:isShown ? 80 : -80, padding:'0.5rem 0.5rem 0 0.5rem'}} className="list-compliment">
                    <p>{forFrom} {email}</p>
                <textarea readOnly value={message} rows={4} cols={28}/>
                {tag[0] !== DEFAULT_TAG_ID && tag}
            </div>

        </>
    )

}