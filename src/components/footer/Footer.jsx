import React from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <div>

      <footer className="footer">
        <div className="social-icons">
          <div className="social-item">
            <a href="https://www.linkedin.com/in/gabrielbottoni/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="icon" />
            </a>
            <span className="label">LinkedIn</span>
          </div>
          <div className="social-item">
            <a href="https://github.com/GabrielBottoni" target="_blank" rel="noopener noreferrer">
              <FaGithub className="icon" />
            </a>
            <span className="label">GitHub</span>
          </div>
        </div>
        <p className="signature">Desenvolvido por: Gabriel Alves Bottoni © {new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

export default Footer;
