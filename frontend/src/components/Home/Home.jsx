import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import Footer from "../Footer/Footer";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  //get the books data from backend
  componentDidMount() {
    const userInfo = {
      // emaiId : cookie.load("cookie")
      emaiId: localStorage.getItem("username"),
    };
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");
    axios.post("/home", userInfo).then((response) => {
      //update the state with the response data
      console.log("Getting data from backend : " + response.data);

      this.setState({
        products: this.state.products.concat(response.data),
      });
      console.log("products : " + JSON.stringify(this.state.products));
    });
  }

  render() {
    let redirectVar = null;
    if (!localStorage.getItem('token')) {
      redirectVar = <Navigate to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <EtsyNavigationBar />
        <Container>
          <h2>Etsy Home Page</h2>
          <Row>
            {this.state.products.map((prod) => {
              return (
                <Col md={3}>
                  {" "}
                  <Product
                    key={prod.id}
                    id={prod.id}
                    name={prod.name}
                    price={prod.price}
                    product={prod}
                  />
                </Col>
              );
            })}
            {/* <Col md={3}>This is column two</Col>
            <Col md={3}>This is column three</Col>
            <Col md={3}>This is column three</Col> */}
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}
//export Home Component
export default Home;
