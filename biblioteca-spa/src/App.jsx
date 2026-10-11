import { useEffect, useState } from "react";
import { listarLivros,  criarLivro, excluirLivro } from "./api";

function App() {
  const [livros, setLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");

  async function carregar() {
    const dados = await listarLivros();
    setLivros(dados);
  }

  async function salvar(event) {
    event.preventDefault();
    
    await criarLivro({
      titulo,
      autor,
      ano_publicacao: Number(ano),
      disponivel: True
    });

    setTitulo("");
    setAutor("");
    setAno("");
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <main>
      <h1>Biblioteca Web</h1>
      
      <form onSubmit={salvar}>
        <input value={titulo} onChange={e => setTitulo(e.target.value)}
                placeholder="Título" />
        <input value={autor} onChange={e => setAutor(e.target.value)}
                placeholder="Autor" />
        <input value={ano} onChange={e => setAno(e.target.value)}
                placeholder="Ano" type="number" />
        <button>Salvar</button>
      </form>

      <h2>Livros cadastrados</h2>

      {livros.map(livro => (
        <div key={livro.id}>
          <strong>{livro.titulo}</strong>
          {" - "}{livro.autor}
          <button onClick={() => excluirLivro((livro.id))}>Excluir</button>
        </div>
      ))}
    </main>
  );
}

export default App;