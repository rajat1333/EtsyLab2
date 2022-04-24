import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage_bucket } from "../../config/firebaseConfig";
import Product from "../Home/Product";

export default function Favourites() {
  const [name, setName] = useState(localStorage.getItem('username'));
  const [products, setProducts] = useState([{"id":7,"name":"Personalized Name Necklace with Birth Flower","price":"16","quantity":16,"shop_name":"user1shop","description":"925 sterling Silver, Rose Gold Flower Name Necklace, Gold Flower Name Necklace, Gift for Her","image":"https://firebasestorage.googleapis.com/v0/b/etsy-65478.appspot.com/o/Screenshot%202022-03-20%20133554.jpg?alt=media&token=2369cad9-d5da-4cba-905c-aa22ca4f0eb8","category":"Jewellery"}]);
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar7.png"
  );
  const [tempImage, setTempImage] = useState();
  let userEmailId = localStorage.getItem('username');

  useEffect(() => {
    const userData = {
      emailId: userEmailId,
    };

    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post("/user/getUser", userData)
      .then((response) => {
        console.log("Status Code : ", response.status);
        let userDetails = response.data;
        console.log("userDetails are : " + JSON.stringify(userDetails));

        if (userDetails != null && userDetails.length != 0) {
          let userObject = userDetails[0];
          console.log("user is  are : " + JSON.stringify(userObject));
          if (userObject.image != null) setImage(userObject.image);
        }
      });


      const userInfo = {
        email_id: userEmailId,
      };
      //code to get product in
      axios.defaults.headers.common["authorization"] =
        localStorage.getItem("token");
  
      axios.post("/favourites/getFavouriteItems", userInfo).then((response) => {
        //update the state with the response data
        console.log(
          "Getting data from backend : " + JSON.stringify(response.data)
        );
        let productArray = response.data;
        console.log("fav product array is : " + JSON.stringify(productArray));
        if(productArray){
          setProducts(productArray);
        }
  
      });



  }, []);

  let redirectVar = null;
  if (!localStorage.getItem('token')) {
    redirectVar = <Navigate to="/login" />;
  }

  const handleEditProfile = (e) => {};

  return (
    <Container>
      {redirectVar}
      <EtsyNavigationBar />
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">Favourites Page</h1>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={image}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <h3>Personal info</h3>

            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-lg-3 control-label">
                  Name of user : {name}
                </label>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleEditProfile}
              >
                Edit Profile
              </button>
            </form>
          </div>
        </div>
        <hr />
        <form className="d-flex">
          <label className="col-lg-2">Search Your Favourites:</label>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        {products && <Row>
            {products.map( (prod)=>{
                return <Col md={3}> <Product key={prod.id} id={prod.id} name={prod.name} price={prod.price} product={prod} /></Col>
            })}
          </Row>}
        
      </div>
      <hr />
    </Container>
  );
}
