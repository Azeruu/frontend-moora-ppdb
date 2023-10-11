import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Base";
// import Home from "./Pages/HomePage/Home";
import HasilPage from "./components/Hasil/PageHasil";
import Pendaftaran from "./components/Siswa/PageSiswa";
import UserList from "./components/User/PageUsers";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import AddSiswa from "./components/Siswa/AddSiswa";
import EditSiswa from "./components/Siswa/EditSiswa";
import Dashboard from "./components/Dashboard/PageDashboard";
import PageJalur from "./components/Jalur/PageJalur";
import AddJalur from "./components/Jalur/AddJalur";
import PageAspek from "./components/Aspek/PageAspek";
import AddAspek from "./components/Aspek/AddAspek";
import DaftarPage from "./components/Daftar/PageDaftar";
import DaftarPage2 from "./components/Daftar/PageDaftar2";

function App() {
  return (
    <div className="Body">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aspek" element={<PageAspek />} />
          <Route path="/aspek/addaspek" element={<AddAspek />} />
          <Route path="/aspek/editaspek/:id" element={<PageAspek />} />
          <Route path="/jalur" element={<PageJalur />} />
          <Route path="/jalur/addjalur" element={<AddJalur />} />
          <Route path="/jalur/editjalur/:id" element={<PageJalur />} />
          <Route path="/daftar" element={<DaftarPage />} />
          <Route path="/daftar2" element={<DaftarPage2 />} />
          <Route path="/hasil" element={<HasilPage />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userlist/adduser" element={<AddUser />} />
          <Route path="/userlist/edituser/:id" element={<EditUser />} />
          <Route path="/pendaftaran/addsiswa" element={<DaftarPage />} />
          <Route path="/pendaftaran/editsiswa/:id" element={<EditSiswa />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;