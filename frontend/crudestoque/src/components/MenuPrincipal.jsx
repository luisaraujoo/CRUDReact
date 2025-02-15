import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MenuPrincipal.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");

  const [editando, setEditando] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    carregarProdutos();
    carregarCategorias();
  }, []);

  const carregarProdutos = async () => {
    const res = await axios.get("http://localhost:8802/produtos");
    setProdutos(res.data);
  };

  const carregarCategorias = async () => {
    const res = await axios.get("http://localhost:8802/categorias");
    setCategorias(res.data);
  };

  const adicionarProduto = async (e) => {
    e.preventDefault();

    if (editando) {
      await axios.put(`http://localhost:8802/produtos/${editando}`, {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria_id: parseInt(categoria),
      });
      toast.success("Produto atualizado com sucesso!");
    } else {
      await axios.post(`http://localhost:8802/produtos`, {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
        categoria_id: parseInt(categoria),
      });
      toast.success("Produto adicionado com sucesso!");
    }

    setNome("");
    setQuantidade("");
    setPreco("");
    setCategoria("");
    setEditando(null);
    carregarProdutos();
  };

  const editarProduto = (produto) => {
    setEditando(produto.id);
    setNome(produto.nome);
    setPreco(produto.preco);
    setQuantidade(produto.quantidade);
    setCategoria(produto.categoria);
  };

  const deletarProduto = async (id) => {
    await axios.delete(`http://localhost:8802/produtos/${id}`);

    toast.success("Produto excluído com sucesso!");

    carregarProdutos();
  };

  const backLogin = async (e) => {
    e.preventDefault(e);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <h1>Controle de Estoque SQL</h1>
      <form className="form-menu" onSubmit={adicionarProduto}>
        <div className="form-div">
          <input
            type="text"
            value={nome}
            placeholder="nome produto"
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="number"
            value={quantidade}
            placeholder="quantidade"
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <input
            type="number"
            value={preco}
            placeholder="preco"
            onChange={(e) => setPreco(e.target.value)}
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          <button className="button-principal" id="form-btn" type="submit">
            {editando ? "Atualizar" : "Adicionar"}
          </button>
        </div>
      </form>
      <h3>Lista de Produtos</h3>
      <div className="container-lista">
        <table className="product-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr className="tr-lista" key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.quantidade} unidades</td>
                <td>R$ {produto.preco}</td>
                <td>{produto.categoria}</td>
                <td>
                  <button
                    className="button-principal edit-btn"
                    onClick={() => editarProduto(produto)}
                  >
                    Editar
                  </button>
                  <button
                    className="button-principal edit-btn"
                    id="btn-excluir"
                    onClick={() => deletarProduto(produto.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="button-principal" id="btn-sair" onClick={backLogin}>
        Sair
      </button>
    </div>
  );
};

export default Login;
