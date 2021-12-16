import { createContext, useContext, useEffect, useState } from "react" ;
import { getPayload } from "../service/Authenticate";
import { getUsers, User } from "../service/User";

interface Auth{
    loggedIn:boolean;
    userId?:string;
}

interface AuthInit{
    loading:boolean;
    auth?:Auth
}

export const AuthContext = createContext<Auth>({loggedIn:false})

export function useAuth():Auth{
    return useContext(AuthContext)
}

export function useAuthInit():AuthInit{
    const [ authInit, setAuthInit ] = useState<AuthInit>({ loading:true })
    const payLoad = getPayload() 
   
   async function handleIsLoggedIn(){
    let auth:Auth


        return await getUsers().then((data:User[])=>{
            if(data){
                data.map((dataUser:User) => {
                    auth  = (payLoad !== undefined ) ? {loggedIn:true, userId:dataUser.id} :
                   {loggedIn:false}
                   setAuthInit({loading:false, auth})
                   return console.log('isLoggedIn', auth)
                })
            }else{
                auth  = {loggedIn:false}
                setAuthInit({loading:false, auth})
                return console.log('isLoggedIn', auth)
            }
          })
    
   } 
    useEffect(()=>{
        handleIsLoggedIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return authInit
}