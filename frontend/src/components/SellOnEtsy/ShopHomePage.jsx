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
  const [image, setImage] = useState(null);
  let { shopName } = useParams();
  console.log("shop name is : " + shopName);

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
          const data = {
            downloadURL: downloadURL,
          };
          axios.defaults.withCredentials = true;
          //make a post request with the user data
          axios
            .post("http://localhost:3001/updateShop", data)
            .then((response) => {
              console.log("Status Code : ", response.status);
              if (
                response.status === 200 &&
                response.data === constants.USER_NAME_AVAILABLE
              ) {
                console.log("hello user");
                this.props.login();
                this.setState({
                  authFlag: true,
                });
              }
              if (
                response.status === 200 &&
                response.data === constants.USER_NAME_UNAVAILABLE
              ) {
                alert("Please enter valid username and password!");
                this.setState({
                  authFlag: false,
                  message: "Login failed. Please retry with valid credentials",
                });
                //window.open('/login','_self');
              }
            });

          setImage(downloadURL);
        });
    }

    // const uploadTask = storage_bucket.ref(`images/${image.name}`).put(image)
    // uploadTask.on(
    //   "state_changed,",
    //   snapshot=>{},
    //   error =>{ console.log(error)},
    //   ()=>{
    //     storage_bucket.ref("images").child(image.name).getDownloadURL().then( url => console.log(url))
    //   }
    // )
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
                src="./shop.jpg"
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
                  Shop Owner name: xxxdddd
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
              <div class="form-group">
                <label class="col-lg-3 control-label">Last name:</label>
                <div class="col-lg-8">
                  <input class="form-control" type="text" value="bootdey" />
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
