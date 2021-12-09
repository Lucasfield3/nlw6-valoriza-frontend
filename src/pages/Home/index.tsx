
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, getTags, NewCompliment, Tag } from '../../service/Compliment'
import plus from '../../images/plus.svg'

import '../../styles/user-page.scss'
import { ChangeEvent, useContext,  useEffect,  useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModalTag } from '../../components/OverlayDismissModalTag'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { UserDataContext } from '../../context/UserDataContext'
import { TagDataContext } from '../../context/TagDataContext'

export function Home(){

    //const { register, handleSubmit } = useForm()
    const { users, getAllUsers, user } = useContext(UserDataContext)
    //const { tags, getAllTags } = useContext(TagDataContext)
    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
    const [ isFirstOptionShown, setIsFirtsOptionShown] = useState(true)
    const [user_receiver, setUser_receiver] = useState('')
    const [tag_id, setTag_id] = useState('')
    const [message, setMessage] = useState('')
    const [ tags, setTags] = useState<Tag[]>()


    async function getAllTags(){

        const tagsSend = await getTags()
        if(tagsSend){
            setTags(tags)
            console.log(tags)
        }

    }

    var data:NewCompliment | any = null;
    const handleCreateCompliment = async () => {
       const [,  messageSend] = message.split(`${tag_id}`)
       console.log(messageSend)
        let tagId:string = '';
        if(tags){
            tags.map((tag)=>{
                if(tag_id === tag.custom_name){
                    tagId = tag.id
                    console.log(tag.id)
                }
                return tag.id
            })

        }

        data = await createCompliment({user_receiver, message:messageSend.trim(), tag_id:tagId})
        if(data){
            
            console.log('compliment created')
        }else{
            throw new Error("Nothing to return");
        }

    }

    useEffect(()=>{
        getAllTags()
        getAllUsers()
        console.log(tags)
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

     function handleSetTag(e:ChangeEvent<HTMLTextAreaElement>){
        if(e.target.value.match('#') && !e.target.value.match(' ')){
            setTag_id(e.target.value)
            console.log(tag_id)
        }

        setMessage(e.target.value)

     }
 

   



    return(
        <div id="user-page">
            <SideMenu/>
            <MenuHamburguer/>
            <OverlayDismissSideMenu/>
            <header>
                <img src={logo} alt='logo'/>
            </header>
            <div className="container">
                <h1>Envio de elogios {tags && tags[1].name}</h1>
                <form>
                   
                    <div className="compliment-sender">
                        <div>
                            <p>Para:</p>
                            <div className='custom-select'>
                                <select value={user_receiver} onChange={(e) => setUser_receiver(e.target.value)} onClick={()=> setIsFirtsOptionShown(false)}>
                                   {isFirstOptionShown && <option key={users && users.length + 1}>usuários</option> }
                                    {users && users.map((userEmail, index)=> {
                                    return (
                                        <>
                                            {userEmail.email !== user.email && <option key={index}  value={userEmail.id}>{userEmail.email}</option>}                                 
                                        </>
                                        )
                                    })}
                                </select>
                             </div> 
                            {/* <input {...register("user_receiver", { required: true, maxLength: 40 })} placeholder='email' type='email'/> */}
                        </div>
                        <span/>
                        <textarea value={message} onChange={(e)=> handleSetTag(e)} placeholder='Menssagem..' rows={7} cols={28}/>
                    </div>
                </form>
                <button onClick={handleCreateCompliment} >Enviar elogio</button>
            </div>
            <CreateTagModal/>
            <OverlayDismissModalTag onClick={handleModalIsShown} isShown={isShown}/>
            <button onClick={handleModalIsShown} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>
        </div>
    )

}
