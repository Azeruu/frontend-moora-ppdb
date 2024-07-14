import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "../../lib/axios";

const AddJalur = () => {
    const [jalur, setJalur] = useState({
      nama_jalur:'',
      kode_jalur:''
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveJalur = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('/jalur',{
                nama_jalur : jalur.nama_jalur,
                kode_jalur : jalur.kode_jalur,
            });
            navigate("/jalur");
        } catch (error) {
            if (error.response){
              setMsg(error.response.data.msg)
            }
        }
    }
    const setKodeJalur = (newValue) => {
      setJalur({ ...jalur, kode_jalur: newValue });
    };
    const setNamaJalur = (newValue) => {
      setJalur({ ...jalur, nama_jalur: newValue });
    };

  return (
    <div className="add-jalur-column">
      <h1 className="add-jalur-judul">Tambah Jalur</h1>
      <form onSubmit={saveJalur}>
        <p>{msg}</p>
        <div className="field">
          <label className="label">Kode Jalur</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={jalur.kode_jalur}
              onChange={(e) => setKodeJalur(e.target.value)}
              placeholder="kode jalur"
            ></input>
          </div>
        </div>
        <div className="field">
          <label className="label">Nama Jalur</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={jalur.nama_jalur}
              onChange={(e) => setNamaJalur(e.target.value)}
              placeholder="nama jalur"
            ></input>
          </div>
        </div>

        <div className="btn-field">
          <Link to={`/jalur`} className="action-btn">
            Kembali
          </Link>
          <button type="submit" className="action-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddJalur