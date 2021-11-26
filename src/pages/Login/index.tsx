import '../../styles/landing-pages.scss'
import logo from '../../images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'

export function Login(){

    const navigate = useNavigate()

    return(
        <div id='landing-page'>
            <header>
                <img src={logo} alt='logo'></img>
            </header>
            <div className="container">
                <h1>Login</h1>
                <form>
                    <input placeholder='digite seu email' type='email'/>
                    <input placeholder='digite sua senha' type='password'/>
                    <button onClick={()=> navigate('/home')} type='submit'>Entrar</button>
                </form>
                <Link className='link' to='/register' >Não tem conta ainda?</Link>
            </div>
        </div>
    )

}
