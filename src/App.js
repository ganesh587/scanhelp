// src/App.js
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import EditProfile from "./components/EditProfile";
import Scan from "./components/Scan"; // Import the Scan component
import ScannedProduct from "./components/ScannedProduct"; // Import the ScannedProduct component
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider
//a
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/products' exact element={<Products />} />
        <Route
          path='/create-product'
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route path='/edit-profile' exact element={<EditProfile />} />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/app/scan' exact element={<Scan />} /> {/* Scan route */}
        <Route path='/scanned-product' exact element={<ScannedProduct />} /> {/* ScannedProduct route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;