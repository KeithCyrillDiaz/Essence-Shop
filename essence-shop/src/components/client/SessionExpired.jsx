import { useNavigate } from "react-router-dom";
import { Modal } from "..";

const SessionExpired = () => {
    const navigation = useNavigate();
    localStorage.clear();
    return (
        <Modal 
        title="Session Expired" 
        message="Your session has expired. Please log in again to continue." 
        onClose={() => navigation('/login')} // Redirect to login page
        />
    )
}

export default SessionExpired