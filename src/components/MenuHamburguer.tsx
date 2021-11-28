import { useContext } from 'react'
import menu from '../images/menu-hamburguer.svg'
import { SideMenuContext } from '../context/SideMenuContext'
import '../styles/user-page.scss';

export default function MenuHamburguer(){

    const { handleIsActive } = useContext(SideMenuContext)

    return(
        <div className="menu-logo">
                <img onClick={handleIsActive} src={menu} alt="menu"/>
        </div>
    )

}