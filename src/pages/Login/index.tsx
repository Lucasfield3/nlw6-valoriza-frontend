import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Credentials, } from '../../service/Authenticate'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export function Login(){
    const { register, handleSubmit  } = useForm()
    const { authenticate } = useContext(AuthContext)
    
    const navigate = useNavigate()
    
    async function onSubmit(data:Credentials){
        
        await authenticate(data)
        if(localStorage.getItem('user')){
            setTimeout(()=>navigate('/user/myHome'), 500)
        }   
    }


    return(
        <div id='landing-page'>
            <header>
                <img src={logo} alt='logo'></img>
            </header>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email", { required: true })}  placeholder='digite seu email' type='email'/>
                <input  {...register("password", { required: true })} placeholder='digite sua senha' type='password'/>
                    <button type='submit'>Entrar</button>
                </form>
                <Link className='link' to='/register' >Não tem conta ainda?</Link>
            </div>
        </div>
    )

}
