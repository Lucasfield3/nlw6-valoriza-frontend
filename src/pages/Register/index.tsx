import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/logo.svg'
import { createUser, NewUser } from "../../service/User";


export function Register(){

    const { register, handleSubmit  } = useForm()
    const navigate = useNavigate()

  //var newUser:string | any = null;
   async function onSubmit(data:NewUser){

        const newUser = await createUser(data)
        if(newUser){
            console.log('user created')
            navigate('/')
        }

    }

    return(
        <div id='landing-page'>
        <header>
            <img src={logo} alt='logo'></img>
        </header>
        <div className="container">
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("name", { required: true })} placeholder='digite seu nome' type='text'/>
                <input {...register("email", { required: true })}  placeholder='digite seu email' type='email'/>
                <input  {...register("password", { required: true })} placeholder='digite sua senha' type='password'/>
                <button type='submit'>Criar conta</button>
            </form>
            <Link className='link' to='/' >Já tem conta?</Link>
        </div>
    </div>
    )

}
