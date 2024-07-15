import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../lib/axios";

const EditJalur = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const [jalur, setJalur] = useState({
        nama_jalur:'',
        kode_jalur:''
    });

    useEffect(() => {
        const getJalurById = async () => {
        try {
            const response = await axios.get(`/jalur/${id}`);
            setJalur(response.data);
        } catch (error) {
            if (error.response) {
            setMsg(error.response.data.msg);
            }
        }
        };
        getJalurById();
    }, [id]);
    const setKodeJalurBaru = (newValue) => {
        setJalur({ ...jalur, kode_jalur: newValue });
    };
    const setNamaJalurBaru = (newValue) => {
        setJalur({ ...jalur, nama_jalur: newValue });
    };

    const updateJalur = async (e) => {
        e.preventDefault();
        try {
        await axios.patch(`/jalur/${id}`, {
            kode_jalur: jalur.kode_jalur,
            nama_jalur: jalur.nama_jalur,
        });
        navigate("/jalur");
        } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
        }
    };

    return (
        <div className="edit-jalur-column">
        <div className="form-column">
            <h1 className="edit-jalur-judul">Edit Data Jalur</h1>
            <form onSubmit={updateJalur}>
            <p>{msg}</p>
            <div className="field">
                <label className="label">Kode Jalur</label>
                <div className="control">
                <input
                    type="text"
                    className="input"
                    value={jalur.kode_jalur}
                    onChange={(e) => setKodeJalurBaru(e.target.value)}
                    placeholder="Nama Jalur"
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
                    onChange={(e) => setNamaJalurBaru(e.target.value)}
                    placeholder="Nama Jalur"
                ></input>
                </div>
            </div>
            <div className="btn-field">
                <Link to={`/jalur`} className="action-btn">
                Kembali
                </Link>
                <button type="submit" className="action-btn">
                Update
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default EditJalur;
