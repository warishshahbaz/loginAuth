import { Container, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import './App.css'
import Home from "./components/Home";
import Login from "./components/Login";
import {Routes,Route} from 'react-router-dom';
import Register from "./components/Register";

const App = () => {
  return (
    <>

     <Routes>
      <Route path="/" index element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home/>}/>
      
     </Routes>
      
      
    </>
   

  );
};

export default App;
