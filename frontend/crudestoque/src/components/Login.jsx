import React from "react";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();

    setTimeout(() => {
      navigate("/cadastro");
    }, 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8802/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Login Bem sucedido!");
        console.log("Usuario logado:", data.usuario);

        setTimeout(() => {
          navigate("/menu");
        }, 1000);
      } else {
        setMensagem(data.error);
        toast.error("Email ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Erro ao conectar com o servidor");
    }
  };

  return (
    <div>
      <div className="container">
        <h1 id="h1-login">Login</h1>
        <p id="p-estoque">Estoque MySQL</p>
        <form onSubmit={handleLogin} className="form">
          <p>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </p>
          <p className="btns">
            <button type="submit" className="button-principal">
              Entrar
            </button>
            <button
              onClick={cadastrar}
              className="button-principal"
              type="submit"
            >
              Cadastrar-se
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
