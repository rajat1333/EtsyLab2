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
import { Link, Navigate, useNavigate } from "react-router-dom";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import Footer from "../Footer/Footer";
import * as constants from "../../config/constants";

function Cart() {
  const navigate = useNavigate();
  let currentUser = localStorage.getItem("username");
  const [cartItems, setCartItems] = useState([]);
  const [orderPrice, setOrderPrice] = useState(0);
  // const [checked, setChecked] = useState(false);
  // const [text, setText] = useState("");
  console.log("current user is " + currentUser);

  useEffect(() => {
    const userInfo = {
      email_id: currentUser,
    };
    //code to get product in
    axios.defaults.headers.common["authorization"] =
      localStorage.getItem("token");

    axios.post("/cart/getCartItems", userInfo).then((response) => {
      //update the state with the response data
      console.log(
        "Getting data from backend : " + JSON.stringify(response.data)
      );
      let productArray = response.data;
      console.log("productArray is : " + JSON.stringify(productArray));

      if (productArray != null && productArray.length != 0) {
        setCartItems(productArray);
        let tempOrderPrice = 0;
        productArray.map((item) => {
          tempOrderPrice += item.price * item.quantity;
        });
        setOrderPrice(parseFloat(tempOrderPrice).toFixed(2));
      }
    });
  }, []);

  useEffect(() => {}, [cartItems]);

  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }
  const forceUpdate = useForceUpdate();

  let redirectVar = null;
  if (!localStorage.getItem("token")) {
    redirectVar = <Navigate to="/login" />;
  }
  const calculateOrderPrice = () => {
    let tempOrderPrice = 0;
    cartItems.map((item) => {
      tempOrderPrice += item.price * item.quantity;
    });
    setOrderPrice(tempOrderPrice);
    return tempOrderPrice;
  };

  const handlePlaceOrder = () => {
    cartItems.map((item) => {
      const cartItem = {
        email_id: currentUser,
        quantity: item.quantity,
        product_id: item.product_id,
        name: item.name,
        price: item.price,
        shop_name: item.shop_name,
        image: item.image,
        gift_wrapped: item.gift_wrapped,
        message: item.message
      };
      axios.defaults.withCredentials = true;
      axios.post("/purchase/makePurchase", cartItem).then((response) => {
        console.log("Status Code : ", response.status);
        alert("Purchase Successful");
        navigate("/purchase");
      });
    });
  };
  const removeProduct = async (_id) => {};

  return (
    <Container>
      <EtsyNavigationBar />
      {redirectVar}
      <title>Shopping Cart</title>

      <h1>Shopping Cart</h1>
      <br />
      <br />
      {cartItems == null && (
        <div>
          <h2>Your Shoping cart is empty</h2>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}
      {cartItems != null && (
        <div>
          <Row>
            <Col md={8}>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col md={2}>
                      <h5>Image</h5>
                    </Col>
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
                    <Col md={2}>
                      <h5>Delete Item</h5>
                    </Col>
                  </Row>
                </ListGroupItem>

                {cartItems.map((item) => (
                  <ListGroup.Item key={item.prodcut_id}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <span>
                          <img
                            src={item.image}
                            alt="avatar"
                            width="80"
                            height="80"
                          />
                        </span>{" "}
                      </Col>
                      <Col md={2}>
                        <span>{item.name}</span>{" "}
                      </Col>
                      <Col md={2}>
                        <span>
                          <div class="input-group">
                            <span class="input-group-prepend">
                              <button
                                type="button"
                                class="btn btn-outline-secondary btn-number"
                                onClick={() => {
                                  item.quantity = parseInt(item.quantity) - 1;
                                  console.log(
                                    "item qunatity is : " + item.quantity
                                  );
                                  console.log(
                                    "cart object is : " +
                                      JSON.stringify(cartItems)
                                  );
                                  const index = cartItems
                                    ? cartItems.findIndex(
                                        (cartItem) => cartItem._id === item._id
                                      )
                                    : 0;
                                  console.log("index to update is " + index);
                                  //cartItems[index] = item;
                                  let t = cartItems;
                                  t[index] = item;
                                  setCartItems(t);
                                  calculateOrderPrice();
                                  forceUpdate();
                                  console.log(
                                    "cart object is : " +
                                      JSON.stringify(cartItems)
                                  );
                                }}
                              >
                                <span class="fa fa-minus"></span>
                              </button>
                            </span>
                            <input
                              type="text"
                              name="quant[1]"
                              class="form-control input-number"
                              value={item.quantity}
                              min="0"
                              max="100"
                              readonly
                            ></input>
                            {/* <span >{"Quantity : " + item.quantity + " "}  </span> */}
                            <span class="input-group-append">
                              <button
                                type="button"
                                class="btn btn-outline-secondary btn-number"
                                onClick={() => {
                                  item.quantity = parseInt(item.quantity) + 1;
                                  const index = cartItems
                                    ? cartItems.findIndex(
                                        (cartItem) => cartItem._id === item._id
                                      )
                                    : 0;
                                  let t = cartItems;
                                  t[index] = item;
                                  setCartItems(t);
                                  calculateOrderPrice();
                                  forceUpdate();
                                  console.log(
                                    "cart object is : " +
                                      JSON.stringify(cartItems)
                                  );
                                  // cartItems
                                  //setCartItems(cartItems);
                                }}
                              >
                                <span class="fa fa-plus"></span>
                              </button>
                            </span>
                          </div>
                        </span>
                        {/* <span>{item.quantity}</span>{" "} */}
                      </Col>
                      <Col md={2}>{item.price}</Col>
                      <Col md={2}>
                        {/* {setOrderPrice(orderPrice + item.price * item.quantity)} */}
                        {parseFloat(item.price * item.quantity).toFixed(2)}
                      </Col>
                      <Col md={2}>
                        <button
                          className="product-remove"
                          onClick={() => {
                            const index = cartItems
                                    ? cartItems.findIndex(
                                        (cartItem) => cartItem._id === item._id
                                      )
                                    : 0;
                                  let t = cartItems;
                                  if (index > -1) {
                                    t.splice(index, 1); // 2nd parameter means remove one item only
                                  }
                                  setCartItems(t);
                                  calculateOrderPrice();
                                  forceUpdate();
                          }}
                        >
                          ×
                        </button>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={9}>
                        <Row>
                          <Col md={5}>
                            <label>
                              Gift wrap your item{" "}
                              <input
                                name="checkbox"
                                type="checkbox"
                                checked={item.gift_wrapped}
                                onChange={() => {
                                   if (item.gift_wrapped) {
                                    item.gift_wrapped= false;
                                  }else{
                                    item.gift_wrapped = true;
                                  }
                                  const index = cartItems
                                    ? cartItems.findIndex(
                                        (cartItem) => cartItem._id === item._id
                                      )
                                    : 0;
                                  let t = cartItems;
                                  t[index] = item;
                                  setCartItems(t);
                                  forceUpdate();
                                }}
                              />
                            </label>
                          </Col>
                          <Col md={4}>
                            {" "}
                            <label>
                              <input
                                name="input"
                                type="text"
                                disabled={!item.gift_wrapped}
                                // value={text}
                                onChange={(e) => {
                                  item.message = e.target.value;
                                  const index = cartItems
                                    ? cartItems.findIndex(
                                        (cartItem) => cartItem._id === item._id
                                      )
                                    : 0;
                                  let t = cartItems;
                                  t[index] = item;
                                  setCartItems(t);
                                  forceUpdate();
                                }}
                              />
                            </label>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
               
              </ListGroup>
            </Col>
          </Row>
          <br />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handlePlaceOrder}
          >
            Place order for total Amount : {orderPrice}
          </button>
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

export default Cart;
