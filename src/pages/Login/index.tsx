import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { Credentials, } from '../../service/Authenticate'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { Loading } from '../Loading'
import { getUsers, User } from '../../service/User'
import { compare } from 'bcryptjs'

export function Login(){
    const { register, handleSubmit, formState:{errors}  } = useForm()
    const { authenticate, handleLoading, loading } = useContext(AuthContext)
    const [ errorMsg, setErrorMsg ] = useState('')
    
    const navigate = useNavigate()
    
    async function onSubmit(data:Credentials){

        const users = await getUsers() as User[]
        let validPassword:null | boolean

        users.map(async user =>{
            compare(data.password, user.password, async (err ,success:boolean)=>{
               
                while(err){
                    return 
                } 
                
                if(success && user.email === data.email){
                    validPassword = true
                    console.log(validPassword)
                    setErrorMsg('')
                    handleLoading(true)
                    await authenticate(data)
                    if(localStorage.getItem('user')){
                        navigate('/user/myHome')
                        handleLoading(false)
                    }   
                    
                }else{
                    handleLoading(false)
                    return setTimeout(()=>setErrorMsg('Email/Senha incorreto/s'), 200)
                }              

            })

        })
 
    }

    const errorMsgEmail = errors.email?.type === 'required' ? 'Email inválido' : 'digite seu email'
    const errorMsgPassword = errors.password?.type === 'required' ? 'Senha inválida' : 'digite sua senha'

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
                <input className={errors.email?.type === 'required' && `input-error`} {...register("email", { required: true })}  placeholder={errorMsgEmail} type='email'/>
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
