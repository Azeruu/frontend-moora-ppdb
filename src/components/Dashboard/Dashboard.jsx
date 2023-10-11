import { useSelector } from "react-redux";
import './Dashboard.css';

const Dashboard = () => {
  const {user} = useSelector((state) => state.auth);
  const Huruf = (user) => {
    return user.charAt(0).toUpperCase() + user.slice(1);
  };

  return (
    <div className="welcome">
      <h1 className="tittle">Dashboard</h1>
      <h2 className="subtittle">
        Welcome Back <h2 className="nama-user">{user && Huruf(user.username)}</h2>
      </h2>
      <h2 className="role-user">({user && Huruf(user.role)})</h2>
    </div>
  );
}

export default Dashboard