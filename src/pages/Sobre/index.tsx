
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismiss from '../../components/OverlayDismiss'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import Carousel from 'react-elastic-carousel';
import '../../styles/user-page.scss'
import sobre from '../../sobre.json'

export function Sobre(){


    const breakPoints = [
        {width: 1, itemsToShow:1}
      ]
      

    return(
        <div id="user-page">
            <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismiss/>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1>Sobre o app</h1>
                <div className="list-textos">
                <Carousel isRTL={false} breakPoints={breakPoints}>
                    <p className="textos"> {sobre.texto1.texto}</p>
                    <p className="textos"> {sobre.texto2.texto}</p>
                    <p className="textos"> {sobre.texto3.texto}</p>
                </Carousel>
                </div>
            </div>
        </div>
    )

}