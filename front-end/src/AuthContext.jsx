import { createContext, useContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [username, setUsername] = useState("");
      // ✅ Now useNavigate works!

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedName = localStorage.getItem("name");

        if (token && storedRole) {
            setIsAuthenticated(true);
            setRole(storedRole);
            setUsername(storedName);
        }
    }, []);

    const login = (token, userRole, username) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        localStorage.setItem("name", username);
        setIsAuthenticated(true);
        setRole(userRole);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        setIsAuthenticated(false);
        setRole(null);
        setUsername("");

      
       
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, role, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
