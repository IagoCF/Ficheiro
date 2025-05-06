import { Navigate } from 'react-router-dom';

const rotaPrivada = ({ children }) => {
  const user = localStorage.getItem('usuario'); // Verifica se o usuário está logado

  if (!user) {
    return <Navigate to="/login" replace />; // Redireciona para /login se não estiver logado
  }

  return children; // Renderiza o componente filho se o usuário estiver logado
};

export default rotaPrivada;