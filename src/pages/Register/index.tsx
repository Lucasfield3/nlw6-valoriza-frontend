import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import logo from '../../images/logo.svg'
import { createUser, NewUser } from "../../service/User";


export function Register(){

    const { register, handleSubmit, formState:{errors}  } = useForm()
    const navigate = useNavigate()
    const [ isModalComplimentShown, setIsModalComplimentShown] = useState(false)

  //var newUser:string | any = null;
   async function onSubmit(data:NewUser){

        const newUser = await createUser(data)
       
        if(newUser){
            setIsModalComplimentShown(true)
            navigate('/')
        }

    }

    const errorMsgEmail = errors.email?.type === 'required' ? 'Email inválido' : 'digite seu email'
    const errorMsgPassword = errors.password?.type === 'required' ? 'Senha inválida' : 'digite sua senha'
    const errorMsgName = errors.name?.type === 'required' ? 'Nome inválido' : 'digite seu nome'

    useEffect(()=>{
        setTimeout(()=> setIsModalComplimentShown(false), 2000)
    },[isModalComplimentShown])

    return(
        <div id='landing-page'>
        <header className='header-register'>
            <span></span>
            <img src={logo} alt='logo'></img>
             <Modal isValid={true} frase='Usuário criado!' isModalShown={true} />
        </header>
        <div className="container">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className={errors.email?.type === 'required' && `input-error`} {...register("name", { required: true })} placeholder={errorMsgName} type='text'/>
                <input className={errors.password?.type === 'required' && `input-error`} {...register("email", { required: true })}  placeholder={errorMsgEmail} type='email'/>
                <input className={errors.name?.type === 'required' && `input-error`}  {...register("password", { required: true })} placeholder={errorMsgPassword} type='password'/>
                <button type='submit'>Criar conta</button>
            </form>
            <Link className='link' to='/' >Já tem conta?</Link>
        </div>
    </div>
    )

}
