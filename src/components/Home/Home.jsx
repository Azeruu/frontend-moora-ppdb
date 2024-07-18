// import { useSelector } from "react-redux";
import logo from "../../image/SMPN1CSK.png";
import "./Home.css";

const Home = () => {
  // const {user} = useSelector((state) => state.auth);
  // const Huruf = (user) => {
  //   return user.charAt(0).toUpperCase() + user.slice(1);
  // };

  return (
    <div className="home">
      <div class="content">
          <img src={logo} alt="Logo Kabupaten" class="logo"/>
          <h1>PPDB SMPN 1 Cisoka tahun 2024</h1>
          <button>Daftar</button>
          <p>Silakan cek jadwal di bawah ini untuk informasi lebih lanjut</p>
          <div class="schedule">
              <div class="schedule-item">
                  <h3>Pra PPDB SMP - Uji Coba</h3>
                  <p>12 - 21 Juni 2024</p>
              </div>
              <div class="schedule-item">
                  <h3>Pendaftaran jalur zonasi, Afirmasi & PTO</h3>
                  <p>24 - 26 Juni 2024</p>
              </div>
              <div class="schedule-item">
                  <h3>Pengolahan data jalur zonasi, Afirmasi & PTO</h3>
                  <p>27 Juni 2024</p>
              </div>
              <div class="schedule-item">
                  <h3>Rapat Pleno</h3>
                  <p>28 Juni 2024</p>
              </div>
              <div class="schedule-item">
                  <h3>Pengumuman jalur zonasi, Afirmasi & PTO</h3>
                  <p>1 Juli 2024</p>
              </div>
              <div class="schedule-item">
                  <h3>Pendaftaran ulang</h3>
                  <p>2 - 3 Juli 2024</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
