import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage_bucket } from "../../config/firebaseConfig";

export default function UserProfile() {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [userName, setUserName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [emailId, setEmailId] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState("USA");
  const [image, setImage] = useState(
    "https://bootdey.com/img/Content/avatar/avatar7.png"
  );
  console.log("iiiiiiiiiiii " + image)
  const [downloadUrl, setDownloadUrl] = useState();
  const [tempImage, setTempImage] = useState();
  // let userEmailId = cookie.load("cookie");
  let userEmailId = localStorage.getItem('username');

  useEffect(() => {
    const userData = {
      emailId: userEmailId,
    };
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios.defaults.withCredentials = true;
    axios
      .post("/user/getUser", userData)
      .then((response) => {
        console.log("Status Code : ", response.status);
        let userDetails = response.data;
        console.log("userDetails are : " + JSON.stringify(userDetails));

        if (userDetails != null && userDetails.length != 0) {
          let userObject = userDetails[0];
          console.log("user is  are : " + JSON.stringify(userObject));
          setUser(userObject);
          setId(userObject._id);
          setName(userObject.name);
          setUserName(userObject.user_name);
          setDateOfBirth(userObject.date_of_birth);
          setEmailId(userObject.email_id);
          setPhoneNumber(userObject.phone_number);
          setCity(userObject.city);
          setCountry(userObject.country);
          if (userObject.image != null) setImage(userObject.image);
        }
        console.log("iiiiiiiiiiii " + image)
      });
  }, []);

  let redirectVar = null;
  if (!localStorage.getItem('token')) {
    redirectVar = <Navigate to="/login" />;
  }
  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };
  console.log("country seletected is : " + country);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDOBChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  const handleEmailIdChange = (e) => {
    setEmailId(e.target.value);
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setTempImage(e.target.files[0]);
    }
  };
  const handleSaveChanges = (e) => {
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
          setImage(downloadURL);
          setDownloadUrl(downloadURL);
        });
    }
    const userInfo = {
      email_id: emailId,
      id: id,
      user_name: userName,
      name: name,
      phone_number: phoneNumber,
      image: image,
      date_of_birth: dateOfBirth,
      city: city,
      country: country,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios.defaults.withCredentials = true;
    axios
      .post("/user/updateUser", userInfo)
      .then((response) => {
        console.log("Status Code : ", response.status);
        alert("User information updated successfully");
      });
  };

  return (
    <Container>
      {redirectVar}
      <EtsyNavigationBar />
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">Edit Profile</h1>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center">
              <img
                src={image}
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="col-md-9 personal-info">
            <h3>Personal info</h3>

            <form className="form-horizontal" role="form">
              <div className="form-group">
                <label className="col-lg-3 control-label">Your name:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Date of Birth:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={dateOfBirth}
                    onChange={handleDOBChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={emailId}
                    onChange={handleEmailIdChange}
                    readonly
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Phone No:</label>
                <div className="col-lg-8">
                  <input
                    className="form-control"
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
              <div className="row gutters">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <h6 className="mt-3 mb-2 text-primary">Address</h6>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="ciTy">Full Address</label>
                    <input
                      type="name"
                      className="form-control"
                      id="ciTy"
                      value={city}
                      onChange={handleCityChange}
                    />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="form-group">
                    <label htmlFor="Country">Country :</label>
                    <br />
                    <div className="container pt-1">
                      <select
                        className="custom-select"
                        onChange={handleCountryChange}
                        value={country}
                      >
                        <option value="USA">USA</option>
                        <option value="India">India</option>
                        <option value="UK">UK</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSaveChanges}
              >
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </Container>
  );
}
