// src/App.js
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import Scan from "./components/Scan"; // Import the Scan component
import ScannedProduct from "./components/ScannedProduct"; // Import the ScannedProduct component
import Product from "./components/Product"; // Import the Product component
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
import { AuthProvider } from "./components/AuthContext"; // Import the AuthProvider

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/app' exact element={<Main />} />
        <Route path='/app/products' exact element={<Products />} />
        <Route
          path='/app/create-product'
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route path='/signup' exact element={<Signup />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/app/scan' exact element={<Scan />} /> {/* Scan route */}
        <Route path='/scanned-product' exact element={<ScannedProduct />} /> {/* ScannedProduct route */}
        <Route path='/product/:id' exact element={<Product />} /> {/* Product route */}
      </Routes>
    </AuthProvider>
  );
}

export default App;