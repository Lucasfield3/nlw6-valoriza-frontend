import { useContext, useEffect, useState } from 'react'
import ListMessagesReceived from '../../components/ListMessagesReceived'
import MenuHamburguer from '../../components/MenuHamburguer'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { AuthContext } from '../../context/AuthContext'
import { ListsComplimetsContext } from '../../context/ListsComplimets'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { TagDataContext } from '../../context/TagDataContext'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'

export function Recebidos(){

    const [searchText, setSearchText] = useState('');
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
    const { listComplimentsReceiver, getAllComplimentsReceiver } = useContext(ListsComplimetsContext)
    const { getAllUsers} = useContext(UserDataContext)
    const {userAuthenticated} = useContext(AuthContext)
    const {  getAllTags} = useContext(TagDataContext)


    useEffect(()=>{
        getAllUsers()
        getAllComplimentsReceiver()
        getAllTags()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
        {listComplimentsReceiver && <div id="user-page">
           <SideMenu userName={userAuthenticated && userAuthenticated.user.name}/>
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
                        <input placeholder='pesquisar' onChange={(e)=> setSearchText(e.target.value)} value={searchText} type='text'/>
                    </div>
                    <span/>
                    <ListMessagesReceived searchText={searchText}/>
                </div>
            </div>
            <OverlayDismissModal onClick={handleModalIsShownCompliments} isShown={complimentModalShown}/>
        </div>}
        </>
    )

}