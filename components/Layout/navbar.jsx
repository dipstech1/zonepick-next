import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import verifyToken from "../../services/verifyToken";

const Navbars = () => {
  const router = useRouter();
  let [loggedIn, setLoggedIn] = useState(false);

  const logoutClick = (e) => {
    e.preventDefault();
    removeCookies("Login");
    removeCookies("token");
    router.replace("/account/login?returnUrl=/");
  };

  useEffect(() => {
    const data = verifyToken();
    setLoggedIn(data.verified);
    console.log("Status:" + loggedIn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header" id="nav_main">
      <Navbar bg="deep-purple-900" variant="dark" fixed="top" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand href="#home">softgem</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="d-flex d-md-none flex-row">
            <NavDropdown title={<i className="fa fa-user-alt"></i>} id="collasible-nav-dropdown-1" active>
              {!loggedIn ? (
                <Link href={"/account/login?returnUrl=" + router.pathname} passHref>
                  <NavDropdown.Item>Login</NavDropdown.Item>
                </Link>
              ) : null}
              {loggedIn ? (
                <Link href="/account" passHref>
                  <NavDropdown.Item>My Account</NavDropdown.Item>
                </Link>
              ) : null}
              {loggedIn ? <NavDropdown.Item onClick={(e) => logoutClick(e)}>Logout</NavDropdown.Item> : null}
            </NavDropdown>
            <Nav.Link eventKey={2} href="#memes" className="px-2">
              <i className="fa-regular fa-heart"></i>
            </Nav.Link>
            <Nav.Link eventKey={3} href="#memes" className="px-2">
              <i className="fa fa-cart-plus"></i>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse id="responsive-navbar-nav" className="align-items-center flex-grow-0">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link active={router.pathname === "/" ? true : false}>Home</Nav.Link>
              </Link>
              <Link href="/categories" passHref>
              <Nav.Link active={router.pathname === "/categories" ? true : false}>Categories</Nav.Link>
              </Link>
              <Link href="/contact" passHref>
                <Nav.Link active={router.pathname === "/contact" ? true : false}>Contact Us</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto d-md-flex d-none flex-row">
            <NavDropdown title={<i className="fa fa-user-alt"></i>} id="collasible-nav-dropdown" active align="end">
              {!loggedIn ? (
                <Link href={"/account/login?returnUrl=" + router.pathname} passHref>
                  <NavDropdown.Item>
                    <i className="fa-solid fa-right-to-bracket me-2"></i>Login
                  </NavDropdown.Item>
                </Link>
              ) : null}
              {loggedIn ? (
                <>
                  <Link href="/account" passHref>
                    <NavDropdown.Item>
                      <i className="fa-solid fa-circle-user me-2"></i>My Account
                    </NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item onClick={(e) => logoutClick(e)}>
                    <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                  </NavDropdown.Item>
                </>
              ) : null}
            </NavDropdown>

            {loggedIn ? (
              <>
                <Link href="/wishlist" passHref>
                  <Nav.Link eventKey={2} href="#memes" className="px-2" active>
                    <i className="fa-regular fa-heart"></i>
                  </Nav.Link>
                </Link>
                <Link href="/cart" passHref>
                  <Nav.Link eventKey={3} href="#memes" className="px-2  position-relative" active>
                    <i className="fa fa-cart-plus"></i>
                    <Badge bg="success" className="position-absolute top-0 badge bg-white text-deep-purple-900 badge-small">
                      9
                    </Badge>
                  </Nav.Link>
                </Link>
              </>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
