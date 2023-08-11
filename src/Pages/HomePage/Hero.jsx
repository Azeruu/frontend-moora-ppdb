import "./Hero.css";
import bg from "../../image/hero-bg.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero" id="hero" name="hero" style={{ backgroundImage: `url(${bg})` }}>
      <div className="content">
        <h1>
          Penerimaan Murid Baru <span>SMPN 1 Cisoka</span>.
        </h1>
        <p>
          Website penerimaan murid baru smpn 1 cisoka yang dibuat untuk
          memudahkan para calon siswa untuk medaftar secara online
        </p>
        <Link to="/daftar" className="cta">Daftar</Link>
      </div>
    </div>
  );
};

export default Hero;