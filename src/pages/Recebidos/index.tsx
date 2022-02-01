import { useContext,  useEffect,  useState } from 'react'
import ListMessagesReceived from '../../components/ListMessagesReceived'
import MenuHamburguer from '../../components/MenuHamburguer'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import { AuthContext} from '../../context/AuthContext'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { TagDataContext } from '../../context/TagDataContext'
import { UserDataContext } from '../../context/UserDataContext'
import logo from '../../images/logo.svg'
import '../../styles/user-page.scss'
import { Loading } from '../Loading'

export function Recebidos(){

    const [searchText, setSearchText] = useState('');
    const { handleModalIsShownCompliments, complimentModalShown } = useContext(ModalIshownContext)
    const { users, getAllUsers } = useContext(UserDataContext)
    const { tags, getAllTags } = useContext(TagDataContext)
    const {userAuthenticated, listComplimentsReceiver, getAllComplimentsReceiver} = useContext(AuthContext)

    
    useEffect(()=>{
        getAllUsers()
        getAllComplimentsReceiver()
        getAllTags()
        console.log(users)
        console.log(tags)
        console.log(listComplimentsReceiver)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                }}>Lista de elogios recebidos</h1>
                 <div className="compliment-sender">
                    <div>
                        <input placeholder='pesquisar' onChange={(e)=> setSearchText(e.target.value)} value={searchText} type='text'/>
                    </div>
                    <span/>
                    {users && listComplimentsReceiver.length > 0  && tags ? <ListMessagesReceived arrayUsers={users} arrayComplimentsReceiver={listComplimentsReceiver} arrayTag={tags} searchText={searchText}/> : <div>Loading...</div>}
                </div>
            </div>
            <OverlayDismissModal onClick={handleModalIsShownCompliments} isShown={complimentModalShown}/>
        </div>
        </>
    ) 

}