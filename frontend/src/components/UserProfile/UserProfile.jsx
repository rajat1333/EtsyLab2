import React, { Component } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { Redirect } from "react-router";

export default class UserProfile extends Component {
  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <Container>
        {redirectVar}
        <div class="container bootstrap snippets bootdey">
          <h1 class="text-primary">Edit Profile</h1>
          <hr />
          <div class="row">
            <div class="col-md-3">
              <div class="text-center">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  class="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input type="file" class="form-control" />
              </div>
            </div>

            <div class="col-md-9 personal-info">
              <h3>Personal info</h3>

              <form class="form-horizontal" role="form">
                <div class="form-group">
                  <label class="col-lg-3 control-label">Your name:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="dey-dey" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Last name:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="bootdey" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Date of Birth:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="bootdey" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">City:</label>
                  <div class="col-lg-8">
                    <input class="form-control" type="text" value="bootdey" />
                  </div>
                </div>
                <div class="form-group ">
                  <label class="col-lg-3 control-label">Gender:</label>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      value="option1"
                    />
                    <label class="form-check-label" for="inlineRadio1">
                      Male
                    </label>
                  </div>

                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio2"
                      value="option2"
                    />
                    <label class="form-check-label" for="inlineRadio2">
                      Female
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-3 control-label">Email:</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      value="janesemail@gmail.com"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-lg-3 control-label">Phone No:</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      value="janesemail@gmail.com"
                    />
                  </div>
                </div>
                <div class="row gutters">
                  <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 class="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="Street">Street</label>
                      <input
                        type="name"
                        class="form-control"
                        id="Street"
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="ciTy">City</label>
                      <input
                        type="name"
                        class="form-control"
                        id="ciTy"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="sTate">State</label>
                      <input
                        type="text"
                        class="form-control"
                        id="sTate"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div class="form-group">
                      <label for="zIp">Zip Code</label>
                      <input
                        type="text"
                        class="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>

                <br />
                <button class="btn btn-primary" type="button">
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
}
