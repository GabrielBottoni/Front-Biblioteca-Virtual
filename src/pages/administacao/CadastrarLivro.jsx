import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createLivro } from "../../services/api";

const CadastrarLivro = () => {
  const navigate = useNavigate();
  const [livroData, setLivroData] = useState({
    titulo: "",
    autor: "",
    ano: "",
    genero: "",
  });
  const [image, setImage] = useState(null);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setLivroData({ ...livroData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLivro(livroData, image);
      navigate("/admin"); 
    } catch (err) {
      setErro("Erro ao cadastrar livro.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 cadastro-container">
      <Card className="p-4" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h2 className="text-center mb-4">Cadastrar Novo Livro</h2>
        
        {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitulo" className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={livroData.titulo}
              onChange={handleChange}
              required
              placeholder="Digite o título do livro"
            />
          </Form.Group>

          <Form.Group controlId="formAutor" className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="autor"
              value={livroData.autor}
              onChange={handleChange}
              required
              placeholder="Digite o autor do livro"
            />
          </Form.Group>

          <Form.Group controlId="formAno" className="mb-3">
            <Form.Label>Ano</Form.Label>
            <Form.Control
              type="number"
              name="ano"
              value={livroData.ano}
              onChange={handleChange}
              required
              placeholder="Digite o ano de publicação"
            />
          </Form.Group>

          <Form.Group controlId="formGenero" className="mb-3">
            <Form.Label>Gênero</Form.Label>
            <Form.Control
              type="text"
              name="genero"
              value={livroData.genero}
              onChange={handleChange}
              required
              placeholder="Digite o gênero do livro"
            />
          </Form.Group>

          <Form.Group controlId="formImagem" className="mb-3">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type="file"
              onChange={handleImageChange}
              required
              accept="image/*"
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" className="w-48 btn-cadastrar">
              Cadastrar
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin")}
              className="w-48 btn-cancelar"
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default CadastrarLivro;
