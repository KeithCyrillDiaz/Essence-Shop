import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem('adminToken'));
  return isAuthenticated ? children : <Navigate to="/admin" />;
};

AdminProtectedRoute.propTypes = {
    children: PropTypes.node
}

export default AdminProtectedRoute;