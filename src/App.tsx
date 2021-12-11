import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ModalIshownProvider } from "./context/ModalIsShownContext";
import { SideMenuProvider } from "./context/SideMenuContext";
import { TagDataProvider } from "./context/TagDataContext";
import { UserDataProvider } from "./context/UserDataContext";
import { Enviados } from "./pages/Enviados";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { Error } from "./pages/Error/index";
import { Recebidos } from "./pages/Recebidos";
import { Register } from "./pages/Register";
import { Sobre } from "./pages/Sobre";
import { AuthenticateProvider } from "./context/AuthenticateContext";


function App() {
  return (
      <AuthenticateProvider>
        <UserDataProvider>
          <TagDataProvider>
            <SideMenuProvider>
              <ModalIshownProvider>
                <BrowserRouter>
                <Routes>
                    <Route element={<Login/>} path='/'></Route>
                    <Route element={<Register/>} path='/register'></Route>
                    <Route element={<Home/>} path='/home'></Route>
                    <Route element={<Error/>} path='/'/>
                    <Route element={<Recebidos/>} path='/recebidos'></Route>
                    <Route element={<Enviados/>} path='/enviados'></Route>
                    <Route element={<Sobre/>} path='/sobre'></Route>
                </Routes>
                </BrowserRouter>
              </ModalIshownProvider>
            </SideMenuProvider>
          </TagDataProvider>
        </UserDataProvider>
      </AuthenticateProvider>
  );
}

export default App;
