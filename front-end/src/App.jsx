import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './Dashbaord';
import Product from './Product';
import Claims from './Claims';
import Policies from './Policies';
import AdminPanel from './AdminPages/AdminPanel';
import AdminPolicies from './AdminPages/AdminPolicies';
import AdminClaims from './AdminPages/AdminClaims';
import AdminLogin from './AdminPages/AdminLogin';
import { AuthProvider } from './AuthContext';
import AuthSuccess from './AuthSuccess'

function App() {
  return (
    // ✅ Move AuthProvider inside BrowserRouter
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/userpanel" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminpanel" element={<AdminPanel />} />
          <Route path="/adminpolicies" element={<AdminPolicies />} />
          <Route path="/adminclaims" element={<AdminClaims />} />
          <Route path="/auth-success" element={<AuthSuccess />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
