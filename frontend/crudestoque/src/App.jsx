import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import MenuPrincipal from "./components/MenuPrincipal";
import Registrar from "./components/Registrar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/cadastro" element={<Registrar />} />
      </Routes>
      <ToastContainer position="bottom-left" />
    </Router>
  );
}

export default App;
