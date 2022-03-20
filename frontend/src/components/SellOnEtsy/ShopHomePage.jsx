import React, { useState, useEffect } from "react";
import cookie from "react-cookies";
import { Navigate, useParams } from "react-router-dom";
import AddItem from "./AddItem";
import { storage_bucket } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import Footer from "../Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";
import ShopProduct from "./ShopProduct";
import Product from "../Home/Product";

function ShopHomePage() {
  let { shopName } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [shop, setShop] = useState(null);
  const [image, setImage] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");
  const [tempImage, setTempImage] = useState();
  const [shopProducts, setshopProducts] = useState(null);
  console.log("shop name is : " + shopName);
  console.log("shop object is : " + JSON.stringify(shop));
  console.log("products : " + JSON.stringify(shopProducts));
  let currentUser = cookie.load("cookie");

  useEffect(() => {
    const userData = {
      name: shopName,
    };
    if (shopName != null) {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:3001/shop/shopExists", userData)
        .then((response) => {
          console.log("Status Code : ", response.status);
          let shopDetails = response.data;
          console.log("shopDetails are : " + JSON.stringify(shopDetails));

          if (shopDetails != null && shopDetails.length != 0) {
            let shopObject = shopDetails[0];
            console.log("shop is  are : " + JSON.stringify(shopObject));
            setShop(shopObject);
            let shop_image = shopDetails[0].shop_image;
            // setImage(shop_image);
            if (shop_image != null) setImage(shop_image);
          }
        });
    }

    //code to load all the shop items

    axios
      .post("http://localhost:3001/shop/shopProducts", userData)
      .then((response) => {
        //update the state with the response data
        console.log(
          "Getting data from backend : " + JSON.stringify(response.data)
        );
        setshopProducts(response.data);
      });
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setTempImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    if (tempImage != null) {
      console.log(tempImage);
      const storageRef = ref(storage_bucket, tempImage.name);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, tempImage)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL", downloadURL);
          const updateData = {
            shopName: shopName,
            imageSrc: downloadURL,
          };
          axios.defaults.withCredentials = true;
          axios
            .post("http://localhost:3001/shop/updateShop", updateData)
            .then((response) => {
              console.log("Status Code : ", response.status);
            });

          setImage(downloadURL);
        });
    }
  };

  if (image != null) {
    console.log("image is : " + JSON.stringify(image));
    console.log("image name is : " + image.name);
  }

  let redirectVar = null;
  if (!cookie.load("cookie")) {
    redirectVar = <Navigate to="/login" />;
  }
  let shopProductVar = null;
  if (shopProducts != null && shop!=null) {
    shopProductVar = (
      <Row>
        {shopProducts.map((prod) => {
          return (
            <Col md={3}>
              {currentUser == shop.email_id && (
                <ShopProduct
                  key={prod.id}
                  id={prod.id}
                  name={prod.name}
                  price={prod.price}
                  product={prod}
                />
              )}
              {currentUser != shop.email_id && (
                <Product
                  key={prod.id}
                  id={prod.id}
                  name={prod.name}
                  price={prod.price}
                  product={prod}
                />
              )}
            </Col>
          );
        })}
      </Row>
    );
  }
  let pageContent = null;
  
  if (shop != null) {
    pageContent = (
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">Welcome to : {shopName}</h1>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <br />
              <img
                src={image}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              {currentUser == shop.email_id && (
                <div>
                  <h6>Upload a different Shop photo...</h6>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  <br />
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleUpload}
                  >
                    Upload Image
                  </button>
                  <br />
                  <br />
                </div>
              )}
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <h3>Shop Details</h3>

            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-lg-3 control-label">
                  Shop email_id :
                </label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={shop.email_id}
                    readOnly
                  />
                </div>
              </div>
            </form>
            <br />
            <br />
            {currentUser == shop.email_id && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Add Item
              </button>
            )}
            <br />
            <br />

            {openModal && <AddItem closeModal={setOpenModal} name={shopName} />}
            {/* <AddItem /> */}
            <br />
            {shopProductVar}
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <Container>
      {redirectVar}
      <EtsyNavigationBar />
      {pageContent}
      <Footer />
    </Container>
  );
}

export default ShopHomePage;
