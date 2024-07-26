import {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from "../../lib/axios";

const AddQuota = () => {
    const [quotaTotal, setQuotaTotal] = useState({
      total_quota:''
    });
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    // console.log(quotaTotal[0]?.total_quota);

    const saveQuota = async (e) =>{
        e.preventDefault();
        try {
            await axios.post('/quota',{
                total_quota : quotaTotal.total_quota
            });
            alert("Data Kuota Berhasil Di Tambah")
            navigate("/kuota/admin");
        } catch (error) {
            if (error.response){
              setMsg(error.response.data.msg)
            }
        }
    }
    const setQuota = (newValue) => {
      setQuotaTotal({ ...quotaTotal, total_quota: newValue });
    };
    

  return (
    <div className="add-jalur-column">
      <h1 className="add-jalur-judul">Tambah Jalur</h1>
      <form onSubmit={saveQuota}>
        <p>{msg}</p>
        <div className="field">
          <label className="label">Total Kuota Pendaftaran</label>
          <div className="control">
            <input
              type="text"
              className="input"
              value={quotaTotal.total_quota}
              onChange={(e) => setQuota(e.target.value)}
              placeholder="Quota Total Pendaftaran"
            ></input>
          </div>
        </div>
        <div className="btn-field">
          <Link to={`/kuota/admin`} className="action-btn">
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

export default AddQuota