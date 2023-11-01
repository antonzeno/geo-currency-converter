import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavigationBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

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
                        {!isAuthenticated ? (
                            <>
                                <Link to="/login" className="text-decoration-none me-2">
                                    Login
                                </Link>
                                <Link to="/register" className="text-decoration-none">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <button onClick={logout} className="btn btn-outline-info">
                                Logout
                            </button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
