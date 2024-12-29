import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct";
import Scan from "./components/Scan";
import ScannedProduct from "./components/ScannedProduct"; 
import ProtectedRoute from "./ProtectedRoute"; 
import { AuthProvider } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' exact element={<Main />} />
        <Route path='/app/products' exact element={<Products />} />
        <Route
          path='/app/create-product'
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        <Route path='/app/signup' exact element={<Signup />} />
        <Route path='/app/login' exact element={<Login />} />
        <Route path='/app/scan' exact element={<Scan />} />
        <Route path='/app/scanned-product' exact element={<ScannedProduct />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;