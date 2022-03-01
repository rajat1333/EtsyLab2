import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { connect } from "react-redux";
import { logout } from "../../js/actions/logoutActionController";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

//create the Navbar Component
class EtsyNavigationBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    this.props.logout();
    window.open("/login", "_self");
  };
  //handle logout to destroy the cookie
  handleSearch = () => {
    console.log("inside handle search")
    window.open("/search" , "_self");// todo : a+'?username='+username
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span className="glyphicon glyphicon-user"></span>Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link to="/login">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;

    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/home" />;
    // }

    let navBarVariable = null;

    if (cookie.load("cookie")) {
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
                ></input>
                <button className="btn btn-outline-success" type="submit" onClick={this.handleSearch}>
                  Search
                </button>
              </form>
              <Nav className="me-auto">
                <Nav.Link href="/favourites">Favourites</Nav.Link>
                <Nav.Link href="/userProfile">User Profile</Nav.Link>
                <Nav.Link href="/#link">Cart</Nav.Link>
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
}

const mapStateToProps = (state) => {
  return { loggedIn: state.loggedIn };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};
//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(EtsyNavigationBar);

// export default Navbar;