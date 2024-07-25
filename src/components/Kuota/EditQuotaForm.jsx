import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "../../lib/axios";
// import EditJalur from "../Jalur/EditJalurForm";

const EditQuota = () => {
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const [quotaTotal, setQuotaTotal] = useState({
        total_quota:''
    });
    const getQuota = async () => {
        const response = await axios.get("/quota");
        setQuotaTotal(response.data);
    };

    // useEffect(()=> {
    //     getQuota();
    // },[]);
    
    useEffect(() => {
        const getQuotaById = async () => {
        try {
            const response = await axios.get(`/quota/${id}`);
            setQuotaTotal(response.data);
        } catch (error) {
            if (error.response) {
            setMsg(error.response.data.msg);
            }
        }
        };
        getQuotaById();
        getQuota();
    }, [id]);

    const setQuotaBaru = (newValue) => {
        setQuotaTotal({ ...quotaTotal, total_quota: newValue });
    };

    const updateQuota = async (e) => {
        e.preventDefault();
        try {
        await axios.patch(`/quota/${id}`, {
            total_quota: quotaTotal.total_quota,
        });
        // EditJalur(null, kode_jalur, nama_jalur, persentase, jumlah_kuota);
        navigate("/kuota/admin");
        } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
        }
    };

    return (
        <div className="edit-jalur-column">
        <div className="form-column">
            <h1 className="edit-jalur-judul">Edit Total Quota</h1>
            <form onSubmit={updateQuota}>
            <p>{msg}</p>
            <div className="field">
                <label className="label">Total Quota Pendaftaran</label>
                <div className="control">
                <input
                    type="text"
                    className="input"
                    value={quotaTotal.total_quota}
                    onChange={(e) => setQuotaBaru(e.target.value)}
                    placeholder="Jumlah Quota baru"
                ></input>
                </div>
            </div>
            <div className="btn-field">
                <Link to={`/kuota/admin`} className="action-btn">
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

export default EditQuota;
