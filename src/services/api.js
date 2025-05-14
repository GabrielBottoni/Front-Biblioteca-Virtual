import axios from 'axios';

export const API_URL = 'http://localhost:3000/livros'; // Ajuste conforme necessário

export const getAllLivros = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar livros:', error.message);
        throw new Error('Erro ao buscar livros');
    }
};

export const getLivro = async (id) => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(`${API_URL}/${id}`, {  // Aqui você inclui o id na URL
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error(`Erro ao buscar livro com id ${id}:`, error.message);
        throw new Error(`Erro ao buscar livro com id ${id}`);
    }
};

export const createLivro = async (livroData, imageFile) => {
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('titulo', livroData.titulo);
    formData.append('autor', livroData.autor);
    formData.append('ano', livroData.ano);
    formData.append('genero', livroData.genero);
    formData.append('image', imageFile);

    try {
        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data; 
    } catch (error) {
        console.error('Erro ao criar livro:', error.message);
        throw new Error('Erro ao criar livro');
    }
};


export const updateLivro = async (id, livroData, token) => {
    const formData = new FormData();

    formData.append('titulo', livroData.titulo);
    formData.append('autor', livroData.autor);
    formData.append('ano', livroData.ano);
    formData.append('genero', livroData.genero);

    if (livroData.image instanceof File) {
        console.log("Imagem recebida no update:", livroData.image);
        console.log("É File?", livroData.image instanceof File);
        formData.append('image', livroData.image);
    }

    try {
        const response = await axios.patch(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar livro com id ${id}:`, error.message);
        throw new Error(`Erro ao atualizar livro com id ${id}`);
    }
};


export const deleteLivro = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao excluir livro com id ${id}:`, error.message);
        throw new Error(`Erro ao excluir livro com id ${id}`);
    }
};

export const getAllUsuarios = async (token) => {

    try {
        const response = await axios.get('http://localhost:3000/users/admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; 
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        throw new Error('Erro ao buscar usuários');
    }
};

export const alterarFuncao = async (id) => {
  try {
    await axios.put(
      `http://localhost:3000/edit/users/admin/${id}/toggle-role`, 
      {}, 
      { headers: { Authorization: `Bearer ${token}` } } 
    );

    const atualizados = await getAllUsuarios(token);  
    setUsuarios(atualizados);  

    toast.success("Função do usuário alterada com sucesso!");
  } catch (error) {
   
    console.error('Erro ao alterar função do usuário:', error);
    toast.error("Erro ao alterar a função. Tente novamente.");
  }
};