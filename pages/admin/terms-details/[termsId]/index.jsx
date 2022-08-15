import Link from "next/link";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import MyAccountLayout from "../../../../components/Account/myaccount";
import Layout from "../../../../components/Layout/layout";
import WithAuth from "../../../../components/withAuth";
import { toast } from "react-toastify";
import axios from "../../../../utils/axios.interceptor";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";


const TermDetailsPage = ()=> {
    const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [termsId, setTermsId] = useState(null);
  const [termsName, setTermsName] = useState('');

  const [termsDetails, setTermsDetails] = useState([]);

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query["termsId"]) {
      const userId = getCookie("userid");
      setUserId(userId);

      const TermsId = router.query["termsId"];
      setTermsId(TermsId);

      getTermsDetails(TermsId);

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const getTermsDetails = async (termsId) => {
    try {
      let resp = await axios.get(`terms/${termsId}`);
      if (resp.data) {

        setTermsName(resp.data.termsName)

        setTermsDetails(resp.data.termsDetail)
      }
     // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const onDeleteClick = async (item) => {
     const cnf = confirm("Are you sure you want to delete?");

    if (cnf) {
      
      try {
        let res = await axios.delete(`terms-details/${item.id}`);
        if (res.data.acknowledge == true) {
          getTermsDetails(item.termsId);
          toast.success("Terms Details Deleted");
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }
  };

  const onbuttonClick = (e) => {
    router.push(router.query["termsId"][0] + "/add");
  };

  const onEditClick = (item) => {
    router.push(router.query["termsId"][0] + "/edit/" + item.id);
  };

  return (
    <>
      <Layout title="TermsDetails" metaDescription={[{ name: "description", content: "TermsDetails" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/terms" passHref>
              <Breadcrumb.Item>Terms</Breadcrumb.Item>
            </Link>            
            <Breadcrumb.Item active>{termsName}</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout
            title={"TermsDetails(s) of " + termsName}
            activeLink={12}
            enableBack={true}
            enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New TermsDetails"
            buttoClick={(e) => onbuttonClick(e)}
          >
            <div className="px-3 py-3">
              <Row>
                {termsDetails?.length > 0 &&
                  termsDetails?.map((data, i) => (
                    <Col key={i} md={12} className="mt-2 mb-2">
                      <Card className="shadow-sm">
                        <Card.Body>
                          <div className="d-inline-block">{data?.termsDetails}</div>
                          <div className="d-inline-block float-end">
                            <Button variant="default" size="sm" onClick={(e) => onEditClick(data)}>
                              <i className="fa fa-edit"></i>
                            </Button>
                            <Button variant="default" size="sm" onClick={(e) => onDeleteClick(data)}>
                              <i className="fa fa-trash"></i>
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
}


export default WithAuth(TermDetailsPage, ["ADMIN"]);