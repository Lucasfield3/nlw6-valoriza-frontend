import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, NewCompliment} from '../../service/Compliment'
import plus from '../../images/plus.svg'
import { useContext,  useEffect,  useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModalTag } from '../../components/OverlayDismissModalTag'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { UserDataContext } from '../../context/UserDataContext'
import { TagDataContext } from '../../context/TagDataContext'

import '../../styles/user-page.scss'
import { useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { getPayload, PayLoad } from '../../service/Authenticate'



export function Home(){

    const {user, getAllUsers, users} = useContext(UserDataContext)
    const { tags, } = useContext(TagDataContext)
    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
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
            }else{
                console.log("Nothing to return");
            }
    }

    const { loggedIn } = useAuth()
    const payLoad = getPayload() as PayLoad
    function isLoggedIn(){
        if(payLoad === undefined){
            if(loggedIn === false){
              return navigate('/')
            }
        }
    }
    useEffect(()=>{    
        getAllUsers()
        isLoggedIn() 
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

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
                <h1>Envio de elogios</h1>
                <form>
                   
                    <div className="compliment-sender">
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <div key='users' className='custom-select'>
                                <p>Para:</p>
                                <select value={user_receiver} onChange={(e) => setUser_receiver(e.target.value)} onClick={()=> setIsFirtsOptionShown(false)}>
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
                                                <option onClick={()=> setIsTagShown(false)} value={tag.name} key={index}>{tag.name}</option>
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
            <OverlayDismissModalTag onClick={handleModalIsShown} isShown={isShown}/>
            <button onClick={handleModalIsShown} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>
        </div> 
        </>
    )

}
