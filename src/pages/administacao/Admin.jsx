import React, { useEffect, useState } from "react";
import { Table, Button, Container, Dropdown, DropdownButton, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllLivros, deleteLivro, getAllUsuarios, alterarFuncao } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Alert, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import "./admin.css";

const Admin = () => {
  const { token } = useAuth();
  const [livros, setLivros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtro, setFiltro] = useState({ autor: "", genero: "", ano: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(10);
  const livrosPorPagina = 10;
  const [mensagem, setMensagem] = useState(null);
  const [tipoMensagem, setTipoMensagem] = useState("");
  const [livroParaDeletar, setLivroParaDeletar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const navigate = useNavigate();

  const confirmarDeleteLivro = (livroId) => {
    setLivroSelecionado(livroId);
    setShowModal(true);
  };

  const cancelarDelete = () => {
    setShowModal(false);
    setLivroSelecionado(null);
  };

  const handleDeleteConfirmado = async () => {
    if (!livroSelecionado) return;

    try {
      await deleteLivro(livroSelecionado, token);
      setLivros((prev) => prev.filter((livro) => livro.id !== livroSelecionado));
      toast.success("Livro deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      toast.error("Erro ao deletar o livro. Tente novamente.");
    }

    setShowModal(false);
    setLivroSelecionado(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllLivros(token);
        setLivros(data);
      } catch (error) {
        console.error("Erro ao carregar livros:", error);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmDelete) return;

    try {
      await deleteLivro(id, token);
      setLivros((prev) => prev.filter((livro) => livro.id !== id));
      toast.success("Livro deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      toast.error("Erro ao deletar o livro. Tente novamente.");
    }
  };

  const alterarFuncao = async (id) => {
    try {

      await axios.put(
        `http://localhost:3000/edit/users/admin/${id}/toggle-role`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { data } = await axios.get('http://localhost:3000/edit/users/admin/', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao alterar função do usuário:', error.response ? error.response.data : error.message);
    }
  };

  const autoresUnicos = [...new Set(livros.map(l => l.autor))];
  const generosUnicos = [...new Set(livros.map(l => l.genero))];
  const anosUnicos = [...new Set(livros.map(l => String(l.ano)))];

  const livrosFiltrados = livros.filter((livro) => {
    const tituloMatch = searchQuery
      ? livro.titulo && livro.titulo.toLowerCase().startsWith(searchQuery.toLowerCase())
      : true;

    const autorMatch = !filtro.autor || livro.autor === filtro.autor;
    const generoMatch = !filtro.genero || livro.genero === filtro.genero;
    const anoMatch = !filtro.ano || String(livro.ano) === filtro.ano;

    return tituloMatch && autorMatch && generoMatch && anoMatch;
  });

  const buscarUsuarios = async () => {
    try {
      const res = await getAllUsuarios(token);
      setUsuarios(res);
      setMostrarUsuarios(true);
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  const livrosParaExibir = livrosFiltrados.slice(
    (currentPage - 1) * livrosPorPagina,
    currentPage * livrosPorPagina
  );

  const usuariosParaExibir = usuarios.slice(
    (currentPage - 1) * usuariosPorPagina,
    currentPage * usuariosPorPagina
  );

  const totalPaginasLivros = Math.ceil(livrosFiltrados.length / livrosPorPagina);

  const totalPaginasUsuarios = Math.ceil(usuarios.length / usuariosPorPagina);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= (mostrarUsuarios ? totalPaginasUsuarios : totalPaginasLivros)) {
      setCurrentPage(page);
    }
  };

  return (
    <Container className="admin-container mt-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h2 className="mb-4">Painel Administrativo</h2>
      {mensagem && (
        <Alert variant={tipoMensagem} onClose={() => setMensagem(null)} dismissible>
          {mensagem}
        </Alert>
      )}

      <div className="d-flex gap-2 mb-3 flex-wrap">
        <Button className="section-table" variant="success" onClick={() => navigate("/admin/cadastrar")}>
          Cadastrar Novo Livro
        </Button>
        <Button className="section-table" variant="success" onClick={() => setMostrarUsuarios(false)}>
          Mostrar Livros
        </Button>
        <Button className="section-table" variant="success" onClick={buscarUsuarios}>
          Mostrar Usuários
        </Button>
      </div>

      {!mostrarUsuarios && (
        <>
          <div className="d-flex flex-wrap gap-2 align-items-end mb-3">
            <Form.Group controlId="search" className="flex-grow-1">
              <Form.Label>Pesquisar por título:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesquisar por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <DropdownButton
                className="dropdown-filtro"
                title={`Autor: ${filtro.autor || "Todos"}`}
                onSelect={(val) => setFiltro((prev) => ({ ...prev, autor: val }))}>
                {autoresUnicos.map((autor, i) => (
                  <Dropdown.Item key={i} eventKey={autor}>
                    {autor}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <DropdownButton
                className="dropdown-filtro"
                title={`Gênero: ${filtro.genero || "Todos"}`}
                onSelect={(val) => setFiltro((prev) => ({ ...prev, genero: val }))}>
                {generosUnicos.map((genero, i) => (
                  <Dropdown.Item key={i} eventKey={genero}>
                    {genero}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <DropdownButton
                className="dropdown-filtro"
                title={`Ano: ${filtro.ano || "Todos"}`}
                onSelect={(val) => setFiltro((prev) => ({ ...prev, ano: val }))}>
                {anosUnicos.map((ano, i) => (
                  <Dropdown.Item key={i} eventKey={ano}>
                    {ano}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>⠀</Form.Label>
              <Button
                className="btn-limpar w-100"
                variant="secondary"
                onClick={() => setFiltro({ autor: "", genero: "", ano: "" })}>
                Limpar Filtros
              </Button>
            </Form.Group>
          </div>
        </>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {mostrarUsuarios ? (
              <>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Ações</th>
              </>
            ) : (
              <>
                <th>#</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano</th>
                <th>Gênero</th>
                <th>Imagem</th>
                <th>Ações</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {mostrarUsuarios ? (
            usuariosParaExibir.length > 0 ? (
              usuariosParaExibir.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`switch-role-${user.id}`}
                      label={user.role === 'admin' ? 'Admin' : 'User'}
                      checked={user.role === 'admin'}
                      onChange={() => alterarFuncao(user.id)}
                      disabled={user.role === 'admin'}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">Nenhum usuário encontrado</td></tr>
            )
          ) : (
            livrosParaExibir.map((livro, index) => (
              <tr key={livro.id}>
                <td>{index + 1}</td>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.ano}</td>
                <td>{livro.genero}</td>
                <td>
                  {livro.image && (
                    <img
                      src={`http://localhost:3000/uploads/${livro.image}`}
                      alt={livro.titulo}
                      style={{ width: "60px", height: "auto", borderRadius: "4px" }}
                    />
                  )}
                </td>
                <td>
                  <Button
                    className="action-button edit-btn me-2"
                    onClick={() => navigate(`/admin/editar/${livro.id}`)}
                  >
                    <FaEdit />
                  </Button>

                  <Button className="delete-btn" onClick={() => confirmarDeleteLivro(livro.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={cancelarDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir este livro?
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-modal-cancela" onClick={cancelarDelete}>
            Cancelar
          </Button>
          <Button className="btn-modal-deleta" onClick={handleDeleteConfirmado}>
            Deletar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Navegação da Paginação */}
      <div className="pagination">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </Button>
        <span> Página {currentPage} de {mostrarUsuarios ? totalPaginasUsuarios : totalPaginasLivros} </span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === (mostrarUsuarios ? totalPaginasUsuarios : totalPaginasLivros)}>
          Próxima
        </Button>
      </div>
    </Container>



  );
};

export default Admin;
