import { useForm } from 'react-hook-form'
import MenuHamburguer from '../../components/MenuHamburguer'
import OverlayDismiss from '../../components/OverlayDismiss'
import SideMenu from '../../components/SideMenu'
import logo from '../../images/logo.svg'
import { createCompliment, NewCompliment } from '../../service/Compliment'
import plus from '../../images/plus.svg'

import '../../styles/user-page.scss'
import { useContext, useState } from 'react'
import { CreateTagModal } from '../../components/CreateTagModal'
import { SideMenuContext } from '../../context/SideMenuContext'

export function Home(){

    const { register, handleSubmit } = useForm()

    const [ isShown, setIsShown ] = useState(false)

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
            <OverlayDismiss/>
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
            <CreateTagModal style={{opacity:isShown ? 1 : 0}}/>
            <div style={{
            backgroundColor:'black', 
            opacity:'0.2', 
            height:'100vh', 
            width:'100vw', 
            zIndex:'10',
            cursor:'pointer',
            position: 'absolute',
            display:isShown ? 'block' : 'none'
            }}
            onClick={()=> setIsShown(!isShown)}
            >

        </div>
            <button onClick={()=> setIsShown(!isShown)} className='create-tag-button'><img src={plus} alt="Plus-icon" /></button>
        </div>
    )

}