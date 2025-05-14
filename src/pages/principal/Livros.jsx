import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllLivros } from "../../services/api";
import { Dropdown, DropdownButton, Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./livros.css";

function Livros() {
  const { token } = useAuth();
  const [livros, setLivros] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtroTemporario, setFiltroTemporario] = useState({ autor: "", genero: "", ano: "" });
  const [filtro, setFiltro] = useState({ autor: "", genero: "", ano: "" });
  const [alerta, setAlerta] = useState("");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (token) {
      setLoading(true); 
      getAllLivros(token)
        .then(setLivros)
        .catch((err) => {
          console.error("Erro ao buscar livros:", err);
          setAlerta("Erro ao carregar os livros.");
        })
        .finally(() => setLoading(false)); 
    }
  }, [token]);

  const autoresUnicos = [...new Set(
    livros.map(l => typeof l.autor === "string" ? l.autor.trim() : "").filter(a => a)
  )];
  const generosUnicos = [...new Set(
    livros.map(l => typeof l.genero === "string" ? l.genero.trim() : "").filter(g => g)
  )];
  const anosUnicos = [...new Set(
    livros.map(l => l.ano ? String(l.ano).trim() : "").filter(ano => ano)
  )];

  const handleFiltroTemp = (tipo, valor) => {
    setFiltroTemporario(prev => ({ ...prev, [tipo]: valor }));
  };

  const aplicarFiltros = () => {
    setFiltro(filtroTemporario);
  };

  const limparFiltros = () => {
    setFiltro({ autor: "", genero: "", ano: "" });
    setFiltroTemporario({ autor: "", genero: "", ano: "" });
    setSearchQuery("");
  };

  const livrosFiltrados = livros.filter((livro) => {
    const tituloMatch = livro.titulo?.toLowerCase().startsWith(searchQuery.toLowerCase()); 
    const autorMatch = filtro.autor
      ? livro.autor?.trim().toLowerCase() === filtro.autor.trim().toLowerCase()
      : true;
    const generoMatch = filtro.genero
      ? livro.genero?.trim().toLowerCase() === filtro.genero.trim().toLowerCase()
      : true;
    const anoMatch = filtro.ano
      ? String(livro.ano).trim() === filtro.ano.trim()
      : true;

    return tituloMatch && autorMatch && generoMatch && anoMatch;
  });

  return (
    <div className="livros-container">
      <h2 className="text-center">Livros disponíveis</h2>

      {alerta && <Alert variant="danger">{alerta}</Alert>} 

      {loading && <p>Carregando livros...</p>} 

      {!loading && livrosFiltrados.length === 0 && <Alert variant="info">Nenhum livro encontrado.</Alert>} 

      <div className="search-bar">
        <div className="search-input-container">
          <label htmlFor="search">Pesquisar por título:</label>
          <input
            type="text"
            id="search"
            placeholder="Procurar livro..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="dropdowns-filtros" style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
          <DropdownButton
            className="dropdown-filtro"
            id="dropdown-autor"
            title={`Autor: ${filtroTemporario.autor || "Todos"}`}
            onSelect={(val) => handleFiltroTemp("autor", val)}
          >
            {autoresUnicos.map((autor, index) => (
              <Dropdown.Item key={index} eventKey={autor}>{autor}</Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton
            className="dropdown-filtro"
            id="dropdown-genero"
            title={`Gênero: ${filtroTemporario.genero || "Todos"}`}
            onSelect={(val) => handleFiltroTemp("genero", val)}
          >
            {generosUnicos.map((genero, index) => (
              <Dropdown.Item key={index} eventKey={genero}>{genero}</Dropdown.Item>
            ))}
          </DropdownButton>

          <DropdownButton
            className="dropdown-filtro"
            id="dropdown-ano"
            title={`Ano: ${filtroTemporario.ano || "Todos"}`}
            onSelect={(val) => handleFiltroTemp("ano", val)}
          >
            {anosUnicos.map((ano, index) => (
              <Dropdown.Item key={index} eventKey={ano}>{ano}</Dropdown.Item>
            ))}
          </DropdownButton>

          <Button className="btn-aplicar" variant="primary" onClick={aplicarFiltros}>Aplicar</Button>
          <Button className="btn-limpar" variant="secondary" onClick={limparFiltros}>Limpar</Button>
        </div>
      </div>

      <div className="livros-list mt-4">
        {livrosFiltrados.map(livro => (
          <div key={livro.id} className="livro-card">
            <img
              src={`http://localhost:3000/uploads/${livro.image}`}
              alt={livro.titulo}
              className="livro-image"
            />
            <div className="livro-info">
              <h3>{livro.titulo}</h3>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Ano:</strong> {livro.ano}</p>
              <p><strong>Gênero:</strong> {livro.genero}</p>
              <div className="livro-actions">
                <Link to={`/livros/${livro.id}`} className="btn-details">
                  Ver detalhes
                </Link>
                <button className="btn-buy">Alugar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Livros;
