import { createContext, ReactNode, useState } from "react";


interface ModalIShownContextData {
    isShown:boolean;
    handleModalIsShown:()=>void;
}

export const ModalIshownContext = createContext({} as ModalIShownContextData)

interface ModalIshownProviderProps {
    children:ReactNode;
}

export function ModalIshownProvider({children}:ModalIshownProviderProps){

    const [ isShown, setIsShown] = useState(false)

    function handleModalIsShown(){
        setIsShown(!isShown)
    }

    return(
        <ModalIshownContext.Provider value={{isShown, handleModalIsShown}}>
            {children}
        </ModalIshownContext.Provider>
    )

}