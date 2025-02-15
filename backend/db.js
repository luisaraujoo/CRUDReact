import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "050616",
  database: "estoque_crud",
});

db.connect((err) => {
  if (err) {
    console.log("Erro ao conectar com o banco de dados", err);
    return;
  }
  console.log("Servidor conectado com sucesso :)");
});

export { db };
