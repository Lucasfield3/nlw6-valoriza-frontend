import { useForm } from 'react-hook-form'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismissSideMenu from '../../components/OverlayDismissSideMenu'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, NewCompliment } from '../../service/Compliment'
import plus from '../../images/plus.svg'

import '../../styles/user-page.scss'
import { useContext } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { OverlayDismissModalTag } from '../../components/OverlayDismissModalTag'
import { ModalIshownContext } from '../../context/ModalIsShownContext'

export function Home(){

    const { register, handleSubmit } = useForm()

    const { isShown, handleModalIsShown } = useContext(ModalIshownContext)

    const onSubmit = async (data:NewCompliment) => {

        if(data){
            await createCompliment(data)
            console.log(data)
        }else{
            throw new Error("Nothing to return");
        }

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
                <h1>Envio de elogios</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="compliment-sender">
                        <div>
                            <p>Para:</p>
                            <input {...register("email", { required: true, maxLength: 40 })} placeholder='email' type='email'/>
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