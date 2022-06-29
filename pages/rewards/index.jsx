/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";

const RewardPage = () => {
  return (
    <>
      <Layout title="Rewards" metaDescription={[{ name: "description", content: "Rewards" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Rewards</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Rewards" activeLink={2}>
            <div className="d-flex align-items-center justify-content-center" style={{ height: 400 }}>
              <h4>Page Under Construction</h4>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(RewardPage);
