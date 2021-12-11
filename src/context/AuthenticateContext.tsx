import { createContext, ReactNode, useState } from "react";
import { NavigateFunction } from "react-router";
import { login, storeToken } from "../service/Authenticate";

interface AuthenticateContextData {
    handleLogin:(email:string, password:string, navigate:NavigateFunction)=>void;
    isLoggedIn:boolean;
    handleIsLogged:(navigate:NavigateFunction)=>void;
}

export const AuthenticateContext = createContext({} as AuthenticateContextData)

interface AuthenticateDataProps {
    children:ReactNode;
}

export function AuthenticateProvider({children}: AuthenticateDataProps) {

    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    console.log(isLoggedIn)

    async function handleLogin(email:string, password:string, navigate:NavigateFunction){

        var access_token:string | any = null;
        access_token = await login({email, password}, isLoggedIn)
        if(access_token){
            storeToken(access_token)
            setIsLoggedIn(true)
            navigate('/home')
        }else{
            setIsLoggedIn(false)
        }
            
    }  

    async function handleIsLogged(navigate:NavigateFunction){
        if(isLoggedIn === false){
            console.log(isLoggedIn)
            return navigate('/')
        }
    }

    return(
        <AuthenticateContext.Provider value={{isLoggedIn, handleIsLogged, handleLogin}}>
            {children}
        </AuthenticateContext.Provider>
    )

}