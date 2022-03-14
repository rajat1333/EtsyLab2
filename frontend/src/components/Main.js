import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./Home/Home";
import EtsyNavigationBar from "./LandingPage/EtsyNavigationBar";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import Footer from "./Footer/Footer";
import UserProfile from "./UserProfile/UserProfile";
import ShopUserAvailablity from "./SellOnEtsy/ShopUserAvailablity";
import ShopHomePage from "./SellOnEtsy/ShopHomePage";
import SearchPage from "./Home/searchPage";
import Favourites from "./Favourites/Favourites";
import ProductPage from "./ProductPage/ProductPage";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        {/*Render Different Component based on Route*/}
        <Route path="/" component={EtsyNavigationBar} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={SearchPage} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/productPage" component={ProductPage} />
        <Route path="/shopUserAvailablity" component={ShopUserAvailablity} />
        <Route path="/shopHomePage" component={ShopHomePage} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/" component={Footer} />
      </div>
    );
  }
}
//Export The Main Component
export default Main;
