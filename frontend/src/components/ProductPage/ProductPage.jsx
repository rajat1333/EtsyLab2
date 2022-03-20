import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";
import cookie from "react-cookies";
import { Navigate, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";
import axios from "axios";
import * as constants from "../../config/constants";


function ProductPage() {
  const [product, setProduct] = useState();
  const [orderQuantity, setproductQuantity] = useState(1);
  console.log("Product object is : " + JSON.stringify(product));
  console.log("productQuantity  is : " + orderQuantity);
  let currentUser = cookie.load("cookie");
  console.log("current user is " + currentUser)
  let { productId } = useParams();

  useEffect(() => {
    console.log("klhfjdskahkjf");
    const productInfo = {
      id: productId,
    };
    if (productId != null) {
      //code to get product in

      axios
        .post("http://localhost:3001/products/getProduct", productInfo)
        .then((response) => {
          //update the state with the response data
          console.log(
            "Getting data from backend : " + JSON.stringify(response.data)
          );
          let productArray = response.data;
          console.log("productArray is : " + JSON.stringify(productArray));

          if (productArray != null && productArray.length != 0) {
            setProduct(productArray[0]);
          }
        });
    }
  }, []);

  const handleAddToCart = (e) => {
    if (orderQuantity > product.quantity) {
      alert("Please enter qantity less than available quantity");
    } else {
      const cartItem = {
        email_id: currentUser,
        quantity: orderQuantity,
        product_id: product.id,
        name: product.name,
        price: product.price,
      };
      axios.defaults.withCredentials = true;
          axios
            .post("http://localhost:3001/cart/addToCart", cartItem)
            .then((response) => {
              console.log("Status Code : ", response.status);
              if (
                response.status === 200 &&
                response.data === constants.ITEM_ADDED_SUCCESSFULLY
              ) {
                alert("Item added succussesfully.");
              }
            });
    }
  };

  let redirectVar = null;
  if (!cookie.load("cookie")) {
    redirectVar = <Navigate to="/login" />;
  }
  let productContent = null;

  if (product != null) {
    productContent = (
      <div className="container bootstrap snippets bootdey">
        <h1 className="text-primary">ProductPage</h1>
        <hr />
        <div className="row">
          <div className="col-md-5">
            <br />
            <br />
            <img src={product.image} alt="avatar" width="400" height="400" />
          </div>

          <div className="col-md-6 personal-info">
            <h1>{product.name}</h1>
            <hr />
            <br />
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            <br />

            <ListGroup.Item>Category : {product.category}</ListGroup.Item>
            <br />
            <ListGroup.Item>Price : {product.price}</ListGroup.Item>
            <br />
            <ListGroup.Item>Quantity : {product.quantity}</ListGroup.Item>
            <br />
            <ListGroup.Item>
              shop Name :
              <a href={"/shopHomePage/" + product.shop_name}>
                {product.shop_name}
              </a>
            </ListGroup.Item>
            <br />
            {product.quantity == 0 && <h3>Item out of Stock</h3>}
            {product.quantity > 0 && (
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-lg-3 control-label">
                    Enter Quantity :
                  </label>
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="text"
                      value={orderQuantity}
                      onChange={(e) => setproductQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <br />
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <EtsyNavigationBar />
      {redirectVar}
      {productContent}
      <hr />
      <Footer />
    </Container>
  );
}

export default ProductPage;
