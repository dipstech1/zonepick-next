import Layout from "../../../components/Layout/layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../utils/axios.interceptor"
import { Row, Col, Card } from "react-bootstrap"
import common from "../../../utils/commonService";

const ProductCompare = () => {
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {

        let compareData = JSON.parse(localStorage.getItem("productCompare"));
        try {
            let resp = await axios.post(`products/compare`, compareData);
            if (resp.data) {
                setProductData(resp?.data?.products);
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    }

    return (
        <>
            <Layout title="Product List">
                <div id="pageContainer" className="container">
                    {
                        <>
                            <Row className='mt-2'>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Row className="mb-3 p-2">
                                                <Col></Col>
                                                <Col>
                                                    <div className="image-container" >
                                                        <Card.Img variant="top" src={common.imageUrl + (productData[0]?.[0]?.product?.name ? productData[0]?.[0]?.product?.images[0]?.url : productData[0]?.[0]?.images[0]?.url)} style={{ height: 180, maxWidth: "50%" }} />
                                                        <div className="top-left ">{productData[0]?.[0]?.purpose || null}</div>
                                                    </div>
                                                    <div className="text-center pt-2 fs-5">
                                                        ₹{productData[0]?.[0]?.price}
                                                    </div>
                                                </Col>
                                                {productData[1] ? <Col>
                                                    <div className="image-container" >
                                                        <Card.Img variant="top" src={common.imageUrl + (productData[1]?.[0]?.product?.name ? productData[1]?.[0]?.product?.images[0]?.url : productData[1]?.[0]?.images[0]?.url)} style={{ height: 180, maxWidth: "50%" }} />
                                                        <div className="top-left ">{productData[1]?.[0]?.purpose || null}</div>
                                                    </div>
                                                    <div className="text-center pt-2 fs-5">
                                                        ₹{productData[1]?.[0]?.price}
                                                    </div>
                                                </Col> : null}
                                                {productData[2] ? <Col>
                                                    <div className="image-container" >
                                                        <Card.Img variant="top" src={common.imageUrl + (productData[2]?.[0]?.product?.name ? productData[2]?.[0]?.product?.images[0]?.url : productData[2]?.[0]?.images[0]?.url)} style={{ height: 180, maxWidth: "50%" }} />
                                                        <div className="top-left ">{productData[2]?.[0]?.purpose || null}</div>
                                                    </div>
                                                    <div className="text-center pt-2 fs-5">
                                                        ₹{productData[2]?.[0]?.price}
                                                    </div>
                                                </Col> : null}
                                                {productData[3] ? <Col>
                                                    <div className="image-container" >
                                                        <Card.Img variant="top" src={common.imageUrl + (productData[3]?.[0]?.product?.name ? productData[3]?.[0]?.product?.images[0]?.url : productData[3]?.[0]?.images[0]?.url)} style={{ height: 180, maxWidth: "50%" }} />
                                                        <div className="top-left ">{productData[3]?.[0]?.purpose || null}</div>
                                                    </div>
                                                    <div className="text-center pt-2 fs-5">
                                                        ₹{productData[3]?.[0]?.price}
                                                    </div>
                                                </Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Name :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.name}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.name}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.name}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.name}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Brand :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.brand}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.brand}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.brand}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.brand}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Specification :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.specifications.map((spec, i) => (
                                                    <>{spec.spec} | </>
                                                ))}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.specifications.map((spec, i) => (
                                                    <>{spec.spec} | </>
                                                ))}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.specifications.map((spec, i) => (
                                                    <>{spec.spec} | </>
                                                ))}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.specifications.map((spec, i) => (
                                                    <>{spec.spec} | </>
                                                ))}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Category :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.category?.categoryName}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.category?.categoryName}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.category?.categoryName}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.category?.categoryName}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Sub-Category :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.subcategory?.subcategoryName}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.subcategory?.subcategoryName}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.subcategory?.subcategoryName}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.subcategory?.subcategoryName}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1"> Status :</span></Col>
                                                <Col>{productData[0]?.[0]?.productStatus}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.productStatus}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.productStatus}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.productStatus}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Options :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.optionalField1} | {productData[0]?.[0]?.product?.optionalField2} | {productData[0]?.[0]?.product?.optionalField3} | {productData[0]?.[0]?.product?.optionalField4}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.optionalField1} | {productData[1]?.[0]?.product?.optionalField2} | {productData[1]?.[0]?.product?.optionalField3} | {productData[1]?.[0]?.product?.optionalField4}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.optionalField1} | {productData[2]?.[0]?.product?.optionalField2} | {productData[2]?.[0]?.product?.optionalField3} | {productData[2]?.[0]?.product?.optionalField4}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.optionalField1} | {productData[3]?.[0]?.product?.optionalField2} | {productData[3]?.[0]?.product?.optionalField3} | {productData[3]?.[0]?.product?.optionalField4}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1"> Description :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.description}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.description}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.description}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.description}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1"> Reward Parcent :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.productRewardPercent}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.productRewardPercent}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.productRewardPercent}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.productRewardPercent}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1"> Discount Parcent :</span></Col>
                                                <Col>{productData[0]?.[0]?.product?.discountPercent}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.product?.discountPercent}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.product?.discountPercent}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.product?.discountPercent}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Product Rating :</span></Col>
                                                <Col>{productData[0]?.[0]?.avgProductRating}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.avgProductRating}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.avgProductRating}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.avgProductRating}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Deliver Rating :</span></Col>
                                                <Col>{productData[0]?.[0]?.avgProductDeliveryRating}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.avgProductDeliveryRating}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.avgProductDeliveryRating}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.avgProductDeliveryRating}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Packing Rating :</span></Col>
                                                <Col>{productData[0]?.[0]?.avgProductPackagingRating}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.avgProductPackagingRating}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.avgProductPackagingRating}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.avgProductPackagingRating}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Quality Rating :</span></Col>
                                                <Col>{productData[0]?.[0]?.avgProductQualityRating}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.avgProductQualityRating}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.avgProductQualityRating}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.avgProductQualityRating}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Seller Name:</span></Col>
                                                <Col>{productData[0]?.[0]?.sellerDetails?.name}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.sellerDetails?.name}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.sellerDetails?.name}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.sellerDetails?.name}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">About Seller:</span></Col>
                                                <Col>{productData[0]?.[0]?.sellerDetails?.aboutMe}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.sellerDetails?.aboutMe}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.sellerDetails?.aboutMe}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.sellerDetails?.aboutMe}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Seller Rating:</span></Col>
                                                <Col>{productData[0]?.[0]?.sellerDetails?.avgSellerRating}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.sellerDetails?.avgSellerRating}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.sellerDetails?.avgSellerRating}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.sellerDetails?.avgSellerRating}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Seller contact :</span></Col>
                                                <Col>{productData[0]?.[0]?.sellerDetails?.email} | {productData[0]?.[0]?.sellerDetails?.phone}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.sellerDetails?.email} | {productData[1]?.[0]?.sellerDetails?.phone}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.sellerDetails?.email} | {productData[2]?.[0]?.sellerDetails?.phone}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.sellerDetails?.email} | {productData[3]?.[0]?.sellerDetails?.phone}</Col> : null}
                                            </Row>
                                            <Row className="mb-2">
                                                <Col><span className="fs-6 fw-bold me-1">Seller Address:</span></Col>
                                                <Col>{productData[0]?.[0]?.sellerDetails?.address1}</Col>
                                                {productData[1] ? <Col>{productData[1]?.[0]?.sellerDetails?.address1}</Col> : null}
                                                {productData[2] ? <Col>{productData[2]?.[0]?.sellerDetails?.address1}</Col> : null}
                                                {productData[3] ? <Col>{productData[3]?.[0]?.sellerDetails?.address1}</Col> : null}
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    }
                </div>
            </Layout>
        </>
    );
}

export default ProductCompare;
