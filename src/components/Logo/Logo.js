import './Logo.css'
import logo from '../../images/logo.png'

const Logo = (props) => {
    return (
    <img src={logo} alt="Icone Logo" className={props.logo}/>
    )
} 

export default Logo