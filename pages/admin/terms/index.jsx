/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";
let page = 0;

const TermsPage = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);

  const [termData, setTermData] = useState([]);

  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie("userid");
    page=0;
    setTermData([])
    setUserId(userId);
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
  const getBrands = async () => {
    try {
      setLoading(true);
      let resp = await axios.get(`terms`);
      if (resp.data) {
        setTermData(resp.data);
       // setTotal(resp.data.total);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
      setLoading(false);
    }
  };

  const onEditClick = (item)=> {
    router.push("terms/" + item.id);
  }

  const onDeleteClick= async(item,itemIndex)=>{

    const cnf = confirm("Are you sure you want to delete?");

    if (cnf) {
      const sendData = {
        userid: userId,
        id: item.id
      };

    //  console.log(sendData);       

      try {
        let res = await axios.delete(`brand/${item.id}`,  {data:sendData});
        if (res.data.acknowledge == true) {

          termData=[];
          page =0;
          getBrands();

          //getBrands();
         // termData.splice(itemIndex, 1);
         // setTermData(termData);
         // setTotal(termData.length)
          toast.success("Brand Deleted");
        } else {
          toast.warning("Fail");
        }
      } catch (error) {
        console.log(error);
        toast.error("Fail");
      }
    }

  }


  const onbuttonClick = (e) => {
    // console.log(productData)
    router.push("terms/add");
  };

  const onDetailsClick = (e) => {
    // console.log(productData)
    router.push("terms-details/" + e);
  };

  return (
    <>
      <Layout title="Terms" metaDescription={[{ name: "description", content: "Terms" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Terms</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Terms" activeLink={12} enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New Terms"
            buttoClick={(e) => onbuttonClick(e)}>
            <Row>
              <Col>
                {termData.length ? (
                  termData.map((data, i) => (
                    <Row key={i} className="mt-2 mb-3" >
                      <Col>
                        <Card>
                          <Card.Body>
                          <div className="d-inline-block " style={{cursor:'pointer'}} onClick={(e)=>onDetailsClick(data?.id)}>{data?.termsName}</div>
                          <div className="d-inline-block float-end">
                            <Button variant="default" size="sm" onClick={(e) => onEditClick(data)}>
                              <i className="fa fa-edit"></i>
                            </Button>
                            <Button variant="default" size="sm" onClick={(e) => onDeleteClick(data,i)}>
                              <i className="fa fa-trash"></i>
                            </Button>
                          </div>
                          </Card.Body>
                        </Card>   
                       </Col>
                    </Row>
                  ))
                ) : (
                  <></>
                )}
              </Col>
            </Row>            
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(TermsPage,['ADMIN']);
