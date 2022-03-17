import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { Navigate, useParams } from "react-router-dom";
import AddItem from "./AddItem";
import { storage_bucket } from "../../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import * as constants from "../../config/constants";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import Footer from "../Footer/Footer";

function ShopHomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [shop, setShop] = useState(null);
  const [image, setImage] = useState("./shop.jpg");
  let { shopName } = useParams();
  console.log("shop name is : " + shopName);
  console.log("shop object is : " + JSON.stringify(shop));
  

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
            setImage(shop_image);
            if(shop!=null)
              setImage(shop_image);
          }
        });
    }
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    if (image != null) {
      console.log(image);
      const storageRef = ref(storage_bucket, image.name);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, image)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          console.log("Download URL", downloadURL);
          const updateData = {
            shopName : shopName,
            imageSrc: downloadURL
          };
          axios.defaults.withCredentials = true;
          axios.post("http://localhost:3001/shop/updateShop", updateData)
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

  return (
    <Container>
      {redirectVar}
      <EtsyNavigationBar />
      <div class="container bootstrap snippets bootdey">
        <h1 class="text-primary">Welcome to : {shopName}</h1>
        <hr />
        <div class="row">
          <div class="col-md-3">
            <div class="text-center">
              <img
                src={image}
                class="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different Shop photo...</h6>
              <input
                type="file"
                class="form-control"
                onChange={handleImageChange}
              />
              <br />
              <button
                class="btn btn-primary"
                type="button"
                onClick={handleUpload}
              >
                Upload Image
              </button>
            </div>
          </div>

          <div class="col-md-9 personal-info">
            <h3>Shop Details</h3>

            <form class="form-horizontal" role="form">
              <div class="form-group">
                <label class="col-lg-3 control-label">
                  Shop email_id : 
                </label>
                <div class="col-lg-8">
                  <input
                    class="form-control"
                    type="text"
                    value="dey-dey"
                    readonly
                  />
                </div>
              </div>

              <br />
              <button class="btn btn-primary" type="button">
                Edit Shop
              </button>
            </form>
            <br />
            <button
              class="btn btn-primary"
              type="button"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Add Item
            </button>
            {openModal && <AddItem closeModal={setOpenModal} />}
            {/* <AddItem /> */}
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default ShopHomePage;
