import { createContext, ReactNode, useEffect, useState } from "react" ;
import { useNavigate } from "react-router-dom";
import { Credentials, login, storeToken, UserAuthenticated } from "../service/Authenticate";
import https from "../utils/https";


interface AuthContextData{
    authenticated:boolean;
    authenticate:(data:Credentials)=>Promise<UserAuthenticated>;
    logOut():void;
    userAuthenticated:UserAuthenticated;
    loading:boolean;
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps{
    children:ReactNode;
}

export function AuthProvider({children}:AuthProviderProps){
    const [ userAuthenticated, setUserAuthenticated ] = useState<UserAuthenticated>(null)
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()
    async function authenticate(data:Credentials):Promise<UserAuthenticated>{
          var access_token:string | any = null;
         return await login(data)
          .then((dataLogin:UserAuthenticated) => {
              if(dataLogin){
                setUserAuthenticated(dataLogin)
                access_token = dataLogin.token
                storeToken(access_token) 
                  if(access_token){
                      localStorage.setItem('user', JSON.stringify(dataLogin.user))
                  }
              }
          }) as UserAuthenticated
      }
  
      function logOut(){
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          https.defaults.headers.common = {'Authorization': null}

          setUserAuthenticated(null)
          navigate('/')
      }

    useEffect(()=>{
        const recoverUser = localStorage.getItem('user')
        
        if(recoverUser){
            setUserAuthenticated(JSON.parse(recoverUser))
        }
        setLoading(false)
    }, [])

    return(
        <AuthContext.Provider value={{authenticate, logOut, authenticated:!!userAuthenticated, userAuthenticated, loading}}>
            {children}
        </AuthContext.Provider>
    )

}