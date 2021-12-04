import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ModalIshownProvider } from "./context/ModalIsShownContext";
import { SideMenuProvider } from "./context/SideMenuContext";
import { Enviados } from "./pages/Enviados";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { Recebidos } from "./pages/Recebidos";
import { Register } from "./pages/Register";
import { Sobre } from "./pages/Sobre";


function App() {
  return (
    <BrowserRouter>
    <SideMenuProvider>
      <ModalIshownProvider>
        <Routes>
            <Route element={<Login/>} path='/'></Route>
            <Route element={<Register/>} path='/register'></Route>
            <Route element={<Home/>} path='/home'></Route>
            <Route element={<Recebidos/>} path='/recebidos'></Route>
            <Route element={<Enviados/>} path='/enviados'></Route>
            <Route element={<Sobre/>} path='/sobre'></Route>
        </Routes>
      </ModalIshownProvider>
    </SideMenuProvider>
    </BrowserRouter>
  );
}

export default App;
