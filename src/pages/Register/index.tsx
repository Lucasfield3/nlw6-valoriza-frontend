import { Link } from "react-router-dom";
import logo from '../../images/logo.svg'


export function Register(){

    return(
        <div id='landing-page'>
        <header>
            <img src={logo} alt='logo'></img>
        </header>
        <div className="container">
            <h1>Cadastro</h1>
            <form>
                <input placeholder='digite seu nome' type='text'/>
                <input placeholder='digite seu email' type='email'/>
                <input placeholder='digite sua senha' type='password'/>
                <button type='submit'>Criar conta</button>
            </form>
            <Link className='link' to='/' >Já tem conta?</Link>
        </div>
    </div>
    )

}
