import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "./form.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await login(email, password);
      console.log('Token retornado:', token);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token); 
      const role = decoded.role; 



      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/livros");
      }

    } catch (error) {
      setError("Falha no login. Verifique as credenciais."); 
      console.error("Erro de login:", error);
      setTimeout(() => {
        setError(""); 
      }, 5000);
    }
  };

  return (
    <div className="login-container pb-0">
      <div className="login-box">
        <h2>Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
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
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ButtonGroup className="btn-group">
            <Button type="submit" variant="primary" className="btn-login">
              <FaSignInAlt /> Entrar
            </Button>
            <Link to="/" className="btn-home">
              <Button variant="secondary">
                <FaArrowLeft /> Voltar
              </Button>
            </Link>
          </ButtonGroup>
        </form>

        <div className="login-links">
          <Link to="/cadastro" className="login-link">Crie sua conta</Link> <br />
          <Link to="/redefinicao" className="login-link">Esqueceu a senha?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
