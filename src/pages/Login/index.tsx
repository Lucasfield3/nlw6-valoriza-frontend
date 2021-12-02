import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { login, storeToken } from '../../service/Authenticate'

export function Login(){

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const navigate = useNavigate()
    var access_token:string | any = null;
    async function handleSubmit(e:FormEvent){
        e.preventDefault()
        try {
            access_token = await login({email, password})
            if(access_token){
                storeToken(access_token)
                navigate('/home')
            }
            
        } catch (error) {
            console.log(error)
        }
    
    }

    return(
        <div id='landing-page'>
            <header>
                <img src={logo} alt='logo'></img>
            </header>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='digite seu email' type='email'/>
                <input value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='digite sua senha' type='password'/>
                    <button type='submit'>Entrar</button>
                </form>
                <Link className='link' to='/register' >Não tem conta ainda?</Link>
            </div>
        </div>
    )

}
