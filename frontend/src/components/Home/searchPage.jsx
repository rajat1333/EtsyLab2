import React, { useState, useEffect } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Product from "./Product";
import Footer from "../Footer/Footer";
import EtsyNavigationBar from "../LandingPage/EtsyNavigationBar";


function SearchPage() {
  let { searchString } = useParams();
  const [products, setProducts] = useState(null);
  console.log("Input parameter is : " + searchString)

  useEffect(() => {
    console.log("inside use effect");
    const serachInfo = {
      searchString : searchString
    }
    axios
      .post("http://localhost:3001/search", serachInfo) 
      .then((response) => {
        //update the state with the response data
        console.log("Getting data from backend");
        setProducts(response.data)
        // this.setState({
        //   products: this.state.products.concat(response.data),
        // });
        console.log("products : " + JSON.stringify(products));
      });
  }, [])
  

  let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Navigate to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <EtsyNavigationBar />
        <Container>
          <h2>Etsy Search Page</h2>
          {products!=null && <Row>
            {products.map((prod) => {
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
          </Row>}
          
        </Container>
        <Footer />
      </div>
    );
}

export default SearchPage


// class SearchPage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       products: [],
//     };
//   }
//   //get the product data from backend
//   componentDidMount() {
//     console.log("inside component did mount");
//     const serachInfo = {
//       searchString : ""
//     }
//     axios
//       .post("http://localhost:3001/search", serachInfo) //todo : change url
//       .then((response) => {
//         //update the state with the response data
//         console.log("Getting data from backend");

//         this.setState({
//           products: this.state.products.concat(response.data),
//         });
//         console.log("products : " + JSON.stringify(this.state.products));
//       });
//   }

//   render() {
//     let redirectVar = null;
//     if (!cookie.load("cookie")) {
//       redirectVar = <Navigate to="/login" />;
//     }
//     return (
//       <div>
//         {redirectVar}
//         <EtsyNavigationBar />
//         <Container>
//           <h2>Etsy Search Page</h2>
//           <Row>
//             {this.state.products.map((prod) => {
//               return (
//                 <Col md={3}>
//                   {" "}
//                   <Product
//                     key={prod.id}
//                     id={prod.id}
//                     name={prod.name}
//                     price={prod.price}
//                     product={prod}
//                   />
//                 </Col>
//               );
//             })}
//           </Row>
//         </Container>
//         <Footer />
//       </div>
//     );
//   }
// }
// //export SearchPage Component
// export default SearchPage;
