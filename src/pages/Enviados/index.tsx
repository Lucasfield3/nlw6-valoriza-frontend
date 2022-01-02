import { useContext, useEffect, useState } from 'react'
import ListMessagesSended from '../../components/ListMessagesSended'
import MenuHamburguer from '../../components/MenuHamburguer'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'

export function Enviados(){

    const [searchText, setSearchText] = useState('');
    const { user, users } = useContext(UserDataContext)
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)

    useEffect(()=>{
        //handleIsLoggedHome()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        {users && <div id="user-page">
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
                        <input placeholder='pesquisar' onChange={(e)=> setSearchText(e.target.value)} value={searchText} type='text'/>
                    </div>
                    <span/>
                    <ListMessagesSended searchText={searchText}/>
                </div>
            </div>
            <OverlayDismissModal onClick={handleModalIsShownCompliments} isShown={complimentModalShown}/>
        </div>}

        </>
    )

}