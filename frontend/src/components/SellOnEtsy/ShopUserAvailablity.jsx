import React, { Component, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import * as constants from "../../config/constants";
import { useNavigate, Navigate } from "react-router-dom";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";

function ShopUserAvailablity() {
  const navigate = useNavigate();
  const [shopName, setShopName] = useState("");
  let NavigateVar = null;
  let userEmailId = cookie.load("cookie");
  console.log("cookie object is : " + JSON.stringify(userEmailId));
  // let redirectToShopPage = null;

  if (!cookie.load("cookie")) {
    NavigateVar = <Navigate to="/login" />;
  }

  useEffect(() => {
    const userData = {
      emailId: userEmailId,
    };
    if (userEmailId != null) {
      axios.defaults.withCredentials = true;
      axios.post("/shop/shopExists", userData).then((response) => {
        console.log("Status Code : ", response.status);
        let shopDetails = response.data;
        console.log("shopDetails are : " + JSON.stringify(shopDetails));

        let shopName = shopDetails.name;
        console.log("shop name is : " + shopName);
        navigate("/shopHomePage/" + shopName);
      });
    }
  }, []);

  const handleShopNameChange = (e) => {
    setShopName(e.target.value);
  };
  const checkAvailability = (e) => {
    const data = {
      shopName: shopName,
      emailId: userEmailId,
    };

    if (shopName != "") {
      axios.defaults.withCredentials = true;
      axios.post("/shop/checkAvailability", data).then((response) => {
        console.log("Status Code : ", response.status);
        if (
          response.status === 200 &&
          response.data === constants.USER_NAME_AVAILABLE
        ) {
          console.log("User name is available");
          alert("User name is available. Your has been named : " + shopName);
          navigate("/shopHomePage/" + shopName);
        }
        if (
          response.status === 200 &&
          response.data === constants.USER_NAME_UNAVAILABLE
        ) {
          alert("User name is unavailable please enter an different shopname");
          setShopName("");
          window.open("/shopUserAvailablity", "_self");
        }
      });
    }
  };

  return (
    <Container>
      {NavigateVar}
      <EtsyNavigationBar />
      <br />
      <center>
        <h2>Name Your Shop</h2>
      </center>
      <center>
        <h4>Choose a memorable name that reflects your stlye</h4>
      </center>
      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          width={50}
          onChange={handleShopNameChange}
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={checkAvailability}
        >
          Check Availability
        </button>
      </div>
      <center>
        <h5>
          Your shop name will appear in your shop and next to each of your
          listings throughout Etsy
        </h5>
      </center>
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </Container>
  );
}

export default ShopUserAvailablity;
