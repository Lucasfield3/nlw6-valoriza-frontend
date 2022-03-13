import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import logo from '../../images/logo.svg'
export function Loading(){

    const { loading } = useContext(AuthContext)

    return(
        <>
           {loading && <div style={{width:'100vw', height:'100vh', background:'var(--gray-blued)', display:'flex', justifyContent:'center', alignContent:'center'}}>
                <img style={{width:'20rem'}} src={logo} alt='logo'></img>
            </div>}
        </>
    )
}