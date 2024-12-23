import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

const AdminSessionExpired = () => {
    const navigation = useNavigate();
    localStorage.removeItem('adminToken');
    return (
        <Modal 
        title="Session Expired" 
        message="Your session has expired. Please log in again to continue." 
        onClose={() => navigation('/admin')} // Redirect to login page
        />
    )
}

export default AdminSessionExpired
