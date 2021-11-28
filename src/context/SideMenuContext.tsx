import { createContext, ReactNode, useState } from "react";

type SideMenuContextData  = {
    isActive:boolean;
    handleIsActive:()=>void;
    overlayIsActive:()=>void;
}

 
export const SideMenuContext  = createContext({} as SideMenuContextData)



type SideMenuProviderProps = {
    children:ReactNode;
}

export function SideMenuProvider({children}:SideMenuProviderProps){

    const [isActive, setIsActive] = useState(false);

    function handleIsActive(){
        setIsActive(!isActive);
    }

    function overlayIsActive(){
        if(isActive){
            setIsActive(!isActive);
        }
    }


    return(
        <SideMenuContext.Provider value={{isActive, handleIsActive, overlayIsActive}}>
            {children}
        </SideMenuContext.Provider>
    )

}