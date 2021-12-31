import '../styles/user-page.scss';

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
             <div style={{opacity:isShown ? 1 : 0, zIndex:isShown ? 80 : -80}} className="list-compliment">
                    <p>{forFrom} {email}</p>
                <textarea value={message} rows={7} cols={28}/>
                {tag}
            </div>

        </>
    )

}