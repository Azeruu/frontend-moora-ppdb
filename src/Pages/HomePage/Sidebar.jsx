import "./Sidebar.css";
import { Link } from "react-scroll";
import { Link as Link2 } from "react-router-dom";
import Menu from "feather-icons-react/build/IconComponents/Menu";
import User from "feather-icons-react/build/IconComponents/User";

const Sidebar = (props) => {
  return (
    <nav className={props.toggle ? "sidebar open" : "sidebar"}>
      <div className="sidebar-menu">
        <Menu className="menu" onClick={props.menuOpen} />
        <Link2 to="/login" className="sidebar-login"><User/></Link2>
      </div>
      <div className="sidebar-content">
        <Link
          to="hero"
          style={{ cursor: "pointer" }}
          smooth={true}
          spy={true}
          duration={500}
        >
          Home
        </Link>
        <Link
          to="about"
          style={{ cursor: "pointer" }}
          smooth={true}
          spy={true}
          duration={500}
        >
          Tentang Kami
        </Link>
        <Link
          to="contact"
          style={{ cursor: "pointer" }}
          smooth={true}
          spy={true}
          duration={500}
        >
          Kontak Kami
        </Link>
      </div>
      <div className="credit">
        <p>Created By Reza .| &copy; 2023</p>
      </div>
    </nav>
  );
}

export default Sidebar;