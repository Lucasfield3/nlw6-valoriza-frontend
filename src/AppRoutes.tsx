import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom'

import { ModalIshownProvider } from "./context/ModalIsShownContext";
import { SideMenuProvider } from "./context/SideMenuContext";
import { TagDataProvider } from "./context/TagDataContext";
import {  UserDataProvider } from "./context/UserDataContext";
import { Enviados } from "./pages/Enviados";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { Loading } from "./pages/Loading/index";
import { Recebidos } from "./pages/Recebidos";
import { Register } from "./pages/Register";
import { Sobre } from "./pages/Sobre";
import { ListsComplimetsProvider } from "./context/ListsComplimets";

import { ReactElement, ReactNode, useContext, useState } from 'react';
import { getUser, User } from './service/User';
import { Credentials, storeToken } from './service/Authenticate';
import { AuthContext, AuthProvider, DEFAULT_CONTEXT_DATA } from './context/AuthContext';




function AppRoutes(){
 interface PrivateProps{
     children:any;
 }
    const Private = ({children}:PrivateProps)=>{
        const { authenticated, loading, userAuthenticated } = useContext(AuthContext)


        if(loading){
            console.log('loading')
            return <Loading/>
        }
        
        if(!authenticated){
            console.log('not authenticated')
            return <Navigate to='/'/>
        }
        
        if(authenticated){
            console.log('Authenticated')
            return children
        }
 
    }

    return(
        <Router>
            <AuthProvider>
                <UserDataProvider>
                    <ListsComplimetsProvider>
                        <TagDataProvider>
                            <SideMenuProvider>
                                <ModalIshownProvider>
                                        <Routes>
                                            <Route element={<Login/>}  path='/'></Route>
                                            <Route element={<Register/>} path='/register'></Route>
                                            <Route element={<Private><Home/></Private>} path='/user/myHome'></Route>
                                            <Route element={<Loading/>} path='/loading'/>
                                            <Route element={<Private><Recebidos/></Private>} path='/recebidos'></Route>
                                            <Route element={<Private><Enviados/></Private>} path='/enviados'></Route>
                                            <Route element={<Private><Sobre/></Private>} path='/sobre'></Route>
                                        </Routes>
                                </ModalIshownProvider>
                            </SideMenuProvider>
                        </TagDataProvider>
                    </ListsComplimetsProvider>
                </UserDataProvider>
            </AuthProvider>
        </Router>
    )
}

export default AppRoutes
