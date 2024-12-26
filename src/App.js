import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup"; // Corrected spelling from "Singup" to "Signup"
import Login from "./components/Login";
import Products from "./components/Products";
import CreateProduct from "./components/CreateProduct"; // Import the CreateProduct component
import EditProfile from "./components/EditProfile"; // Import the EditProfile component

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path='/' exact element={<Main />} />}
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/products' exact element={<Products />} />
      <Route path='/create-product' exact element={<CreateProduct />} />{" "}
      {/* New route for Create Product */}
      <Route path='/edit-profile' exact element={<EditProfile />} />{" "}
      {/* New route for Edit Profile */}
      <Route path='/' element={<Navigate replace to='/login' />} />
    </Routes>
  );
}

export default App;
