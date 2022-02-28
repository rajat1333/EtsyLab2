import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }
  //get the books data from backend
  componentDidMount(){
      axios.get('http://localhost:3001/home')
              .then((response) => {
              //update the state with the response data
              console.log("Getting data from backend : " + response.data)
              
              this.setState({
                  products : this.state.products.concat(response.data)
              });
              console.log("products : " + JSON.stringify(this.state.products))
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
        <h2>Etsy Home Page</h2>
          <Row>
            {this.state.products.map( (prod)=>{
                return <Col md={3}> <Product key={prod.id} id={prod.id} name={prod.name} price={prod.price} product={prod} /></Col>
            })}
            {/* <Col md={3}>This is column two</Col>
            <Col md={3}>This is column three</Col>
            <Col md={3}>This is column three</Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}
//export Home Component
export default Home;
