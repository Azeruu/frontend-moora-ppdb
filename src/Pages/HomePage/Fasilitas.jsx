import './Fasilitas.css'
import facility from '../../image/f1.jpg';
import facility2 from '../../image/sekolah2.jpg';
import facility3 from '../../image/sekolah3.jpg';

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
          <img src={facility} width="550" height="500" alt="fasilitas"></img>
          <p className="card-title">
            - <span>Koridor</span> -
          </p>
          <p>dilengkapi dengan koridor yang nyaman</p>
        </div>
        <div className="card">
          <img src={facility2} width="550" height="500" alt="fasilitas"></img>
          <p className="card-title">
            - <span>Mushole</span> -
          </p>
          <p>Terdapat Mushola untuk umat muslim beribadah</p>
        </div>
        <div className="card">
          <img src={facility3} width="550" height="500" alt="fasilitas"></img>
          <p className="card-title">
            - <span>Ekstra kulikuler</span> -
          </p>
          <p>Terdapat banyak pilihan Extra Kulikuler untuk siswa mengembangkan bakatnya</p>
        </div>
      </div>
    </div>
  );
}

export default Fasilitas