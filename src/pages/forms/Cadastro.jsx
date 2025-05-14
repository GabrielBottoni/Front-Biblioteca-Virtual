import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import "./form.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const handleCadastro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/users", {
        username,
        email,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        setVariant("success");
        setMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setVariant("danger");
        setMessage("Não foi possível cadastrar o usuário.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setVariant("danger");
      setMessage("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="login-container pb-0">
      <div className="login-box">
        <h2>Cadastro</h2>

        {message && (
          <Alert variant={variant} onClose={() => setMessage(null)} dismissible>
            {message}
          </Alert>
        )}

        <form onSubmit={handleCadastro}>
          <div className="textbox">
            <label htmlFor="username">Nome</label>
            <input
              type="text"
              id="username"
              placeholder="Digite seu nome"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="textbox">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="textbox">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Crie uma senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ButtonGroup className="btn-group">
            <Button type="submit" variant="success" className="btn-login">
              <FaUserPlus /> Cadastrar
            </Button>
            <Link to="/" className="btn-home">
              <Button className="btn-home" variant="secondary" as="div">
                <FaArrowLeft /> Voltar
              </Button>
            </Link>
          </ButtonGroup>
        </form>

        <div className="login-links">
          <Link to="/login" className="login-link">Já tem uma conta? Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
