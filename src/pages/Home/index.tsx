import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment} from '../../service/Compliment'
import plus from '../../images/plus.svg'
import { useContext,  useEffect,  useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModal } from '../../components/OverlayDismissModal'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { UserDataContext } from '../../context/UserDataContext'
import { TagDataContext } from '../../context/TagDataContext'

import '../../styles/user-page.scss'
import { AuthContext, DEFAULT_CONTEXT_DATA } from '../../context/AuthContext'
import { ModalCreatedCompliment } from '../../components/ModalCreatedCompliment'
import { SideMenuContext } from '../../context/SideMenuContext'
import { getPayload, getToken } from '../../service/Authenticate'





export function Home(){

    const { users, getAllUsers} = useContext(UserDataContext)
    const {userAuthenticated, getAllComplimentsSend} = useContext(AuthContext)
    const { tags, getAllTags} = useContext(TagDataContext)
    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
    //const [ setIsFirtsOptionShown] = useState(true)
    const [user_receiver, setUser_receiver] = useState('')
    const [tag_id, setTag_id] = useState('')
    const [message, setMessage] = useState('')
    const [ , setIsTagShown ] = useState(false)
    const [ isModalComplimentShown, setIsModalComplimentShown] = useState(false)
    const { isActive} = useContext(SideMenuContext)
    
    const [isValid , setIsValid] = useState(false)

    const handleCreateCompliment = async () => {
        let tagId = ''
        tags.map((tag)=>{
            if(tag_id === tag.name){
                tagId = tag.id
            }
            return tag.id
        })
      

        if(isValid === true){
            const compliment =  await createCompliment({user_receiver, message, tag_id:tagId})
            if(compliment){
                console.log('created')
                setTimeout(()=> getAllComplimentsSend(), 500)
                setIsModalComplimentShown(true)
            }
             
         }
 

        if(isValid === false){
            console.log('invalid')   
            setIsModalComplimentShown(true)
            
        }
       
    }


    useEffect(()=>{
        const token =  getToken()
        console.log(message)
        if(token){
            getAllUsers()
            getAllTags()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    useEffect(()=>{
        setTimeout(()=> setIsModalComplimentShown(false), 2000)
    }, [isModalComplimentShown])

  useEffect(()=>{
    console.log(isValid)
        if(tag_id === 'tags' || user_receiver === 'usuários' || message.length === 0){
            return setIsValid(false)
        }else if(tag_id === 'tags' || user_receiver === 'usuários'){
            return setIsValid(false)
        }else if(user_receiver === 'usuários' || message.length === 0){
            return setIsValid(false)
        }else if(tag_id === 'tags' || message.length === 0){
            return setIsValid(false)
        }else{
            return setIsValid(true)
        }
  }, [user_receiver, tag_id, message, isValid])

    return(
        <>
      <div id="user-page">
           <SideMenu/>
            {isActive && <OverlayDismissSideMenu/>}
            <div className="head">
                <MenuHamburguer/>
                <ModalCreatedCompliment isValid={isValid} isModalShown={isModalComplimentShown} />
            </div>
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
                                <select id='custom-select' value={user_receiver} onChange={(e) => setUser_receiver(e.target.value)}>
                                <option key={users && users.length + 1}>usuários</option> 
                                    {users && users.map((userEmail, index)=> {
                                    return (
                                        <>
                                            {userAuthenticated.user.id !== userEmail.id &&  <option key={index}  value={userEmail.id}>{userEmail.email}</option>}                           
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
                        
                        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} placeholder={ 'Menssagem..'} rows={7} cols={28}/>
                       
                    </div>
                </form>
                <button onClick={handleCreateCompliment} >Enviar elogio</button>
            </div>
            <CreateTagModal/>
            <OverlayDismissModal onClick={handleModalIsShown} isShown={isShown}/>
            {userAuthenticated.user.admin === true &&  <button onClick={handleModalIsShown} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>}
        </div>
        </>
    )

}
