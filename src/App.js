import './style.css'

import Logo from "./components/Logo/Logo";
import BarraDePesquisa from './components/BarraDePesquisa/BarraDePesquisa';
import EscolhaOPersonagem from './components/EscolhaOPersonagem/EscolhaOPersonagem';

import "./components/Header/Header.css"
import tema from "./images/tema.png"
import imgDark from "./images/fundo-tema-dark.jpeg";
import imgLight from "./images/fundo-tema-light.jpeg";

import { useState } from "react"
import Resultados from './components/Resultados/Resultados.tsx';

function App() {
  // Tema Dark e Light
  const [temaAtual, setTemaAtual] = useState('Dark')
  const [background, setBackground] = useState(imgDark)
  const [color, setColor] = useState('white')
  const [temaicon, setTemaIcon] = useState("invert(0%)")
  const [lado, setLado] = useState("direito")
  const mudarTema = () => {
      temaAtual === 'Dark' ? setTemaAtual("Light") : setTemaAtual("Dark")
      background === imgDark ? setBackground(imgLight) : setBackground(imgDark)
      color === 'white' ? setColor('black') : setColor('white')
      temaicon === "invert(0%)" ? setTemaIcon("invert(100%)") : setTemaIcon("invert(0%)")
      lado === "direito" ? setLado("esquerdo") : setLado("direito")
  }
// ------------------------------------------------------

//Saindo da Pagina inicial
  const [paginaPrincipal, setPaginaPrincipal] = useState(1)
  const updatePagina = () => {
    paginaPrincipal === 1 ? setPaginaPrincipal(2) : console.log()
  }

// -------------------------------------------------------

const [searchQuery, setSearchQuery] = useState(""); 

  // Função que será chamada quando a pesquisa mudar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };


  return (
    // Pagina Inicial
    paginaPrincipal === 1 ? <>
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className='pagina-principal'>
        <header className={'header' + (lado === "esquerdo" ? " direito" : "")}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
        <Logo logo={(paginaPrincipal === 2 ? "imgLogo-2" : "imgLogo-1")}/>
      <BarraDePesquisa onSearch={handleSearch} handlePrincipal={updatePagina} pagina={(paginaPrincipal === 2 ? "barradepesquisa-2" : "barradepesquisa-1")} botao={(paginaPrincipal === 2 ? "botaolupaprocurar-2" : "botaolupaprocurar-1")}
      lupa={(paginaPrincipal === 2 ? "lupa-2" : "lupa-1")}/>
      <EscolhaOPersonagem />
    </div></> : paginaPrincipal === 2 ?
    // Pagina quando for pesquisar
    <>
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className='pagina-principal'>
        <header className={'header esquerdo'}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
      <Logo logo={(paginaPrincipal === 2 ? "imgLogo-2" : "imgLogo-1")}/>
      <BarraDePesquisa onSearch={handleSearch} handlePrincipal={updatePagina} pagina={(paginaPrincipal === 2 ? "barradepesquisa-2" : "barradepesquisa-1")} botao={(paginaPrincipal === 2 ? "botaolupaprocurar-2" : "botaolupaprocurar-1")}
      lupa={(paginaPrincipal === 2 ? "lupa-2" : "lupa-1")}/>

      <Resultados searchQuery={searchQuery}/>
    </div>
    </> : <>
    </>
  );
}

export default App;
