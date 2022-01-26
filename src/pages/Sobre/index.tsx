
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import Carousel from 'react-elastic-carousel';
import '../../styles/user-page.scss'
import sobre from '../../sobre.json'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { UserDataContext } from '../../context/UserDataContext';
import { getToken } from '../../service/Authenticate';
import { AuthContext } from '../../context/AuthContext';

export function Sobre(){
    const navigate = useNavigate()

    const {userAuthenticated} = useContext(AuthContext)
    

    // function handleIsLoggedHome(){
    //     const sendToken = getToken()
    //     if(sendToken === undefined){
    //         return navigate('/')
    //     } 
        
    // }

    // useEffect(()=>{
    //     handleIsLoggedHome()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    const breakPoints = [
        {width: 1, itemsToShow:1}
      ]
      

    return(
        <div id="user-page">
            <SideMenu userName={userAuthenticated && userAuthenticated.user.name}/>
            <MenuHamburguer/>
            <OverlayDismissSideMenu/>
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