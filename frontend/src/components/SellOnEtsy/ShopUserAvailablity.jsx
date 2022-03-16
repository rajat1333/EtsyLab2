import React, { Component } from "react";
import { Container } from "react-bootstrap";
import cookie from "react-cookies";
import { Redirect } from "react-router";

function ShopUserAvailablity() {
  let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <Container>
        {redirectVar}
        <br />
        <center>
          <h2>Name Your Shop</h2>
        </center>
        <center>
          <h4>Choose a memorable name that reflects your stlye</h4>
        </center>
        <div class="input-group">
          <input
            type="search"
            class="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            width={50}
          />
          <button type="button" class="btn btn-outline-primary">
            Check Availability
          </button>
        </div>
        <center>
          <h5>
            Your shop name will appear in your shop and next to each of your
            listings throughout Etsy
          </h5>
        </center>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </Container>
    );
}

export default ShopUserAvailablity;
// export default class ShopUserAvailablity extends Component {

//   render() {
//     let redirectVar = null;
//     if (!cookie.load("cookie")) {
//       redirectVar = <Redirect to="/login" />;
//     }
//     return (
//       <Container>
//         {redirectVar}
//         <br />
//         <center>
//           <h2>Name Your Shop</h2>
//         </center>
//         <center>
//           <h4>Choose a memorable name that reflects your stlye</h4>
//         </center>
//         <div class="input-group">
//           <input
//             type="search"
//             class="form-control rounded"
//             placeholder="Search"
//             aria-label="Search"
//             aria-describedby="search-addon"
//             width={50}
//           />
//           <button type="button" class="btn btn-outline-primary">
//             Check Availability
//           </button>
//         </div>
//         <center>
//           <h5>
//             Your shop name will appear in your shop and next to each of your
//             listings throughout Etsy
//           </h5>
//         </center>
//         <div>
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//           <br />
//         </div>
//       </Container>
//     );
//   }
// }
