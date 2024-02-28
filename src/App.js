import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Base";
import Dashboard from "./components/Dashboard/PageDashboard";
import UserList from "./components/User/PageUsers";
import AddUser from "./components/User/AddUser";
import EditUser from "./components/User/EditUser";
import Alternatif from "./components/Alternatif/PageSiswa";
import AddAlternatif from "./components/Alternatif/PageAddSiswa";
import EditAlternatif from "./components/Alternatif/PageEditSiswa";
import Jalur from "./components/Jalur/PageJalur";
import AddJalur from "./components/Jalur/AddJalur";
import EditJalur from "./components/Jalur/EditJalur";
import AddKriteria from "./components/Kriteria/PageAddKriteria"
import ListKriteria from "./components/Kriteria/PageListKriteria";
import EditKriteria from "./components/Kriteria/PageEditKriteria";
import NilaiAlternatif from "./components/Nilai_Alternatif/PageRekapNilai";
import Hasil from "./components/Hasil/PageHasil";

function App() {
  return (
    <div className="Body">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* User */}
          <Route path="/userlist" element={<UserList />} />
          <Route path="/userlist/adduser" element={<AddUser />} />
          <Route path="/userlist/edituser/:id" element={<EditUser />} />
          {/* Alternatif */}
          <Route path="/alternatif" element={<Alternatif />} />
          <Route path="/alternatif/addAlternatif" element={<AddAlternatif />} />
          <Route path="/alternatif/editAlternatif/:id" element={<EditAlternatif />} />
          {/* Kriteria */}
          <Route path="/kriteria" element={<ListKriteria />} />
          <Route path="/kriteria/addKriteria/" element={<AddKriteria />} />
          <Route path="/kriteria/editKriteria/:id" element={<EditKriteria />} />
          {/* Nilai ALternatif */}
          <Route path="/nilai_alternatif" element={<NilaiAlternatif />} />
          {/* Jalur */}
          <Route path="/jalur" element={<Jalur />} />
          <Route path="/jalur/addjalur" element={<AddJalur />} />
          <Route path="/jalur/editjalur/:id" element={<EditJalur />} />
          {/* Hasil */}
          <Route path="/hasil" element={<Hasil />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;