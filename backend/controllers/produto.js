import { db } from "../db.js";

export const getProducts = (req, res) => {
  const q = `
  SELECT p.id, p.nome, p.quantidade, p.preco, c.nome AS categoria
  FROM produtos p
  LEFT JOIN categorias c ON p.categoria_id = c.id
`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    console.log(data);
    return res.status(200).json(data);
  });
};

export const addProduct = (req, res) => {
  const q =
    "INSERT INTO produtos(`nome`, `categoria_id`, `quantidade`, `preco`) VALUES (?)";

  const values = [
    req.body.nome,
    req.body.categoria_id,
    req.body.quantidade,
    req.body.preco,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto adicionado com sucesso!");
  });
};

export const updateProduct = (req, res) => {
  const q =
    "UPDATE produtos SET `nome` = ?, `categoria_id` = ?, `quantidade` = ?, `preco` = ? WHERE id = ? ";

  const values = [
    req.body.nome,
    req.body.categoria_id,
    req.body.quantidade,
    req.body.preco,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Poduto atualizado com sucesso");
  });
};

export const deleteProduct = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};
