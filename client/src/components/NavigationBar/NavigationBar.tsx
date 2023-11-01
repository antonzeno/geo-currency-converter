import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">GeoInfo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/" className="text-decoration-none">
                            Home
                        </Link>
                    </Nav>
                    <Nav className="ms-auto">
                        <Link to="/login" className="text-decoration-none mx-2">
                            Login
                        </Link>
                        <Link to="/register" className="text-decoration-none">
                            Register
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
