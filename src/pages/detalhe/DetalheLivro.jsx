import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useParams, Link } from "react-router-dom"; 
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import "./detalhe.css";

function DetalheLivro() {
  const { token } = useAuth();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/livros/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setLivro(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar livro:", err);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando informações do livro...</p>
      </div>
    );
  }

  return (
    <Container className="d-flex justify-content-center mt-5 main">
      <Card className="detalhe-card shadow-lg p-4 w-100">
        <Row>
          <Col md={4} className="text-center mb-3 mb-md-0">
            <img
              src={`http://localhost:3000/uploads/${livro.image}`}
              alt={livro.titulo}
              className="img-fluid rounded detalhe-imagem"
            />
          </Col>
          <Col md={8}>
            <div className="detalhe-card-body">
              <h3 className="mb-3">{livro.titulo}</h3>
              <p><strong>Autor:</strong> {livro.autor}</p>
              <p><strong>Ano:</strong> {livro.ano}</p>
              <p><strong>Gênero:</strong> {livro.genero}</p>
              <p><strong>Descrição:</strong></p>
              <p className="descricao">{livro.descricao}</p>
            </div>
            <div className="d-flex gap-3 mt-4">
              <Link to="/livros" className="btn-voltar">Voltar</Link>
              <button className="btn-alugar">Alugar</button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default DetalheLivro;
