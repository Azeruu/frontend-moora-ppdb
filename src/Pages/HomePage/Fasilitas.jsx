import './Fasilitas.css'
import facility from '../../image/f1.jpg';

const Fasilitas = () => {
  return (
    <div className="fasilitas" id='fasilitas'>
      <h2>
        <span>Galeri</span> Sekolah
      </h2>
      <p>
        Berikut foto - foto dokumentasi dari berbagai kegiatan siswa - siswi SMPM 1 cisoka, serta foto lingkungan sekolah.
      </p>
      <div className="row">
        <div className="card">
          <img src={facility} alt="fasilitas"></img>
          <p className="card-title">
            - <span>Koridor</span> -
          </p>
          <p>dilengkapi dengan koridor yang nyaman</p>
        </div>
        <div className="card">
          <img src={facility} alt="fasilitas"></img>
          <p className="card-title">
            - <span>Koridor</span> -
          </p>
          <p>dilengkapi dengan koridor yang nyaman</p>
        </div>
        <div className="card">
          <img src={facility} alt="fasilitas"></img>
          <p className="card-title">
            - <span>Koridor</span> -
          </p>
          <p>dilengkapi dengan koridor yang nyaman</p>
        </div>
      </div>
    </div>
  );
}

export default Fasilitas