import logo from "../../image/react.png"
import "./Login.css"

const Header = () => {
  return (
    <nav className="Navbar">
      <img src={logo} className="nav-logo1" alt="Logo SMP"></img>
      <a href="/" className="nav-logo2">
        PPDB <span>SMP N 1 CISOKA</span>.
      </a>
    </nav>
  )
}

export default Header