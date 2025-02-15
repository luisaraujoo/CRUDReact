import express from "express";
import cors from "cors";
import produtoRoutes from "./routes/produtos.js";
import authRoutes from "./routes/auth.js";
import usuarioRoutes from "./routes/usuarios.js";
import categoriaRoutes from "./routes/categorias.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);

app.listen(8802, () => {
  console.log("Servidor rodando na porta 8802!!");
});
