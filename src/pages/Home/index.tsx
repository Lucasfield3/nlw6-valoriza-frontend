//import { Link } from 'react-router-dom'
import logo from '../../images/logo.svg'
import menu from '../../images/menu-hamburguer.svg'
import '../../styles/user-page.scss'

export function Home(){

    return(
        <div id="user-page">
            <div className="menu-logo">
                <img src={menu} alt="menu"/>
            </div>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1>Envio de elogios</h1>
                <div className="compliment-sender">
                    <div>
                        <p>Para:</p>
                        <input placeholder='email' type='email'/>
                    </div>
                    <span/>
                    <textarea placeholder='Menssagem..' rows={7} cols={28}/>
                </div>
                {/* <Link className='link' to='/register' >Não tem conta ainda?</Link> */}
                <button >Enviar elogio</button>
            </div>
        </div>
    )

}