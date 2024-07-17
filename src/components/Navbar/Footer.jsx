import {Facebook, Instagram, Twitter} from "feather-icons-react/build/IconComponents"
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer">
      <div className="social">
        <a href="https://twitter.com/"><Twitter /></a>
        <a href="https://instagram.com/"><Instagram /></a>
        <a href="https://facebook.com/"><Facebook /></a>
      </div>
      <div className="links">
        <a href="#hero">Home</a>
        <a href="#about">Tentang Kami</a>
        <a href="#contact">Kontak</a>
      </div>
      <div className="copy">
        <p>Created By Reza .| &copy; 2023</p>
      </div>
    </div>
  )
}

export default Footer