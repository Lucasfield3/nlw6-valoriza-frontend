import { useContext,  useEffect,  useState } from 'react'
import ListMessagesSended from '../../components/ListMessagesSended'
import MenuHamburguer from '../../components/MenuHamburguer'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { AuthContext, DEFAULT_COMPLIMENT_DATA } from '../../context/AuthContext'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { TagDataContext } from '../../context/TagDataContext'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'
import { Loading } from '../Loading'

export function Enviados(){

    const [searchText, setSearchText] = useState('');
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
    const {userAuthenticated, listComplimentsSend, getAllComplimentsSend} = useContext(AuthContext)
    const { users, getAllUsers } = useContext(UserDataContext)
    const { tags, getAllTags } = useContext(TagDataContext)
    
    useEffect(()=>{
        getAllUsers()
        getAllTags()
        getAllComplimentsSend()
        console.log(users)
    },[])


    return(
        <>
          <div id="user-page">
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
                }}>Lista de elogios enviados</h1>
                <div className="compliment-sender">
                    <div>
                        <input placeholder='pesquisar' onChange={(e)=> setSearchText(e.target.value)} value={searchText} type='text'/>
                    </div>
                    <span/>
                    {users && listComplimentsSend && tags ? <ListMessagesSended arrayUsers={users} arrayTag={tags} arrayComplimentsSend={listComplimentsSend} searchText={searchText}/> : <div>Loading</div>}
                </div>
            </div>
            <OverlayDismissModal onClick={handleModalIsShownCompliments} isShown={complimentModalShown}/>
        </div>
        </>
    )

}