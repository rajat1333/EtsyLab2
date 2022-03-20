import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import EtsyNavigationBar from "./LandingPage/EtsyNavigationBar";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Footer from "./Footer/Footer";
import UserProfile from "./UserProfile/UserProfile";
import ShopUserAvailablity from "./SellOnEtsy/ShopUserAvailablity";
import ShopHomePage from "./SellOnEtsy/ShopHomePage";
import SearchPage from "./Home/SearchPage";
import Favourites from "./Favourites/Favourites";
import ProductPage from "./ProductPage/ProductPage";
import Cart from "./Cart/Cart";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchString" element={<SearchPage />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/productPage/:productId" element={<ProductPage />} />
          <Route path="/shopUserAvailablity" element={<ShopUserAvailablity />} />
          <Route path="/shopHomePage/:shopName" element={<ShopHomePage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
