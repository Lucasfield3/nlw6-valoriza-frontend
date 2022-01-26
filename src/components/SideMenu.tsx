import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import { ListsComplimetsContext } from '../context/ListsComplimets';
import { SideMenuContext } from '../context/SideMenuContext';
import { UserDataContext } from '../context/UserDataContext';
import miniLogo from '../images/mini-logo.svg'

import '../styles/user-page.scss';

interface SideMenuProps{
    userName?:string;
}

export default function SideMenu({userName}:SideMenuProps){

    const { isActive, handleIsActive } = useContext(SideMenuContext)
    const { logOut, userAuthenticated } = useContext(AuthContext)
    const { clearAll } = useContext(ListsComplimetsContext)
    const { users} = useContext(UserDataContext)
    const navigate = useNavigate()


    return(
        <>
           <nav style={{left:isActive ? '0' : '-100%', transition:'left 0.5s ease-in-out'}}>
                <div>
                    <h1>{userAuthenticated.user.name !== undefined ? userAuthenticated.user.name : ''}</h1>
                    <div className="list">
                        <p onClick={() => users && setTimeout(()=>navigate('/user/myHome'), 500)}>Home</p>
                        <p onClick={() => users && setTimeout(()=>navigate('/recebidos'), 1000)}>Recebidos</p>
                        <p onClick={() => users && setTimeout(()=>navigate('/enviados'), 1000)}>Enviados</p>
                        <p onClick={() => navigate('/sobre')}>Sobre</p>
                        <p onClick={()=>{
                            clearAll()
                            logOut()
                            handleIsActive()
                            }}>Sair</p>
                    </div>
                    <img src={miniLogo} alt="mini-logo" />
                </div>
            </nav>
        </>
    )
}
