import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismiss from '../../components/OverlayDismiss'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'

import '../../styles/user-page.scss'

export function Home(){


    return(
        <div id="user-page">
            <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismiss/>
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
                <button >Enviar elogio</button>
            </div>
        </div>
    )

}