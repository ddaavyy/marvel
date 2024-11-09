import './style.css'

import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import BarraDePesquisa from './components/BarraDePesquisa/BarraDePesquisa';
import EscolhaOPersonagem from './components/EscolhaOPersonagem/EscolhaOPersonagem';


function App() {
  const paginaPrincipal = true
  return (
    // Pagina Inicial
    paginaPrincipal ? <>
    <div className='pagina-principal'>
      <Header />
      <Logo />
      <BarraDePesquisa />
      <EscolhaOPersonagem />
    </div></> : 
    // Pagina quando for pesquisar
    <>
    </>
  );
}

export default App;
