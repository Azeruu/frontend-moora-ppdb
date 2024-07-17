import Header from "../Navbar/Header.jsx"
import FormLogin from "./FormLogin.jsx"
import Footer from "../Navbar/Footer.jsx"
import "./Login.css"

const Base = () => {
  return (
    <div className="login-container">
    <Header/>
    <FormLogin/>
    <Footer/>
    </div>
  )
}

export default Base
