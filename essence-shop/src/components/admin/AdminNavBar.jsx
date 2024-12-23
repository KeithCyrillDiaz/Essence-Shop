import { useNavigate } from "react-router-dom";

const AdminNavBar = () => {

    const navigate = useNavigate();
    const handleLogOut = () => {
      localStorage.removeItem('adminToken');
        navigate('/admin')
        return
    }

  return (
    <div className="adminNavBar">
      <h2>Essence Shop Admin</h2>
      <button onClick={handleLogOut}>LOG OUT</button>
    </div>
  )
}

export default AdminNavBar
