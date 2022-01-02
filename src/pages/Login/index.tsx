import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'


import { login, storeToken } from '../../service/Authenticate'
import {  User } from '../../service/User'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { UserDataContext } from '../../context/UserDataContext'

export function Login(){
    const { register, handleSubmit  } = useForm()
    const { getAllUsers, getOneUser} = useContext(UserDataContext)
    const navigate = useNavigate()
    async function onSubmit(data:User){
        var access_token:string | any = null;
            await login(data)
            .then((dataLogin:string) => {
                if(dataLogin){
                access_token = dataLogin
                storeToken(access_token) 
                    if(access_token){
                        getAllUsers()
                        getOneUser()
                        setTimeout(()=>navigate(`/user/myHome/`), 500)
                        window.location.reload()
                    }
                }
            })
        
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
