import bcrypt from "bcrypt";

const senhaTexto = "fluminense";
const saltRounds = 10;

bcrypt.hash(senhaTexto, saltRounds, (err, hash) => {
  if (err) {
    console.error("Erro ao gerar hash:", err);
    return;
  }
  console.log("Senha criptografada:", hash);
});
