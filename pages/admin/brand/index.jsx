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

const BrandPage = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);

  const [brandData, setBrandData] = useState([]);

  let [total, setTotal] = useState(0);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    const userId = getCookie("userid");
    page=0;
    setBrandData([])
    setUserId(userId);
    getBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMoreBrands = () => {
    page += 1;
    getBrands();
  };

  const getBrands = async () => {
    try {
      setLoading(true);
      let resp = await axios.get(`brand?page=${page}`);
      if (resp.data) {
        setBrandData([...brandData, ...resp.data.data]);
        setTotal(resp.data.total);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
      setLoading(false);
    }
  };

  const onEditClick = (item)=> {
    sessionStorage.setItem("brand", JSON.stringify(item));
    router.push(`brand/edit`);
  }

  const onDeleteClick= async(item,itemIndex)=>{

    const cnf = confirm("Are you sure you want to delete?");

    if (cnf) {
      const sendData = {
        userid: userId,
        id: item.id
      };

      console.log(sendData);      

      try {
        let res = await axios.delete(`brand/${item.id}`,  {data:sendData});
        if (res.data.acknowledge == true) {

          brandData=[];
          page =0;
          getBrands();

          //getBrands();
         // brandData.splice(itemIndex, 1);
         // setBrandData(brandData);
         // setTotal(brandData.length)
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
    router.push("brand/add");
  };

  return (
    <>
      <Layout title="Brand" metaDescription={[{ name: "description", content: "Brand" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Brand</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Brand" activeLink={11} enableButton={true}
            iconClass="fa fa-add"
            tooltipText="Add New Brand"
            buttoClick={(e) => onbuttonClick(e)}>
            <Row>
              <Col>
                {brandData.length ? (
                  brandData.map((data, i) => (
                    <Row key={i} className="mt-2 mb-3 ">
                      <Col>
                        <Card>
                          <Card.Body>
                          <div className="d-inline-block " >{data?.brandName}</div>
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
            {total > brandData.length ? (
              <Row className="mt-3">
                <Col className="text-center">
                  <Button onClick={getMoreBrands}>
                    Load More {loading ? <span className="spinner-border spinner-border-sm me-1 ms-2"></span> : null}
                  </Button>
                </Col>
              </Row>
            ) : null}
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(BrandPage,['ADMIN']);
