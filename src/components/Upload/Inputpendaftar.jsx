import { useState } from "react";
// import { useNavigate} from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import "./InputPendaftar.css";

const InputPendaftar = ({ isOpen, isClose }) => {
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData); // Menyimpan data Excel ke state
        };

        reader.readAsBinaryString(file);
    };

    const handleSubmit = () => {
        // Kirim data ke server menggunakan fetch/axios
        fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((result) => console.log("Data berhasil dikirim:", result))
        .catch((error) => console.error("Error:", error));
    };

    return (
        isOpen && (
            <div className="modal-data-overlay">
                <div className="modal-data">
                    {/* START Header */}
                    <div className="modal-data-header">
                        <h1>Upload File Excel</h1>
                        <button className="modal-close" onClick={isClose}>
                        &times;
                        </button>
                    </div>
                    {/* END Header */}
                    <h1 className="judul_upload">Upload File</h1>
                    <input className="input_file" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
                    <button className="button_upload" onClick={handleSubmit}>Submit</button>

                    <h2 className="judul_preview">Preview Data</h2>
                    <pre className="preview_data">{JSON.stringify(data, null, 2)}</pre>
                </div>
            </div>
            )
    );
};

export default InputPendaftar;
