import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import verifyToken from "../../utils/verifyToken";

const Navbars = ({ cartPending = 0 }) => {
  const router = useRouter();
  const [userName,setUserName]=useState('')
  let [loggedIn, setLoggedIn] = useState(false);

  const logoutClick = (e) => {
    e.preventDefault();
    deleteCookie("Login");
    deleteCookie("token");
    deleteCookie("userid");
    deleteCookie("refreshtoken");
    deleteCookie("Cart");
    deleteCookie("user_name");
    deleteCookie("user_role");
    router.replace("/account/login?returnUrl=/");
  };

  useEffect(() => {
    const data = verifyToken();

    setLoggedIn(data.verified);
    console.log("Status:" + loggedIn);

    setUserName(getCookie('user_name'))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header" id="nav_main">
      <Navbar bg="deep-purple-900" variant="dark" fixed="top" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand href="#home">eMetaComm</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Nav className="d-flex d-md-none flex-row">
            <NavDropdown title={<i className="fa fa-user-alt"></i> + userName} id="collasible-nav-dropdown-1" active>
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
                    {cartPending ? (
                      <Badge bg="success" className="position-absolute top-0 badge bg-white text-deep-purple-900 badge-small">
                        {cartPending}
                      </Badge>
                    ) : null}
                  </Nav.Link>
                </Link>
              </>
            ) : null}
          </Nav>
          <Navbar.Collapse id="responsive-navbar-nav" className="align-items-center flex-grow-0">
            <Nav className="me-auto">
              <Link href="/" passHref>
                <Nav.Link active={router.pathname === "/" ? true : false}>Home</Nav.Link>
              </Link>
              <Link href="/category" passHref>
                <Nav.Link active={router.pathname === "/category" ? true : false}>Shop by Category</Nav.Link>
              </Link>
              <Link href="/sellers" passHref>
                <Nav.Link active={router.pathname === "/sellers" ? true : false}>Our Sellers</Nav.Link>
              </Link>
              <Link href="/contact" passHref>
                <Nav.Link active={router.pathname === "/contact" ? true : false}>Contact Us</Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Nav className="ml-auto d-md-flex d-none flex-row">
            {!loggedIn ? (
              <Link href="/account/login" passHref>
                <Nav.Link eventKey={0} href="#memes" className="px-2" active>
                  Login
                </Nav.Link>
              </Link>
            ) : null}
            {loggedIn ? (
              <>
                <NavDropdown title={<i className="fa fa-user-alt"></i>} id="collasible-nav-dropdown" active align="end">
                  <Link href="/account" passHref>
                    <NavDropdown.Item>
                      <i className="fa-solid fa-circle-user me-2"></i>My Account
                    </NavDropdown.Item>
                  </Link>

                  <NavDropdown.Item onClick={(e) => logoutClick(e)}>
                    <i className="fa-solid fa-right-from-bracket me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <Link href="/wishlist" passHref>
                  <Nav.Link eventKey={2} href="#memes" className="px-2" active>
                    <i className="fa-regular fa-heart"></i>
                  </Nav.Link>
                </Link>
                <Link href="/cart" passHref>
                  <Nav.Link eventKey={3} href="#memes" className="px-2  position-relative" active>
                    <i className="fa fa-cart-plus"></i>
                    {cartPending ? (
                      <Badge bg="success" className="position-absolute top-0 badge bg-white text-deep-purple-900 badge-small">
                        {cartPending}
                      </Badge>
                    ) : null}
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
