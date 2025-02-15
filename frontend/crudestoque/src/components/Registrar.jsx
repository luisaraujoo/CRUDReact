import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registrar = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const backLogin = async (e) => {
    e.preventDefault(e);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8802/usuarios/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Cadastro Bem sucedido!");
        toast.success("Cadastrado com sucesso!");
        console.log("Usuario logado:", data.usuario);

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        setMensagem(data.error);
        toast.error("E-mail já cadastrado!");
      }
    } catch (error) {
      console.error("erro ao cadastrar");
    }
  };

  return (
    <div className="container-cadastro">
      <h1>Cadastrar Usuário</h1>
      <form onSubmit={handleRegister}>
        <p>
          <input
            type="text"
            placeholder="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </p>
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
            placeholder="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </p>
        <p>
          <button className="button-principal" type="submit">
            Cadastrar
          </button>
          <button className="button-principal" onClick={backLogin}>
            Voltar ao login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Registrar;
