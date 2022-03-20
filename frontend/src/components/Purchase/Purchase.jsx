import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import cookie from "react-cookies";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import Footer from "../Footer/Footer";
import * as constants from "../../config/constants";


function Purchase() {
  let currentUser = cookie.load("cookie");
  const [purchaseItems, setPurchaseItems] = useState();
  const [orderPrice, setOrderPrice] = useState(0);
  console.log("current user is " + currentUser);

  useEffect(() => {
    const userInfo = {
      email_id: currentUser,
    };
    //code to get product in

    axios
      .post("http://localhost:3001/purchase/getPurchaseItems", userInfo)
      .then((response) => {
        //update the state with the response data
        console.log(
          "Getting data from backend : " + JSON.stringify(response.data)
        );
        let productArray = response.data;
        console.log("productArray is : " + JSON.stringify(productArray));

        if (productArray != null && productArray.length != 0) {
          setPurchaseItems(productArray);
          let tempOrderPrice = 0;
          productArray.map((item) => {
            tempOrderPrice += item.price * item.quantity;
          });
          setOrderPrice(parseFloat(tempOrderPrice).toFixed(2));
        }
      });
    
  }, []);
  let redirectVar = null;
  if (!cookie.load("cookie")) {
    redirectVar = <Navigate to="/login" />;
  }
  const calculateOrderPrice = () => {
    let tempOrderPrice = 0;
    purchaseItems.map((item) => {
      tempOrderPrice += item.price * item.quantity;
    });
    return tempOrderPrice;
  };
  const handlePlaceOrder = ()=>{
    purchaseItems.map((item) => {
        const cartItem = {
            email_id: currentUser,
            quantity: item.quantity,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
          };
          axios.defaults.withCredentials = true;
              axios
                .post("http://localhost:3001/purchase/makePurchase", cartItem)
                .then((response) => {
                  console.log("Status Code : ", response.status);
                  if (
                    response.status === 200 &&
                    response.data === constants.ITEM_ADDED_SUCCESSFULLY
                  ) {
                    alert("Item added succussesfully.");
                  }
                });
      });
  }

  return (
    <Container>
      <EtsyNavigationBar />
      {redirectVar}
      <title>Purshase Page</title>

      <h1>Purshase Page</h1>
      <br />
      <br />
      {purchaseItems == null && (
        <div>
          <h2>You don't have any recent purchases</h2>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
      {purchaseItems != null && (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <h5>Item</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Quantity</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Price</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Total Price</h5>
                    </Col>
                    <Col md={3}>
                      <h5>Date of order</h5>
                    </Col>
                  </Row>
                </ListGroupItem>

                {purchaseItems.map((item) => (
                  <ListGroup.Item key={item.prodcut_id}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <span>{item.name}</span>{" "}
                      </Col>
                      <Col md={2}>
                        <span>{item.quantity}</span>{" "}
                      </Col>
                      <Col md={2}>{item.price}</Col>
                      <Col md={2}>
                        {/* {setOrderPrice(orderPrice + item.price * item.quantity)} */}
                        {parseFloat(item.price * item.quantity).toFixed(2)}
                      </Col>
                      <Col md={3}>{item.date}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                {/* {cartItems.map((item) => (
            <ListGroup.Item key={item.prodcut_id}>
              <Row className="align-items-center">
              <Col md={2}>
                  <span>{item.name}</span>{" "}
                </Col>
                <Col md={2}>
                  <span>{item.quantity}</span>{" "}
                </Col>
                <Col md={2}>
                   {item.price}
                </Col>
                <Col md={2}>
                  
                  {parseFloat(item.price * item.quantity).toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))} */}
              </ListGroup>
            </Col>
          </Row>
          <br />
          {/* <button
            className="btn btn-primary"
            type="button"
              onClick={handlePlaceOrder}
          >
            Place order for total Amount : {orderPrice}
          </button> */}
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
      <Footer />
    </Container>
  );
}

export default Purchase;
