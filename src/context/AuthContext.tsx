import { createContext, ReactNode, useEffect, useState } from "react" ;
import { useNavigate } from "react-router-dom";
import { Credentials, login, storeToken, UserAuthenticated} from "../service/Authenticate";
import { Compliment, getComplimentsListReceive, getComplimentsListSend } from "../service/Compliment";


interface AuthContextData{
    authenticated:boolean;
    authenticate:(data:Credentials)=>Promise<UserAuthenticated>;
    logOut():void;
    userAuthenticated:UserAuthenticated;
    loading:boolean;
    listComplimentsReceiver:Compliment[];
    listComplimentsSend:Compliment[];
    getAllComplimentsSend:() => Promise<Compliment[]>;
    getAllComplimentsReceiver:() => Promise<Compliment[]>;

}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProviderProps{
    children:ReactNode;
}

export let DEFAULT_COMPLIMENT_DATA:Compliment = {
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
    const [ listComplimentsSend, setListComplimentsSend ] = useState<Compliment[]>(null)
    const [ listComplimentsReceiver, setListComplimentsReceiver ] = useState<Compliment[]>(null)
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()

    async function authenticate(data:Credentials):Promise<UserAuthenticated | any>{
        const response =  await login(data)
        const user = response.data as UserAuthenticated 
        if(user){
          storeToken(user.token)
          setUserAuthenticated(user)
          setListComplimentsSend(user.compliments.send)
          setListComplimentsReceiver(user.compliments.receive)
          localStorage.setItem('user', JSON.stringify(user))
        }
  }
  
    function logOut(){
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          setUserAuthenticated(DEFAULT_CONTEXT_DATA)
          navigate('/')
          
      }

      async function getAllComplimentsSend():Promise<Compliment[] | any>{
            const userUpdateId =  JSON.parse(localStorage.getItem('user')) as UserAuthenticated
            console.log(userUpdateId.user.id)

           await getComplimentsListSend(userUpdateId.user.id)
           .then((compliments:Compliment[]) =>{
                setListComplimentsSend(compliments)
           }) as Compliment[]
           

    }


    async function getAllComplimentsReceiver():Promise<Compliment[] | any>{
            const userUpdateId =  JSON.parse(localStorage.getItem('user')) as UserAuthenticated
            console.log(userUpdateId.user.id)
            
            const response = await getComplimentsListReceive(userUpdateId.user.id) as Compliment[]
            console.log(response)
            if(response){
                setListComplimentsReceiver(response)
            }

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
            listComplimentsSend,
            getAllComplimentsReceiver,
            getAllComplimentsSend
            }}>
            {children}
        </AuthContext.Provider>
    )

}