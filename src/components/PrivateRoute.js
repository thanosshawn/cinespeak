import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import FullScreenLoader from "./FullScreenLoader";
const PrivateRoute = ({ children }) => {
  const { user ,loading} = useAuth();

  
  if (loading) return <FullScreenLoader />;
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
