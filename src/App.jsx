import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/forms/Login';
import Home from './pages/home/Home';
import DetalheLivro from './pages/detalhe/DetalheLivro';
import Livros from './pages/principal/Livros';
import { useAuth } from './context/AuthContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import Cadastro from './pages/forms/Cadastro';
import ForgotPassword from './pages/forms/ForgotPassword';
import Admin from './pages/administacao/Admin';
import EditarLivro from './pages/administacao/EditarLivro';
import CadastrarLivro from './pages/administacao/CadastrarLivro';

function App() {
  const { token } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/redefinicao" element={<ForgotPassword />} />
          <Route path="/livros" element={token ? <Livros /> : <Navigate to="/login" />} />
          <Route path="/livros/:id" element={token ? <DetalheLivro /> : <Navigate to="/login" />} />
          <Route path="/admin" element={token ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/admin/cadastrar" element={<CadastrarLivro />} />
          <Route path="/admin/editar/:id" element={<EditarLivro />} />
        </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
