import React, { Component } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import {  Navigate } from "react-router-dom";


export default class ProductPage extends Component {
  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Navigate to="/login" />;
    }
    return (
      <Container>
        {redirectVar}
        <div class="container bootstrap snippets bootdey">
          <h1 class="text-primary">ProductPage</h1>
          <hr />
          <div class="row">
            <div class="col-md-5">
              
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar7.png"
                  class="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
            </div>

            <div class="col-md-7 personal-info">
              <h2>Product Name</h2>

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
                
                <br />
                <button class="btn btn-primary" type="button">
                  Buy Item
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
