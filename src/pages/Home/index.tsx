import { useForm } from 'react-hook-form'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, NewCompliment } from '../../service/Compliment'
import plus from '../../images/plus.svg'

import '../../styles/user-page.scss'
import { useContext, useEffect, useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModalTag } from '../../components/OverlayDismissModalTag'
import { ModalIshownContext } from '../../context/ModalIsShownContext'
import { getUsers, User } from '../../service/User'

export function Home(){

    //const { register, handleSubmit } = useForm()

    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
    const [ isFirstOptionShown, setIsFirtsOptionShown] = useState(true)
    const [users, setUsers] = useState<User[]>()
    const [user_receiver, setUser_receiver] = useState('')
    const [tag_id, setTag_id] = useState('new tag')
    const [message, setMessage] = useState('')

    var data:NewCompliment | any = null;
    const handleCreateCompliment = async () => {

        data = await createCompliment({user_receiver, message, tag_id})
        if(data){
            
            console.log('compliment created')
        }else{
            throw new Error("Nothing to return");
        }

    }

    async function getAllUsers(){
        const userSend = await getUsers()
        if(userSend){
            setUsers(userSend)
        }
    }

    console.log(user_receiver)

    useEffect(()=>{
       getAllUsers()
    },[])

    return(
        <div id="user-page">
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
                        <div>
                            <p>Para:</p>
                            <div className='custom-select'>
                                <select value={user_receiver} onChange={(e) => setUser_receiver(e.target.value)} onClick={()=> setIsFirtsOptionShown(false)} name="emails" id="emails">
                                   {isFirstOptionShown && <option key={users && users.length + 1}>usuários</option> }
                                    {users && users.map((user, index)=> {
                                    return (
                                        <>
                                            <option key={index}  value={user.email}>{user.email}</option>                                 
                                        </>
                                        )
                                    })}
                                </select>
                             </div> 
                            {/* <input {...register("user_receiver", { required: true, maxLength: 40 })} placeholder='email' type='email'/> */}
                        </div>
                        <span/>
                        <textarea value={message} onChange={(e)=> setMessage(e.target.value)} placeholder='Menssagem..' rows={7} cols={28}/>
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