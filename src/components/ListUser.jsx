import "./css/ListUser.css";
// import DashboardMenu from "../Dashboard/DashboardMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [jmlData, setJmlData] = useState(0);
  const [banyakData, setBanyakData] = useState(5);

  useEffect(()=> {
    getUsers();
  },[]);
  useEffect(() => {
    jumlahData();
  }, []);
  const tambahbatas = () => {
    setBanyakData(banyakData + 1);
  };
  const kurangibatas = () => {
    setBanyakData(banyakData - 1);
  };

  const jumlahData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async() =>{
    const response = await axios.get('http://localhost:5000/users');
    setUsers(response.data);
  }
  const hapusUser = async (uuid) =>{
    try {
      await axios.delete(`http://localhost:5000/users/${uuid}`);
        getUsers();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns">
      <div className="column">
        <h1 className="daftaruser">Daftar User</h1>
        <Link to={`/userlist/adduser`} className="btnadd">
          Tambah User
        </Link>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>ID User</th>
                <th>UUID User</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, banyakData).map((user, index) => (
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.uuid}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link
                      to={`/userlist/edituser/${user.uuid}`}
                      className="btnEdit"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => hapusUser(user.uuid)}
                      className="btnHapus"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
          <label className="VLabel">View List</label>
        <div className="atur-jumlah">
          <button className="btn-data" onClick={kurangibatas}>
            -
          </button>
          <input className="input-banyakdata"
            onChange={(e) => setBanyakData(e.target.value)}
            value={banyakData}
            type="number"
          ></input>
          <button className="btn-data" onClick={tambahbatas}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListUser