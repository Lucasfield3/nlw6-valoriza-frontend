import { useEffect } from 'react';
import { Navigate} from 'react-router';
import { useAuth } from '../../context/AuthContext';

import { getPayload, PayLoad } from '../../service/Authenticate';
export function Error(){
    const { loggedIn } = useAuth()
    const payLoad = getPayload() as PayLoad
    function isLoggedIn(){
        if(payLoad === undefined){
            if(loggedIn === false){
              return <Navigate to='/'/>
            }
        }else{
            return <Navigate to='/user/myHome'/>
        }
    }

    useEffect(()=>{
        isLoggedIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <>
            <div style={{width:'100vw', height:'100vh', background:'white', display:'flex', justifyContent:'center', alignContent:'center'}}>
                <h1>Loading...</h1>
            </div>
        </>
    )
}