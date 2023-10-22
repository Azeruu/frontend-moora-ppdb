import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Base";
// import Home from "./Pages/HomePage/Home";
import Dashboard from "./components/Dashboard/PageDashboard";
import UserList from "./components/User/PageUsers";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import Siswa from "./components/Siswa/PageSiswa";
import AddSiswa from "./components/Siswa/PageAddSiswa";
import EditSiswa from "./components/Siswa/PageEditSiswa";
import AddNilai from "./components/Nilai/PageNilai"
import Jalur from "./components/Jalur/PageJalur";
import AddJalur from "./components/Jalur/AddJalur";
import Aspek from "./components/Aspek/PageAspek";
import AddAspek from "./components/Aspek/AddAspek";
import Hasil from "./components/Hasil/PageHasil";

function App() {
  return (
    <div className="Body">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userlist/adduser" element={<AddUser />} />
          <Route path="/userlist/edituser/:id" element={<EditUser />} />
          <Route path="/siswalist" element={<Siswa />} />
          <Route path="/siswalist/addsiswa" element={<AddSiswa />} />
          <Route path="/siswalist/addnilai" element={<AddNilai />} />
          <Route path="/siswalist/editsiswa/:id" element={<EditSiswa />} />
          <Route path="/aspek" element={<Aspek />} />
          <Route path="/aspek/addaspek" element={<AddAspek />} />
          {/* <Route path="/aspek/editaspek/:id" element={<Aspek />} /> */}
          <Route path="/jalur" element={<Jalur />} />
          <Route path="/jalur/addjalur" element={<AddJalur />} />
          {/* <Route path="/jalur/editjalur/:id" element={<Jalur />} /> */}
          <Route path="/hasil" element={<Hasil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;