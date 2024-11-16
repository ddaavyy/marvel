import "./BarraDePesquisa.css"
import lupa from "../../images/lupa.png"

const BarraDePesquisa = (props) => {

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            props.handlePrincipal();
        }
      }

    const pesquisar = (e) => {
        e.preventDefault()
    } 

    return (
        <form onSubmit={pesquisar}>
            <input 
            value={props.inputValue}
            onChange={(e) => props.onInputChange(e.target.value)}
            onKeyDown={_handleKeyDown} 
            type="text" 
            className={props.pagina} 
            placeholder="Pesquisar" ></input>
            <button className={props.botao} onClick={() => { props.handlePrincipal(); props.onSearchClick(); }}>
                <img src={lupa} alt="" className={props.lupa}/>
            </button>
        </form>
    )
}

export default BarraDePesquisa