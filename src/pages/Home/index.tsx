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

    const { register, handleSubmit } = useForm()

    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)
    const [ isFirstOptionShown, setIsFirtsOptionShown] = useState(true)
    const [users, setUsers] = useState<User[]>()

    const onSubmit = async (data:NewCompliment) => {

        if(data){
            await createCompliment(data)
            console.log(data)
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

    console.log(isFirstOptionShown)

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
                <form autoComplete='on' onSubmit={handleSubmit(onSubmit)}>
                   
                    <div className="compliment-sender">
                        <div>
                            <p>Para:</p>
                            <div className='custom-select'>
                                <select {...register("user_receiver")} onClick={()=> setIsFirtsOptionShown(false)} name="emails" id="emails">
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
                        <textarea {...register("message", { required: true, maxLength: 500 })} placeholder='Menssagem..' rows={7} cols={28}/>
                    </div>
                <button type='submit' >Enviar elogio</button>
                </form>
            </div>
            <CreateTagModal/>
            <OverlayDismissModalTag onClick={handleModalIsShown} isShown={isShown}/>
            <button onClick={handleModalIsShown} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>
        </div>
    )

}