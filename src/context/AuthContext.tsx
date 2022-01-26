import { createContext, ReactNode, useEffect, useState } from "react" ;
import { useNavigate } from "react-router-dom";
import { Credentials, login, storeToken, UserAuthenticated} from "../service/Authenticate";
import { Compliment } from "../service/Compliment";
import https from "../utils/https";


interface AuthContextData{
    authenticated:boolean;
    authenticate:(data:Credentials)=>Promise<UserAuthenticated>;
    logOut():void;
    userAuthenticated:UserAuthenticated;
    loading:boolean;
    listComplimentsReceiver:Compliment[];
    listComplimentsSend:Compliment[];
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps{
    children:ReactNode;
}

let DEFAULT_COMPLIMENT_DATA:Compliment = {
    created_at: new Date(),
    id:'',
    message:'',
    tag_id:'',
    user_receiver:'',
    user_sender:''
}

export let DEFAULT_CONTEXT_DATA = {
    token:'',
    user:{
        id:'',
        email:'',
        password:'',
        name:'',
        created_at: new Date(),
        updated_at:new Date()
    },
    compliments:{
        send:[DEFAULT_COMPLIMENT_DATA],
        receive:[DEFAULT_COMPLIMENT_DATA]
    }
}


export function AuthProvider({children}:AuthProviderProps){
    const [ userAuthenticated, setUserAuthenticated ] = useState<UserAuthenticated>(DEFAULT_CONTEXT_DATA)
    const [ listComplimentsSend, setListComplimentsSend ] = useState<Compliment[]>([DEFAULT_COMPLIMENT_DATA])
    const [ listComplimentsReceiver, setListComplimentsReceiver ] = useState<Compliment[]>([DEFAULT_COMPLIMENT_DATA])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()
    async function authenticate(data:Credentials):Promise<UserAuthenticated | any>{
          var access_token:string | any = null;
          const response =  await login(data)
          const user = response.data as UserAuthenticated 
          if(user){
                          access_token = response.data.token
              storeToken(access_token)
              setUserAuthenticated(user)
              setListComplimentsSend(user.compliments.send)
              setListComplimentsReceiver(user.compliments.receive)
              localStorage.setItem('user', JSON.stringify(user))

          }
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
        <AuthContext.Provider value={{
            authenticate, 
            logOut, 
            authenticated:userAuthenticated === DEFAULT_CONTEXT_DATA ? false : true, 
            userAuthenticated, 
            loading,
            listComplimentsReceiver, 
            listComplimentsSend
            }}>
            {children}
        </AuthContext.Provider>
    )

}