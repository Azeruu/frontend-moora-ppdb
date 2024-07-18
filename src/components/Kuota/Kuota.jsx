// import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import "./Kuota.css";

const Kuota = () => {
  const [data, setData] = useState(null);
  // const getData = async () => {
  //   const response = await axios.get("/quota");
  //   setData(response.data);
  // };
  // const {user} = useSelector((state) => state.auth);
  // const Huruf = (user) => {
  //   return user.charAt(0).toUpperCase() + user.slice(1);
  // };

  return (
    <div className="Kuota">
      <div class="kuota-container">
        <h1>Info Kuota PPDB</h1>
        {/* <p className="update-time">Update Terakhir: {data.update}</p> */}
        {/* <div className="quota-container">
          {data.map((item, index) => (
            <div className="quota-item" key={index}>
              <h3>{item.nama_jalur}</h3>
              <p><strong>{item.filled}/{item.jumlah_quota}</strong></p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${item.percentage}%` }}></div>
              </div>
              <p>{item.percentage}%</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default Kuota;
