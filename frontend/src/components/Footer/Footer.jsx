import React from "react";
import { Dropdown } from "react-bootstrap";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

function Footer() {
  return (
    <Box>
      <Container>
        <Heading>
          United States | English (UK) | $ (USD)
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              USD
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>{" "}
        </Heading>

        {/* <Row>
        <Column>
          <Heading>About Us</Heading>
          <FooterLink href="#">Aim</FooterLink>
          <FooterLink href="#">Vision</FooterLink>
          <FooterLink href="#">Testimonials</FooterLink>
        </Column>
        <Column>
          <Heading>Services</Heading>
          <FooterLink href="#">Writing</FooterLink>
          <FooterLink href="#">Internships</FooterLink>
          <FooterLink href="#">Coding</FooterLink>
          <FooterLink href="#">Teaching</FooterLink>
        </Column>
        <Column>
          <Heading>Contact Us</Heading>
          <FooterLink href="#">Uttar Pradesh</FooterLink>
          <FooterLink href="#">Ahemdabad</FooterLink>
          <FooterLink href="#">Indore</FooterLink>
          <FooterLink href="#">Mumbai</FooterLink>
        </Column>
        <Column>
          <Heading>Social Media</Heading>
          <FooterLink href="#">
            <i className="fab fa-facebook-f">
              <span style={{ marginLeft: "10px" }}>
                Facebook
              </span>
            </i>
          </FooterLink>
          <FooterLink href="#">
            <i className="fab fa-instagram">
              <span style={{ marginLeft: "10px" }}>
                Instagram
              </span>
            </i>
          </FooterLink>
          <FooterLink href="#">
            <i className="fab fa-twitter">
              <span style={{ marginLeft: "10px" }}>
                Twitter
              </span>
            </i>
          </FooterLink>
          <FooterLink href="#">
            <i className="fab fa-youtube">
              <span style={{ marginLeft: "10px" }}>
                Youtube
              </span>
            </i>
          </FooterLink>
        </Column>
      </Row> */}
      </Container>
    </Box>
  );
}

export default Footer;
