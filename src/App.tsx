import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ModalIshownProvider } from "./context/ModalIsShownContext";
import { SideMenuProvider } from "./context/SideMenuContext";
import { TagDataProvider } from "./context/TagDataContext";
import { UserDataProvider } from "./context/UserDataContext";
import { Enviados } from "./pages/Enviados";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { Loading } from "./pages/Loading/index";
import { Recebidos } from "./pages/Recebidos";
import { Register } from "./pages/Register";
import { Sobre } from "./pages/Sobre";
import { ListsComplimetsProvider } from "./context/ListsComplimets";





function App() {


  return (
    
        <UserDataProvider>
            <ListsComplimetsProvider>
              <TagDataProvider>
                <SideMenuProvider>
                  <ModalIshownProvider>
                    <BrowserRouter>
                    <Routes>
                        <Route element={<Login/>} path='/'></Route>
                        <Route element={<Register/>} path='/register'></Route>
                        <Route element={<Home/>} path='/user/myHome'></Route>
                        <Route element={<Loading/>} path='/loading'/>
                        <Route element={<Recebidos/>} path='/recebidos'></Route>
                        <Route element={<Enviados/>} path='/enviados'></Route>
                        <Route element={<Sobre/>} path='/sobre'></Route>
                    </Routes>
                    </BrowserRouter>
                  </ModalIshownProvider>
                </SideMenuProvider>
              </TagDataProvider>
            </ListsComplimetsProvider>
        </UserDataProvider>
      
  );
}

export default App;
