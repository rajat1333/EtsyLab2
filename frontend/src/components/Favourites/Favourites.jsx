import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../Home/Product";

class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  //get the product data from backend
  componentDidMount() {
    axios
      .post("http://localhost:3001/home") //todo : change url
      .then((response) => {
        //update the state with the response data
        console.log("Getting data from backend");

        this.setState({
          products: this.state.products.concat(response.data),
        });
        console.log("products : " + JSON.stringify(this.state.products));
      });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <Container>
          <h2>Etsy Favourites Page</h2>
          <form className="d-flex">
          <label className="col-lg-2">Search Your Favourites:</label>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button className="btn btn-outline-success" type="submit" onClick={this.handleSearch}>
                  Search
                </button>
              </form>
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
          </Row>
        </Container>
      </div>
    );
  }
}
//export SearchPage Component
export default Favourites;
