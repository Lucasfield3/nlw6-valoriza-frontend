import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/logo.svg'
import { createUser } from "../../service/User";


export function Register(){

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

  var newUser:string | any = null;
   async function handleSubmit(e:FormEvent){
        e.preventDefault()
        try{
            newUser = await createUser({name, email, password})
            if(newUser !== null){
                navigate('/')
            }
        }catch(err){
            console.log(err);
        }

    }

    return(
        <div id='landing-page'>
        <header>
            <img src={logo} alt='logo'></img>
        </header>
        <div className="container">
            <h1>Cadastro</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input value={name} onChange={(e)=> setName(e.target.value)} placeholder='digite seu nome' type='text'/>
                <input value={email} onChange={(e)=> setEmail(e.target.value)}  placeholder='digite seu email' type='email'/>
                <input value={password} onChange={(e)=> setPassword(e.target.value)}  placeholder='digite sua senha' type='password'/>
                <button type='submit'>Criar conta</button>
            </form>
            <Link className='link' to='/' >Já tem conta?</Link>
        </div>
    </div>
    )

}
