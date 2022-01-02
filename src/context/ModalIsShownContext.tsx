import { createContext, ReactNode, useState } from "react";


interface ModalIShownContextData {
    isShown:boolean;
    handleModalIsShown:()=>void;
    complimentModalShown:boolean;
    handleModalIsShownCompliments:()=>void;
}

export const ModalIshownContext = createContext({} as ModalIShownContextData)

interface ModalIshownProviderProps {
    children:ReactNode;
}

export function ModalIshownProvider({children}:ModalIshownProviderProps){

    const [ isShown, setIsShown] = useState(false)
    const [  complimentModalShown, setComplimentModalShown ] = useState(false);

    function handleModalIsShown(){
        setIsShown(!isShown)
    }

    function handleModalIsShownCompliments(){
        setComplimentModalShown(!complimentModalShown)
    }

    return(
        <ModalIshownContext.Provider value={{isShown,  complimentModalShown, handleModalIsShown, handleModalIsShownCompliments}}>
            {children}
        </ModalIshownContext.Provider>
    )

}