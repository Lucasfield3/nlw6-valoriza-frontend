import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/index";
import { Register } from "./pages/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Login/>} path='/'></Route>
          <Route element={<Register/>} path='/register'></Route>
          <Route element={<Home/>} path='/home'></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
