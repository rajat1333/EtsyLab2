import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { logout } from "../../js/actions/logoutActionController";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

function EtsyNavigationBar(props) {
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("inside logut function");
    // cookie.remove("cookie", { path: "/login" });
    // cookie.remove("cookie", { path: "/" });
    localStorage.clear();
    window.open("/login", "_self");
    // props.logout();
    // navigate( "/login");
    // window.open("/login", "_self");
  };
  //handle logout to destroy the cookie
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSearch = () => {
    console.log("inside handle search");
    navigate("/search/" + search);
    // window.open("/search" , "_self");// todo : a+'?username='+username
  };

  //if Cookie is set render Logout Button
  let navLogin = null;
  if (localStorage.getItem('token')) {
    console.log("Able to read token");
    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
        <Nav.Link href="/login" onClick={handleLogout}> Logout</Nav.Link>
          {/* <Link to="/login" onClick={handleLogout}> */}
          {/* <button onClick={handleLogout}> logout</button> */}
          {/* <span className="glyphicon glyphicon-user" onClick={handleLogout}></span>Logout */}
          {/* </Link> */}
        </li>
      </ul>
    );
  } else {
    //Else display login button
    // console.log("Not Able to read cookie");
    console.log("User session not established");
    navLogin = (
      <ul className="nav navbar-nav navbar-right">
        <li>
          
          {/* <Link to="/login"> */}
          <span className="glyphicon glyphicon-log-in"></span> Login
          {/* </Link> */}
        </li>
      </ul>
    );
  }

  let redirectVar = null;
  if (!localStorage.getItem('token')) {
    redirectVar = <Navigate to="/login" />;
  }

  let navBarVariable = null;

  if (localStorage.getItem('token')) {
    navBarVariable = (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">Etsy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchChange}
              ></input>
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
            <Nav className="me-auto">
              <Nav.Link href="/favourites">Favourites</Nav.Link>
              <Nav.Link href="/userProfile">User Profile</Nav.Link>
              <Nav.Link href="/cart">Cart</Nav.Link>
              <Nav.Link href="/purchase">My Purchases</Nav.Link>
              <Nav.Link href="/shopUserAvailablity">Sell on Etsy</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {navLogin}
        </Container>
      </Navbar>
    );
  }

  return (
    <div>
      {redirectVar}
      {navBarVariable}
    </div>
  );
}

export default EtsyNavigationBar;

// //create the Navbar Component
// class EtsyNavigationBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state={
//       search : ""
//     }
//     this.handleLogout = this.handleLogout.bind(this);
//     this.handleSearch = this.handleSearch.bind(this);
//     this.handleSearchChange = this.handleSearchChange.bind(this);
//   }
//   //handle logout to destroy the cookie
//   handleLogout = () => {
//     cookie.remove("cookie", { path: "/" });
//     this.props.logout();
//     window.open("/login", "_self");
//   };
//   //handle logout to destroy the cookie
//   handleSearchChange = (e) =>{
//     this.setState({
//       search : e.target.value
//   })
//   }
//   handleSearch = () => {
//     console.log("inside handle search")
//     window.open("/search" , "_self");// todo : a+'?username='+username
//   };
//   render() {
//     //if Cookie is set render Logout Button
//     let navLogin = null;
//     if (cookie.load("cookie")) {
//       console.log("Able to read cookie");
//       navLogin = (
//         <ul className="nav navbar-nav navbar-right">
//           <li>
//             <Link to="/" onClick={this.handleLogout}>
//               <span className="glyphicon glyphicon-user"></span>Logout
//             </Link>
//           </li>
//         </ul>
//       );
//     } else {
//       //Else display login button
//       console.log("Not Able to read cookie");
//       navLogin = (
//         <ul className="nav navbar-nav navbar-right">
//           <li>
//             <Link to="/login">
//               <span className="glyphicon glyphicon-log-in"></span> Login
//             </Link>
//           </li>
//         </ul>
//       );
//     }
//     let redirectVar = null;

//     // if (cookie.load("cookie")) {
//     //   redirectVar = <Redirect to="/home" />;
//     // }

//     let navBarVariable = null;

//     if (cookie.load("cookie")) {
//       navBarVariable = (
//         <Navbar bg="light" expand="lg">
//           <Container>
//             <Navbar.Brand href="/home">Etsy</Navbar.Brand>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//               <form className="d-flex">
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   onChange={this.handleSearchChange}
//                 ></input>
//                 <button className="btn btn-outline-success" type="submit" onClick={this.handleSearch}>
//                   Search
//                 </button>
//               </form>
//               <Nav className="me-auto">
//                 <Nav.Link href="/favourites">Favourites</Nav.Link>
//                 <Nav.Link href="/userProfile">User Profile</Nav.Link>
//                 <Nav.Link href="/#link">Cart</Nav.Link>
//                 <Nav.Link href="/shopUserAvailablity">Sell on Etsy</Nav.Link>
//                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//                   <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.2">
//                     Another action
//                   </NavDropdown.Item>
//                   <NavDropdown.Item href="#action/3.3">
//                     Something
//                   </NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item href="#action/3.4">
//                     Separated link
//                   </NavDropdown.Item>
//                 </NavDropdown>
//               </Nav>
//             </Navbar.Collapse>
//             {navLogin}
//           </Container>
//         </Navbar>
//       );
//     }

//     return (
//       <div>
//         {redirectVar}
//         {navBarVariable}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return { loggedIn: state.loggedIn };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     logout: () => dispatch(logout()),
//   };
// };
// //export Login Component
// export default connect(mapStateToProps, mapDispatchToProps)(EtsyNavigationBar);

// export default Navbar;
