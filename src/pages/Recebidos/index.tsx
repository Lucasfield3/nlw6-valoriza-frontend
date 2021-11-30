import ListMessages from '../../components/ListMessages'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismiss from '../../components/OverlayDismiss'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'

export function Recebidos(){

    return(
        <div id="user-page">
            <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismiss/>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1 style={{
                    textAlign: 'center',
                    height:'auto',
                    width:'26rem'
                }}>Lista de elogios recebidos</h1>
                <div className="compliment-sender">
                    <div>
                        <input placeholder='pesquisar' type='text'/>
                    </div>
                    <span/>
                    <ListMessages/>
                </div>
            </div>
        </div>
    )

}