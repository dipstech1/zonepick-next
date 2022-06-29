/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";

const AddProductPage = () => {
  return (
    <>
      <Layout title="Add Product" metaDescription={[{ name: "description", content: "Add Product" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/product" passHref>
              <Breadcrumb.Item>Product</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Add Product</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Add Product" activeLink={7}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              <h4>Page Under Construction</h4>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddProductPage);
