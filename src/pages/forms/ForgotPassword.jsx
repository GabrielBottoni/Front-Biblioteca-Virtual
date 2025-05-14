import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import "./form.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const handleSubmit = (e) => {
    e.preventDefault();

    setVariant("success");
    setMessage("Sucesso! Um e-mail de redefinição foi enviado.");
    
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="login-container pb-0">
      <div className="login-box">
        <h2>Esqueceu sua Senha?</h2>

        {message && (
          <Alert variant={variant} onClose={() => setMessage(null)} dismissible>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <label htmlFor="email">Digite seu e-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <ButtonGroup className="btn-group">
            <Button type="submit" variant="primary" className="btn-login">
              <FaEnvelope /> Enviar
            </Button>
            <Link to="/login" className="btn-home">
              <Button variant="secondary">
                <FaArrowLeft /> Voltar
              </Button>
            </Link>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
