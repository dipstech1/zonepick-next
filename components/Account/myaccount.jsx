import Link from "next/link";
import { useRouter } from "next/router";
import { Card, Col, Row } from "react-bootstrap";

const MyAccountLayout = ({
  children,
  title = "",
  activeLink = 1,
  enableBack = false,
  enableButton = false,
  iconClass = "fa-pencil",
  tooltipText = "",
  buttoClick,
}) => {
  const router = useRouter();

  const onButtonClick = () => {
    if (buttoClick instanceof Function) {
      buttoClick("Yes");
    }
  };

  return (
    <>
      <div>
        <Row>
          <Col md={4} lg={3}>
            <Card className="border-0">
              <Card.Body>
                <ul className="nav flex-column" id="profile-left-menu">
                  <li className="nav-item">
                    <Link href={"/account"}>
                      <a className={["nav-link", activeLink === 1 ? "active-menu" : null].join(" ")}>
                        <i className="fa fa-user-circle me-2"></i> My Details
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/rewards"}>
                      <a className={["nav-link", activeLink === 2 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-award me-2"></i> My Rewards
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/wishlist"}>
                      <a className={["nav-link", activeLink === 3 ? "active-menu" : null].join(" ")}>
                        <i className="fa fa-heart me-2"></i> My Wishlist
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/orders"}>
                      <a className={["nav-link", activeLink === 4 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-box me-2"></i> My Orders
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/sell"}>
                      <a className={["nav-link", activeLink === 5 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-tag me-2"></i> My Listing
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/account/address"}>
                      <a className={["nav-link", activeLink === 6 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-map-location-dot me-2"></i> Address Book
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/account/settings"}>
                      <a className={["nav-link", activeLink === 7 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-cog me-2"></i> Account Setting
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <small className="hr-sect">Admin Section</small>
                  </li>
                  <li className="nav-item">
                    <Link href={"/admin/category"}>
                      <a className={["nav-link", activeLink === 8 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-folder me-2"></i> Category
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/admin/subcategory"}>
                      <a className={["nav-link", activeLink === 9 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-folder-tree me-2"></i> Subcategory
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/admin/product"}>
                      <a className={["nav-link", activeLink === 10 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-swatchbook me-2"></i> Product
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={"/admin/brand"}>
                      <a className={["nav-link", activeLink === 11 ? "active-menu" : null].join(" ")}>
                        <i className="fa-solid fa-building me-2"></i> Brand
                      </a>
                    </Link>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} lg={9}>
            <Card className="border-0 ">
              <Card.Header className="border-bottom-0">
                <Card.Title className="mt-1 mb-1">
                  <span data-bs-toggle="tooltip" data-bs-placement="left" title="Back">
                    {enableBack ? <i className="fa fa-arrow-left me-3" style={{ cursor: "pointer" }} onClick={() => router.back()}></i> : null}
                    {title}
                  </span>
                  <span className="float-end small fs-6">
                    {enableButton ? (
                      <i
                        className={"fa " + iconClass}
                        style={{ cursor: "pointer", width: "30px" }}
                        onClick={onButtonClick}
                        data-bs-toggle="tooltip"
                        data-bs-placement="left"
                        title={tooltipText}
                      ></i>
                    ) : null}
                  </span>
                </Card.Title>
              </Card.Header>
              <Card.Body className="pt-1 ">{children}</Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MyAccountLayout;
