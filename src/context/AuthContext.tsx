import { createContext, ReactNode, useEffect, useState } from "react" ;
import { useNavigate } from "react-router-dom";
import { Credentials, login, storeToken, UserAuthenticated} from "../service/Authenticate";
import { Compliment, getComplimentsListReceive, getComplimentsListSend } from "../service/Compliment";
import https from "../utils/https";


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
    const [ listComplimentsSend, setListComplimentsSend ] = useState<Compliment[]>([])
    const [ listComplimentsReceiver, setListComplimentsReceiver ] = useState<Compliment[]>([])
    const [ loading, setLoading ] = useState(true)
    const navigate = useNavigate()

    async function authenticate(credentials: Credentials):Promise<UserAuthenticated | any>{

        console.log(credentials);
        var access_token:string | any = null;
        return await https
        .post<UserAuthenticated>('/login', credentials)
        .then((res)=>{
            access_token = res.data.token
            storeToken(access_token)
            setUserAuthenticated(res.data)
            setListComplimentsSend(res.data.compliments.send)
            setListComplimentsReceiver(res.data.compliments.receive)
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(listComplimentsSend, listComplimentsReceiver)
        }).catch(err => console.log(err))
        
    }
  
    function logOut(){
          localStorage.removeItem('user')
          localStorage.removeItem('access_token')
          setUserAuthenticated(null)
          navigate('/')
          
      }

    async function getAllComplimentsSend():Promise<Compliment[] | any>{

        return await https
        .get<Compliment[]>(`/user/compliments/send/${userAuthenticated.user.id}`)
        .then((res)=> {
            setListComplimentsSend(res.data)
        })
        .catch(err => console.log(err))
        
    }


    async function getAllComplimentsReceiver():Promise<Compliment[] | any>{

        return await https
        .get<Compliment[]>(`/user/compliments/receive/${userAuthenticated.user.id}`)
        .then((res)=> {
            setListComplimentsReceiver(res.data)
        })
        .catch(err => console.log(err))
        
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