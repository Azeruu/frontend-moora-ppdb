import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./editBukti.css";

const EditBukti = () => {
    const {id} = useParams();
    const [file, setFile] = useState({
        dataSiswaId: id,
        ijazah_sk: '',
        kartu_keluarga: '',
        akta_kelahiran: '',
        SS_lulus_dapodik: '',
    });
    const [fileLama, setFileLama] = useState({
        dataSiswaId: id,
        ijazah_sk: '',
        kartu_keluarga: '',
        akta_kelahiran: '',
        SS_lulus_dapodik: '',
    });
    const navigate = useNavigate();
    useEffect(()=>{
        getBuktiById();
    },[]);

    const getBuktiById = async () => {
        try {
        const response = await axios.get(`http://localhost:5000/bukti/${id}`);
        console.log(response.data);
        const urlFileLama = response.data;
        setFileLama({
            ijazah_sk: urlFileLama.url_ijazah,
            kartu_keluarga: urlFileLama.url_kk,
            akta_kelahiran: urlFileLama.url_akta,
            SS_lulus_dapodik: urlFileLama.url_dapodik,
        });
        } catch (error) {
        console.log('Error fetching data:', error.message);
        }
    };

    const handleFileChange = async(e) => {
        const { name, files } = e.target;
        setFile((prevFileState) => ({
            ...prevFileState,
            [name]: files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataForApi = new FormData();
        formDataForApi.append('dataSiswaId', file.dataSiswaId);
        formDataForApi.append('ijazah_sk', file.ijazah_sk);
        formDataForApi.append('kartu_keluarga', file.kartu_keluarga);
        formDataForApi.append('akta_kelahiran', file.akta_kelahiran);
        formDataForApi.append('SS_lulus_dapodik', file.SS_lulus_dapodik);

        try {
            await axios.patch(`http://localhost:5000/bukti/${id}`, formDataForApi,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            });
            // Reset form data setelah data di submit
            setFile({
                dataSiswaId: '',
                ijazah_sk: '',
                kartu_keluarga: '',
                akta_kelahiran: '',
                SS_lulus_dapodik: '',
            });
            navigate("/dashboard");
            alert("selamat Kamu telah berhasi melakukan Pendaftaran");
            } catch (error) {
            console.error('Error submitting data:', error.message);
        }
    };

    return (
        <div className='addbukti-container'>
            <form onSubmit={handleSubmit}>
            <div className='addbukti-form'>
            <h2 className="addbukti-judul-form">Edit Bukti Pendaftaran</h2>
                <div className='bukti-input-box'>
                    <label className="bukti-label">Siswa ID</label>
                    <input type='text' name="dataSiswaId" className="bukti-input-id" value={id} readOnly />
                </div>
                <div className="bukti-file-container">
                    {/* INPUT UNTUL FILE IJAZAH */}
                    <div className="bukti-file">
                        <label className='bukti-label'> Ijazah SK : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="ijazah_sk" onChange={handleFileChange}/></label>
                        {file.ijazah_sk && (
                            <figure>
                                <img src={URL.createObjectURL(file.ijazah_sk)} alt="file Ijazah SK" />
                                <figcaption>Ijazah SK</figcaption>
                            </figure>
                        )}
                        {!file.ijazah_sk && fileLama.ijazah_sk && (
                            <figure>
                                <img src={fileLama.ijazah_sk} alt="file Ijazah SK" />
                                <figcaption>Ijazah SK</figcaption>
                            </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE KARTU KELUARGA */}
                    <div className="bukti-file">
                        <label className='bukti-label'>Kartu Keluarga : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="kartu_keluarga" onChange={handleFileChange} /></label>
                        {file.kartu_keluarga && (
                            <figure>
                                <img src={URL.createObjectURL(file.kartu_keluarga)} alt="Kartu Keluarga" />
                                <figcaption>Kartu Keluarga</figcaption>
                            </figure>
                        )}
                        {!file.kartu_keluarga && fileLama.kartu_keluarga && (
                            <figure>
                                <img src={fileLama.kartu_keluarga} alt="file Ijazah SK" />
                                <figcaption>Kartu Keluarga</figcaption>
                            </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE AKTA KELAHIRAN */}
                    <div className="bukti-file">
                        <label className='bukti-label'>Akta Kelahiran : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="akta_kelahiran" onChange={handleFileChange}/></label>
                        {file.akta_kelahiran && (
                        <figure>
                            <img src={URL.createObjectURL(file.akta_kelahiran)} alt="Akta Kelahiran" />
                            <figcaption>Akta Kelahiran</figcaption>
                        </figure>
                        )}
                        {!file.akta_kelahiran && fileLama.akta_kelahiran && (
                            <figure>
                                <img src={fileLama.akta_kelahiran} alt="file Ijazah SK" />
                                <figcaption>Akta Kelahiran</figcaption>
                            </figure>
                        )}
                    </div>
                    {/* INPUT UNTUK FILE SS LULUS DARI DAPODIK */}
                    <div className="bukti-file">
                        <label className='bukti-label'>ScreenShoot Lulus Dari Dapodik : <input type="file" accept=".pdf, .jpg, .jpeg, .png" name="SS_lulus_dapodik" onChange={handleFileChange}/></label>
                        {file.SS_lulus_dapodik && (
                            <figure>
                                <img src={URL.createObjectURL(file.SS_lulus_dapodik)} alt="SS Lulus Dapodik" />
                                <figcaption>SS Lulus Dapodik</figcaption>
                            </figure>
                        )}
                        {!file.SS_lulus_dapodik && fileLama.SS_lulus_dapodik && (
                            <figure>
                                <img src={fileLama.SS_lulus_dapodik} alt="file Ijazah SK" />
                                <figcaption>SS Lulus Dapodik</figcaption>
                            </figure>
                        )}
                    </div>
                </div>

                <button type="submit" className='btnadd'>Submit Data</button>
            </div>
            </form>
        </div>
    );
};

export default EditBukti;
