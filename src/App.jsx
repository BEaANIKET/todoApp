import {BrowserRouter, Route, Routes } from "react-router-dom"
import account from "./config/config";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Resister from "./pages/Resister";

  function App() {

    console.log(account);

    return (
      <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}> </Route>
          <Route path='/Resister' element={<Resister />}> </Route>
          <Route path='/Login' element={<Login />}> </Route>
          <Route path='/Dashboard' element={<Dashboard />}> </Route>
        </Routes>
      </BrowserRouter>
      </>
    )
  }

  export default App
