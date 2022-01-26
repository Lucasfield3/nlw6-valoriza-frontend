import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, NewCompliment} from '../../service/Compliment'
import plus from '../../images/plus.svg'
import { useContext,  useEffect,  useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { UserDataContext } from '../../context/UserDataContext'
import { TagDataContext } from '../../context/TagDataContext'

import '../../styles/user-page.scss'
import { Navigate, useNavigate } from 'react-router'
import { getPayload, PayLoad } from '../../service/Authenticate'
import { ListsComplimetsContext } from '../../context/ListsComplimets'
import { AuthContext } from '../../context/AuthContext'
import { Loading } from '../Loading'




export function Home(){

    const { getAllUsers, users} = useContext(UserDataContext)
    const {userAuthenticated, authenticated} = useContext(AuthContext)
    const { tags, getAllTags} = useContext(TagDataContext)
    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
    const { getAllComplimentsSend, getAllComplimentsReceiver } = useContext(ListsComplimetsContext)
    const [ isFirstOptionShown, setIsFirtsOptionShown] = useState(true)
    const [user_receiver, setUser_receiver] = useState('')
    const [tag_id, setTag_id] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const [ , setIsTagShown ] = useState(false)
    var data:NewCompliment | any = null;

    const handleCreateCompliment = async () => {
        let tagId = ''

            tags.map((tag)=>{
                if(tag_id === tag.name){
                    tagId = tag.id
                }
                return tag.id
            })
            data = await createCompliment({user_receiver, message, tag_id:tagId})

            if(data){
                console.log('compliment created')
                getAllComplimentsSend()
            }else{
                console.log("Nothing to return");
            }
    }

   // const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
   if(userAuthenticated === null){
    console.log('not authenticated')
    return <Navigate to='/'/>
    }
  
    return(
        <>
      {userAuthenticated &&  <div id="user-page">
           <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismissSideMenu/>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1>Envio de elogios</h1>
                <form>
                   
                    <div className="compliment-sender">
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div key='users' className='custom-select'>
                                <p>Para:</p>
                                <select onFocus={()=> {
                                    document.getElementById('custom-select').setAttribute('size', '4')
                                    document.getElementById('custom-select').setAttribute('position', 'absolute')
                                    document.getElementById('custom-select').setAttribute('z-index', '100')
                                }} id='custom-select' onBlur={()=>{
                                    document.getElementById('custom-select').setAttribute('size', '1')
                                }} value={user_receiver} onChange={(e) => {
                                    setUser_receiver(e.target.value)
                                    document.getElementById('custom-select').setAttribute('size', '1')
                                    document.getElementById('custom-select').blur()
                                    }} onClick={()=> setIsFirtsOptionShown(false)}>
                                {isFirstOptionShown && <option key={users && users.length + 1}>usuários</option> }
                                    {users && users.map((userEmail, index)=> {
                                    return (
                                        <>
                                            <option key={users.length}  value={userEmail.id}>{userEmail.email}</option>                                
                                        </>
                                        )
                                    })}
                                </select>
                             </div> 
                             <span/>
                            <div key='tag' className='custom-select'>
                                <p>Tags:</p>
                             <select  onChange={(e) => setTag_id(e.target.value)} value={tag_id}>
                                <option key={tags && tags.length + 1}>tags</option>
                                    {tags && tags.map((tag, index)=>{
                                        return (
                                            <>
                                                <option onClick={()=> {
                                                    setIsTagShown(false)
                                                    console.log(tag.id)
                                                    }} value={tag.name} key={index}>{tag.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                             </div> 
                             <span/>
                        </div>
                        
                        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} placeholder='Menssagem..' rows={7} cols={28}>
                        </textarea>
                    </div>
                </form>
                <button onClick={handleCreateCompliment} >Enviar elogio</button>
            </div>
            <CreateTagModal/>
            <OverlayDismissModal onClick={handleModalIsShown} isShown={isShown}/>
            <button onClick={handleModalIsShown} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>
        </div>}
        </>
    )

}
