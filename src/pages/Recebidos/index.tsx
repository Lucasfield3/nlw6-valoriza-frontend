import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import ListMessages from '../../components/ListMessages'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { AuthenticateContext } from '../../context/AuthenticateContext'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'

export function Recebidos(){

    const { handleIsLogged } = useContext(AuthenticateContext)
    const navigate = useNavigate()

    const { user } = useContext(UserDataContext)

    useEffect(()=>{
        handleIsLogged(navigate)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <div id="user-page">
           <SideMenu userName={user && user.name}/>
            <MenuHamburguer/>
            <OverlayDismissSideMenu/>
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