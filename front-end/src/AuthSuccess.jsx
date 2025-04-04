import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AuthSuccess = () => { 
    const navigate = useNavigate();
    const { login } = useAuth();
    const hasRun = useRef(false); // Prevent double execution

    useEffect(() => {
        if (hasRun.current) return; // Prevent multiple runs
        hasRun.current = true;

        const token = new URL(window.location.href).searchParams.get("token");
        const role = new URL(window.location.href).searchParams.get("role");
        const username = new URL(window.location.href).searchParams.get("username");
        console.log("Received Token:", token);
        console.log("role :",role)
        console.log("username :",username)

        if (token) {
            localStorage.setItem("token", token);
            login(token,role,username);
            if (role === "admin") {
                navigate("/adminpanel");
            } else {
                navigate("/userpanel");
            }
        } else {
            if (role === "admin") {
                navigate("/adminlogin");
            } else {
                navigate("/login");
            }
        }
    }, [navigate, login]);

    return <p>Authenticating...</p>;
};

export default AuthSuccess;
