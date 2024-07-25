// import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import "./Kuota.css";

const Kuota = () => {
  const [data, setData] = useState([]);
  const [jalur, setJalur] = useState([]);

  const getData = async () => {
    const response = await axios.get("/quota");
    setData(response.data);
  };
  const getJalur = async () => {
    const response = await axios.get("/jalur");
    setJalur(response.data);
  };

  useEffect(()=>{
    getData();
    getJalur();
  },[]);
  // console.log(data);

  // const {user} = useSelector((state) => state.auth);
  // const Huruf = (user) => {
  //   return user.charAt(0).toUpperCase() + user.slice(1);
  // };

  return (
    <div className="Kuota">
      <div class="kuota-container">
        <h1>Info Kuota PPDB</h1>
        <p className="update-time">Update Terakhir:  </p>
        <div className="quota-container">
          <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>ID</th>
                    <th>Jumlah Quota TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((kuota, index) => (
                    <tr key={kuota.id}>
                        <td>{index+1}</td>
                        <td>{kuota.id}</td>
                        <td>{kuota.total_quota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
        </div>
        <div className="container-table-jalur">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>ID Jalur</th>
                  <th>Kode Jalur</th>
                  <th>Nama Jalur</th>
                  <th>Persentase</th>
                  <th>Jumlah Kuota</th>
                </tr>
              </thead>
              <tbody>
                {jalur.map((jal, index) => (
                  <tr key={jal.id}>
                      <td>{index + 1}</td>
                      <td>{jal.id}</td>
                      <td>{jal.kode_jalur}</td>
                      <td>{jal.nama_jalur}</td>
                      <td>{jal.persentase}</td>
                      <td>{jal.jumlah_kuota}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default Kuota;
