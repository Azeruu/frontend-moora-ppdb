import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "../../lib/axios";

const AddJalur = () => {
    const [jalur, setJalur] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const saveJalur = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('/jalur',{
                nama_jalur : jalur,
            });
            navigate("/jalur");
        } catch (error) {
            if (error.response){
              setMsg(error.response.data.msg)
            }
        }
    }

  return (
    <div className="add-jalur-column">
      <h1 className="add-jalur-judul">Tambah Jalur</h1>
      <form onSubmit={saveJalur}>
        <p>{msg}</p>
        <div className="field">
          <label className="label">Nama Jalur</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={jalur}
              onChange={(e) => setJalur(e.target.value)}
              placeholder="Jalur Masuk"
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