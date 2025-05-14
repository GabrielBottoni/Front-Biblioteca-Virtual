import React from 'react';
import './home.css';
import sobreSection from '../../assets/sobreSection-image.svg';
import servicosSection from '../../assets/servicoSection-image.svg';
import { useState } from "react";
import { Alert } from 'react-bootstrap';

const Home = () => {

  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState("success");

  const handleSubmit = (e) => {
    e.preventDefault();

    setVariant("success");
    setMessage(" Um e-mail foi enviado Sucesso! ");

    e.target.reset();

    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  return (
    <div>
      <section id="home" className="home">
        <div className="container d-flex align-itens-center justify-content-center fs-1 text-white text-center flex-column">
          <h1>Bem-vindo ao sistema de controle de livros</h1>
          <h2>Aqui você pode gerenciar seus livros de forma fácil e rápida.</h2>
        </div>
      </section>

      <section id="sobre" className="sobre">
        <div className="container pt-5 pb-md-5">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 mb-md-0 order-2 order-md-1">
              <h2 className="mb-3">Sobre Nós</h2>
              <p>
                Bem-vindo à nossa aplicação! Aqui você encontra uma experiência única com recursos pensados para facilitar sua vida.
              </p>
              <p>
                Nosso objetivo é oferecer a melhor solução digital para o seu dia a dia com eficiência, rapidez e simplicidade.
              </p>
              <a href="/cadastro" className="home-buttons">Cadastre-se</a>
            </div>

            <div className="col-md-6 order-1 order-md-2">
              <img
                src={sobreSection}
                alt="Sobre a aplicação"
                className="img-fluid w-100 h-100"
              />
            </div>

          </div>
        </div>
      </section>


      <section id="servicos" className="servicos">
        <div className="container pt-md-5 pb-5">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={servicosSection}
                alt="Sobre a aplicação"
                className="servico-image img-fluid w-100 h-100"
              />
            </div>

            <div className="col-md-6">
              <h2 className="mb-3">Como Funciona</h2>
              <p>
                Com a nossa biblioteca virtual, você tem acesso rápido e organizado a diversos títulos. A plataforma permite que você explore livros disponíveis, visualize capas, resumos, autores e outras informações essenciais com facilidade.
              </p>
              <p>
                É possível buscar diretamente pelo nome do livro, filtrar por categoria ou autor, e descobrir novas leituras de forma intuitiva — tudo em um só lugar, sempre que você precisar.
              </p>
              <p>
                Ideal para quem quer praticidade na hora de encontrar um bom livro, sem complicação.
              </p>
              <a href="/login" className="home-buttons">Acesse agora</a>
            </div>

          </div>
        </div>
      </section>

      <section id="contato" className="contato">
        <div className="container pt-5 pb-5">
          <div className="row justify-content-center text-center text-white mb-5">
            <div className="col-lg-8 ">
              <h2 className="fw-bold">Fale Conosco!</h2>

              <p className="fs-5">
                Tem dúvidas, sugestões ou deseja mais informações? Preencha o formulário abaixo
                e entraremos em contato com você o mais breve possível.
              </p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="p-2 p-md-5 bg-white rounded shadow">
                <form onSubmit={handleSubmit}>

                  {message && (
                    <Alert variant={variant} onClose={() => setMessage(null)} dismissible>
                      {message}
                    </Alert>
                  )}

                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      placeholder="Seu nome"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mensagem" className="form-label">Mensagem</label>
                    <textarea
                      className="form-control"
                      id="mensagem"
                      rows="2"
                      placeholder="Escreva sua mensagem aqui..."
                      required
                    ></textarea>
                  </div>

                  <div className="text-end">
                    <button type="submit" className="submit-button">
                      Enviar Mensagem
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
