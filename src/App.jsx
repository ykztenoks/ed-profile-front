import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import SellProductPage from "./Pages/SellProductPage";
import UpdatePage from "./Pages/UpdatePage";
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <div className="App">
      <h1>Project 3</h1>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/products/new" element={<SellProductPage />} />
        <Route path="/products/update/:productId" element={<UpdatePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path = '/profile' element ={<ProfilePage />} />
        <Route path="x" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
