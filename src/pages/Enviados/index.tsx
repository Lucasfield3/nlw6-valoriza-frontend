
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismiss from '../../components/OverlayDismiss'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'

export function Enviados(){

    return(
        <div id="user-page">
            <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismiss/>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1>Lista de elogios enviados</h1>
                <div className="compliment-sender">
                    <div>
                        <input placeholder='pesquisar' type='text'/>
                    </div>
                    <span/>
                    <textarea placeholder='Menssagem..' rows={7} cols={28}/>
                </div>
            </div>
        </div>
    )

}