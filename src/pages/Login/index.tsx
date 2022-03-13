import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Credentials, } from '../../service/Authenticate'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Loading } from '../Loading'

export function Login(){
    const { register, handleSubmit, formState:{errors}  } = useForm()
    const { authenticate, handleLoading, loading } = useContext(AuthContext)
    const [ errorMsg, setErrorMsg ] = useState('')
    
    const navigate = useNavigate()
    
    async function onSubmit(data:Credentials){

        console.log(errors.email);
        handleLoading(true)
        try {
            await authenticate(data)
            if(localStorage.getItem('user')){
                setTimeout(()=>{
                    handleLoading(false)
                    navigate('/user/myHome')
                }, 500)
                
            }   
        } catch (error) {
            handleLoading(false)
            return setErrorMsg('Email/senha inválido')
        }
        
    }

    const errorMsgEmail = errors.email?.type === 'required' ? 'Email inválido' : 'digite seu email'
    const errorMsgPassword = errors.password?.type === 'required' ? 'Senha inválida' : 'digite seu email'

    return(
        <>
        {loading ? <Loading/> : 
        
        <div id='landing-page'>
            
            <header>
                <img src={logo} alt='logo'></img>
            </header>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <input onChange={()=> setErrorMsg('')} className={errors.email?.type === 'required' && `input-error`} {...register("email", { required: true })}  placeholder={errorMsgEmail} type='email'/>
                <p style={{color:'red'}}>{errorMsg}</p>
                <input className={errors.password?.type === 'required' && `input-error`} {...register("password", { required: true })} placeholder={errorMsgPassword} type='password'/>
                    <button type='submit'>Entrar</button>
                </form>
                <Link className='link' to='/register' >Não tem conta ainda?</Link>
            </div>
        </div>}
        </>
    )

}
