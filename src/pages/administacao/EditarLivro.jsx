import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLivro, updateLivro } from '../../services/api';
import axios from 'axios';
import { API_URL } from '../../services/api';
import './EditarLivro.css';

const EditarLivro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState({
    titulo: '',
    autor: '',
    ano: '',
    genero: '',
    image: null,
  });
  const [imagemAtual, setImagemAtual] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        const livroData = await getLivro(id, token);
        console.log('Dados do livro carregados:', livroData);
        setLivro({ ...livroData, image: null });  
        setImagemAtual(livroData.image);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar livro:', error);
        setLoading(false);
      }
    };

    fetchLivro();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setLivro(prev => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', livro.titulo);
    formData.append('autor', livro.autor);
    formData.append('ano', livro.ano);
    formData.append('genero', livro.genero);

    if (livro.image instanceof File) {
      formData.append('image', livro.image);
    }

    try {
      const response = await axios.patch(`${API_URL}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Livro atualizado:', response.data);
      navigate('/admin');
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          name="titulo"
          value={livro.titulo || ''}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Autor</label>
        <input
          type="text"
          name="autor"
          value={livro.autor || ''}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Ano</label>
        <input
          type="text"
          name="ano"
          value={livro.ano || ''}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Gênero</label>
        <input
          type="text"
          name="genero"
          value={livro.genero || ''}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label>Imagem</label>
        {imagemAtual && (
          <div style={{ marginTop: '20px', marginBottom: '20px' }}>
            <img
              src={`http://localhost:3000/uploads/${imagemAtual}`}
              alt="Imagem atual"
              style={{ maxWidth: '200px', borderRadius: '8px' }}
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="form-file-input"
        />
      </div>

      <button type="submit" className="form-button">Salvar</button>
      <button
        type="button"
        className="form-button"
        style={{ backgroundColor: '#6c757d', marginTop: '10px' }}
        onClick={() => navigate(-1)}
      >
        Cancelar
      </button>
    </form>
  );
};

export default EditarLivro;
