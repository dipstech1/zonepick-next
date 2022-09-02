import { Container, Nav, Navbar } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <Navbar bg="deep-purple-900" variant="dark" expand="xs">
          <Container className="text-center d-block text-white small">&copy; 2021 MetaSoft</Container>
        </Navbar>
      </div>
    </>
  );
};

export default Footer;
