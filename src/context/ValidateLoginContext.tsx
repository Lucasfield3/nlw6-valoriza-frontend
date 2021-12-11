import { createContext, ReactNode, useContext} from "react";
import { NavigateFunction } from "react-router";
import { UserDataContext } from "./UserDataContext";

interface ValidateContextDataProps{
    handleIsLogged:(navigate:NavigateFunction)=>void;
}

export const ValidateContext = createContext({} as ValidateContextDataProps)

interface ValidateProviderProps{
    children:ReactNode;
}

export function ValidateProvider({children}:ValidateProviderProps){

    const { user } = useContext(UserDataContext)
    
    function handleIsLogged(navigate:NavigateFunction){
        if(!user){
            return navigate('/')
        }
    }


    return(
        <ValidateContext.Provider value={{handleIsLogged}}>
            {children}
        </ValidateContext.Provider>
    )

}