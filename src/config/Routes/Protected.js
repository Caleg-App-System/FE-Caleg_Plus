import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  // Navigate
  const navigate = useNavigate();
  const role = useSelector(state => state.auth.role)
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

useEffect(() => {
  console.log(role)
    if (role !== "ADMIN" || !isLoggedIn) {
        navigate("/");
    }
}, [role, navigate, isLoggedIn]);

  return children;
}

export default Protected;