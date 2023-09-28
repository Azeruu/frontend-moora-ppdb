import "./About.css";
import about from "../../image/sekolah1.jpg";

const About = () => {
  return (
    <div className="about" id="about">
      <h2>
        <span>Profil</span> Sekolah
      </h2>
      <div className="row">
        <div className="about-image">
          <img src={about} alt="about" />
        </div>
        <div className="about-text">
          <h3>
            Kenapa <span>SMPN 1</span> Cisoka?
          </h3>
          <p>
            SMPN 1 cisoka adalah salah satu sekolah favorit di kecamatan cisoka yang tentunya telah memiliki banyak prestasi baik di bidang akademik 
            maupun non- akademik, SMPN 1 Cisoka juga banyak melahirkan talenta - talenta dan orang - orang yang dpata berperan penting dalam masayarakat
            karena di didik untuk bersosialisasi dan hdu bermasayarakat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
