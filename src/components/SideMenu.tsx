import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { SideMenuContext } from '../context/SideMenuContext';
import { UserDataContext } from '../context/UserDataContext';
import miniLogo from '../images/mini-logo.svg'
import '../styles/user-page.scss';

export default function SideMenu(){

    const { isActive } = useContext(SideMenuContext)

    const { user, getOneUser } = useContext(UserDataContext)

    const navigate = useNavigate()

    useEffect(()=>{
        getOneUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <>
            <nav style={{left:isActive ? '0' : '-100%', transition:'left 0.5s ease-in-out'}}>
                <div>
                    <h1>{user && user.name}</h1>
                    <div className="list">
                        <p onClick={() => navigate('/home')}>Home</p>
                        <p onClick={() => navigate('/recebidos')}>Recebidos</p>
                        <p onClick={() => navigate('/enviados')}>Enviados</p>
                        <p onClick={() => navigate('/sobre')}>Sobre</p>
                        <p onClick={() => navigate('/')}>Sair</p>
                    </div>
                    <img src={miniLogo} alt="mini-logo" />
                </div>
            </nav>
        </>
    )
}