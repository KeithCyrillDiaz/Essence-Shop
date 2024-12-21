import { Navigate } from "react-router-dom";
import assignTypes from "../../constant/PropTypes";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    isAuthenticated: assignTypes.boolean,
    children: PropTypes.node
}

export default ProtectedRoute;