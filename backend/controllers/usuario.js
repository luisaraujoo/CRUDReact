import { db } from "../db.js";

import bcrypt from "bcrypt";

export const register = (req, res) => {
  const { nome, email, senha } = req.body;

  const checkQuery = "SELECT * FROM usuarios WHERE email = ?";
  db.query(checkQuery, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    if (results.length > 0)
      return res.status(400).json({ error: "E-mail já cadastrado" });

    bcrypt.hash(senha, 10, (err, hash) => {
      if (err)
        return res.status(500).json({ error: "Erro ao criptografar senha" });

      const insertQuery =
        "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
      db.query(insertQuery, [nome, email, hash], (err, result) => {
        if (err)
          return res.status(500).json({ error: "Erro ao cadastrar usuário" });

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
      });
    });
  });
};

export const getUsers = (req, res) => {
  const q = "SELECT id, nome, email FROM usuarios";
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar usuários" });

    res.json(results);
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM usuarios WHERE id = ?";

  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao deletar usuário" });

    res.json({ message: "Usuário deletado com sucesso!" });
  });
};
