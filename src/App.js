import './style.css'

import Logo from "./components/Logo/Logo";
import BarraDePesquisa from './components/BarraDePesquisa/BarraDePesquisa';
import EscolhaOPersonagem from './components/EscolhaOPersonagem/EscolhaOPersonagem';

import "./components/Header/Header.css"
import tema from "./images/tema.png"
import imgDark from "./images/fundo-tema-dark.jpeg";
import imgLight from "./images/fundo-tema-light.jpeg";

import { useState } from "react"

function App() {
  const paginaPrincipal = true
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
  return (
    // Pagina Inicial
    paginaPrincipal ? <>
    <div style={{backgroundImage: `url(${background})`, color: `${color}`}} className='pagina-principal'>
        <header className={'header' + (lado === "esquerdo" ? " direito" : "")}>
            <img style={{filter: `${temaicon}`}} src={tema} alt="Icone Tema" className="imgTema"/>
            <button style={{color: `${color}`}} className="mudartema" onClick={() => {mudarTema()}}>Tema {temaAtual} <p>mudar tema</p></button>
        </header>
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
