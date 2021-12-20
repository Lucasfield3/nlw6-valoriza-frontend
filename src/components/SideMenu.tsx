import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { SideMenuContext } from '../context/SideMenuContext';
import miniLogo from '../images/mini-logo.svg'

import '../styles/user-page.scss';

interface SideMenuProps{
    userName:string;
}

export default function SideMenu({userName}:SideMenuProps){

    const { isActive, handleIsActive } = useContext(SideMenuContext)
    const navigate = useNavigate()


    return(
        <>
            <nav style={{left:isActive ? '0' : '-100%', transition:'left 0.5s ease-in-out'}}>
                <div>
                    <h1>{userName}</h1>
                    <div className="list">
                        <p onClick={() => navigate('/user/myHome')}>Home</p>
                        <p onClick={() => navigate('/recebidos')}>Recebidos</p>
                        <p onClick={() => navigate('/enviados')}>Enviados</p>
                        <p onClick={() => navigate('/sobre')}>Sobre</p>
                        <p onClick={() => {
                            handleIsActive()
                            //storeToken('')
                            navigate('/')
                            }}>Sair</p>
                    </div>
                    <img src={miniLogo} alt="mini-logo" />
                </div>
            </nav>
        </>
    )
}
