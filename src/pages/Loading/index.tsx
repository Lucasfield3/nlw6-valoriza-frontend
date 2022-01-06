import { useEffect } from 'react';
import { Navigate} from 'react-router';

import { getPayload, PayLoad } from '../../service/Authenticate';
export function Loading(){
    const payLoad = getPayload() as PayLoad



    return(
        <>
            <div style={{width:'100vw', height:'100vh', background:'white', display:'flex', justifyContent:'center', alignContent:'center'}}>
                <h1>Loading...</h1>
            </div>
        </>
    )
}