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
import ReactPaginate from "react-paginate";


function Purchase() {
  let currentUser = localStorage.getItem('username');
  const [purchaseItems, setPurchaseItems] = useState();
  const [orderPrice, setOrderPrice] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  console.log("current user is " + currentUser);

  useEffect(() => {
    const userInfo = {
      email_id: currentUser,
    };
    //code to get product in
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

    axios
      .post("/purchase/getPurchaseItems", userInfo)
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
  if (!localStorage.getItem('token')) {
    redirectVar = <Navigate to="/login" />;
  }
  const calculateOrderPrice = () => {
    let tempOrderPrice = 0;
    purchaseItems.map((item) => {
      tempOrderPrice += item.price * item.quantity;
    });
    return tempOrderPrice;
  };
  const itemPerPageChangeHandler = async (e) => {
    setItemsPerPage(e.target.value);
  };
  function PaginatedItems({ itemsPerPage }) {
    // We start with an empty list of items.
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
      // Fetch items from another resources.
      console.log(itemsPerPage);
      console.log(itemOffset);
      const endOffset = parseInt(itemOffset) + parseInt(itemsPerPage);
      console.log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(purchaseItems.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(purchaseItems.length / itemsPerPage));
    }, [itemOffset, itemsPerPage]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      console.log(event.selected);
      const newOffset = (event.selected * itemsPerPage) % purchaseItems.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <div>
        {/* <Orders currentOrders={currentItems} /> */}
        <div>
        {currentItems!=null && 
        currentItems.map((order) => (
          <ListGroup.Item key={order.id}>
            <Row className="align-items-center">
              <Col md={2}>
                <img
                  src={order.image}
                  alt={order.name}
                  className="img-fluid rounded img-thumbnail"
                  style={{ width: "70px", height: "70px" }}
                ></img>{" "}
                {/* <span>{order.name}</span>{" "} */}
              </Col>
              <Col md={2}>
                <span>{order.name}</span>{" "}
              </Col>
              <Col md={2}>
                <span>{order.shop_name}</span>{" "}
              </Col>
              <Col md={1}>
                <span>{order.quantity}</span>{" "}
              </Col>
              <Col md={1}>
                <span>
                  {order.currency} {order.price}
                </span>{" "}
              </Col>
              <Col md={2}>
              {parseFloat(order.price * order.quantity).toFixed(2)}
              </Col>
              <Col md={2}>
              {order.date}
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <div
                  class={
                    order.gift_wrapped === "true" ? "visible" : "invisible"
                  }
                >
                  <span>Order is gift wrapped : {order.message}</span>
                </div>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
        
      </div>
        &nbsp;
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  }
  const handlePlaceOrder = ()=>{
    purchaseItems.map((item) => {
        const cartItem = {
            email_id: currentUser,
            quantity: item.quantity,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
          };
          axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
          axios.defaults.withCredentials = true;
              axios
                .post("/purchase/makePurchase", cartItem)
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
      <Col md={10} className="text-end">
          Orders Per Page{" "}
          <select value={itemsPerPage} onChange={itemPerPageChangeHandler}>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </Col>
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
            <Col md={12}>
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
                      <h5>Shop Name</h5>
                    </Col>
                    <Col md={1}>
                      <h5>Quantity</h5>
                    </Col>
                    <Col md={1}>
                      <h5>Price</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Total Price</h5>
                    </Col>
                    <Col md={2}>
                      <h5>Date</h5>
                    </Col>
                  </Row>
                </ListGroupItem>

                {/* {purchaseItems.map((item) => (
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
                        <span>{item.quantity}</span>{" "}
                      </Col>
                      <Col md={2}>{item.price}</Col>
                      <Col md={2}>
                        {parseFloat(item.price * item.quantity).toFixed(2)}
                      </Col>
                      <Col md={2}>{item.date}</Col>
                    </Row>
                  </ListGroup.Item>
                ))} */}
              </ListGroup>
            </Col>
            <PaginatedItems itemsPerPage={itemsPerPage} />
          </Row>
          <br />
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
