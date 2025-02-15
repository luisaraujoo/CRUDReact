import { db } from "../db.js";

export const getCategorias = (req, res) => {
  const q = "SELECT id, nome FROM categorias";
  db.query(q, (err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar categoria" });

    res.json(results);
  });
};
