import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com banco feita com sucesso");
});

const app = express();

// Necessário para que possamos ler JSON do body da requisição
app.use(express.json());

// const livros = [
//   { id: 1, titulo: "Senhor dos aneis" },
//   { id: 2, titulo: "O Hobbit" },
// ];

app.get("/", (req, res) => {
  res.status(200).send("Curso de Node.js");
});

app.get("/livros", (req, res) => {
  livros.find((err, livros) => {
    res.status(200).json(livros);
  });
});

app.get("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);

  res.json(livros[index]);
});

app.post("/livros", (req, res) => {
  livros.push(req.body);
  res.status(201).send("Livro cadastrado com sucesso");
});

app.put("/livros/:id", (req, res) => {
  let index = buscaLivro(req.params.id);
  livros[index].titulo = req.body.titulo;

  res.json(livros);
});

app.delete("/livros/:id", (req, res) => {
  let { id } = req.params;
  let index = buscaLivro(id);
  livros.splice(index, 1);

  res.json(`Livro ${id} apagado com sucesso`);
});

function buscaLivro(id) {
  return livros.findIndex((livro) => livro.id == id);
}

export default app;
