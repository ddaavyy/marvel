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
import DetalhesPersonagem from './components/DetalhesPersonagem/DetalhesPersonagem.tsx';

function App() {
  // Tema Dark e Light
  const [temaAtual, setTemaAtual] = useState('Dark')
  const [background, setBackground] = useState(imgDark)
  const [color, setColor] = useState('white')
  const [temaicon, setTemaIcon] = useState("invert(0%)")
  const [lado, setLado] = useState("direito")
const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
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

  const irParaDetalhes = (personagem) => {
    setPersonagemSelecionado(personagem); // Atualiza o estado com os dados do personagem
    setPaginaPrincipal(3); // Vai para a página 3, mas mantém o estado da pesquisa
  };

// -------------------------------------------------------

// Barra de pesquisa
const [inputValue, setInputValue] = useState("");
const [searchQuery, setSearchQuery] = useState(""); 

const handleInputChange = (query) => {
  setInputValue(query);
};

const handleSearchClick = () => {
  setSearchQuery(inputValue);
  setPaginaPrincipal(2)
};
// ---------------------------------------------------------


  return (
    // Pagina Inicial
    paginaPrincipal === 1 ? <>
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className='pagina-principal'>
        <header className={'header' + (lado === "esquerdo" ? " direito" : "")}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
        <Logo logo={(paginaPrincipal === 2 ? "imgLogo-2" : "imgLogo-1")}/>
        <BarraDePesquisa 
          inputValue={inputValue} 
          onInputChange={handleInputChange} 
          onSearchClick={handleSearchClick} 
          handlePrincipal={updatePagina} 
          pagina={(paginaPrincipal === 2 ? "barradepesquisa-2" : "barradepesquisa-1")} 
          botao={(paginaPrincipal === 2 ? "botaolupaprocurar-2" : "botaolupaprocurar-1")}
          lupa={(paginaPrincipal === 2 ? "lupa-2" : "lupa-1")}
        />
      <EscolhaOPersonagem />
    </div></> : paginaPrincipal === 2 ?
    // Pagina quando for pesquisar
    <>
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className={`pagina-principal ${paginaPrincipal === 2 || paginaPrincipal === 3 ? (temaAtual === "Dark" ? 'fundo-escuro' : 'fundo-claro') : ''}`}>
      
        <header className={'header esquerdo'}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
      <Logo logo={(paginaPrincipal === 2 ? "imgLogo-2" : "imgLogo-1")}/>
      <BarraDePesquisa 
        inputValue={inputValue} 
        onInputChange={handleInputChange} 
        onSearchClick={handleSearchClick} 
        handlePrincipal={updatePagina} 
        pagina={(paginaPrincipal === 2 ? "barradepesquisa-2" : "barradepesquisa-1")} 
        botao={(paginaPrincipal === 2 ? "botaolupaprocurar-2" : "botaolupaprocurar-1")}
        lupa={(paginaPrincipal === 2 ? "lupa-2" : "lupa-1")}
      />
      <Resultados 
        searchQuery={searchQuery} 
        onPersonagemClick={irParaDetalhes} 
        temaAtual={temaAtual}
      />
    </div>
    </> : 
    // Pagina especifica
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className={`pagina-principal ${paginaPrincipal === 2 || paginaPrincipal === 3 ? (temaAtual === "Dark" ? 'fundo-escuro' : 'fundo-claro') : ''}`}>
        <header className={'header esquerdo'}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
      <Logo logo={(paginaPrincipal === 1 ? "imgLogo-1" : "imgLogo-2")}/>
      <BarraDePesquisa 
        inputValue={inputValue} 
        onInputChange={handleInputChange} 
        onSearchClick={handleSearchClick} 
        handlePrincipal={updatePagina} 
        pagina={(paginaPrincipal === 1 ? "barradepesquisa-1" : "barradepesquisa-2")} 
        botao={(paginaPrincipal === 1 ? "botaolupaprocurar-1" : "botaolupaprocurar-2")}
        lupa={(paginaPrincipal === 1 ? "lupa-1" : "lupa-2")}
      />
      <div className="container-personagem-detalhes">
      {personagemSelecionado ? (
         <DetalhesPersonagem personagem={personagemSelecionado} temaAtual={temaAtual} />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
      </div>
  );
}

export default App;
