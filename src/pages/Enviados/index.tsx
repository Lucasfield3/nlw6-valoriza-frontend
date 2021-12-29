
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import ListMessages from '../../components/ListMessages'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import { getToken } from '../../service/Authenticate'
import { getUser, User } from '../../service/User'
import '../../styles/user-page.scss'

export function Enviados(){

    const navigate = useNavigate()

    const { user, users } = useContext(UserDataContext)

    async function handleIsLoggedHome(){
        const sendToken = getToken()
        if(sendToken === undefined){
            return navigate('/')
        } 
        
    }

    useEffect(()=>{
        //handleIsLoggedHome()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
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
                }}>Lista de elogios enviados</h1>
                <div className="compliment-sender">
                    <div>
                        <input placeholder='pesquisar' type='text'/>
                    </div>
                    <span/>
                    <ListMessages/>
                </div>
            </div>
        </div>
        </>
    )

}