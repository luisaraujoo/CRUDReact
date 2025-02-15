import { db } from "../db.js";
import bcrypt from "bcrypt";

export const login = (req, res) => {
  const { email, senha } = req.body;

  // Aqui eu to vendo se o usuario ja existe, se ele nao existirm iforma: usuario nao encontrado
  const q = "SELECT * FROM usuarios WHERE email = ?";
  db.query(q, [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Erro no servidor" });

    if (results.length === 0)
      return res.status(401).json({ error: "Usuário não encontrado" });

    const usuario = results[0];
    bcrypt.compare(senha, usuario.senha, (err, match) => {
      if (err)
        return res.status(500).json({ error: "Erro ao verificar senha" });

      if (!match) return res.status(401).json({ error: "Senha incorreta" });

      res.json({ message: "Login bem-sucedido", usuario });
    });
  });
};
