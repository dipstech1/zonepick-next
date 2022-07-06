/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";

const SubCategory = () => {
  return (
    <>
      <Layout title="Account Setting" metaDescription={[{ name: "description", content: "Account Setting" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Subcategory</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Subcategory" activeLink={9}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              <h4>Page Under Construction</h4>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(SubCategory,['ADMIN']);
