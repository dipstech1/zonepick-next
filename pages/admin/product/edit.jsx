/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Container, Form, ProgressBar, Row, Tab, Tabs, Card } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../components/Account/myaccount";
import ImageList from "../../../components/imageList";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";
import * as S3 from "aws-sdk/clients/s3";
import ARUploader from "../../../components/arUploader";

const EditProductPage = () => {
    const router = useRouter();
    const [isAddSpecification, setIsAddSpecification] = useState(false);
    const [specification, setSpecification] = useState("");
    const [specificationId, setSpecificationId] = useState(null);
    const [mode, setMode] = useState("Add");

    const components = {
        DropdownIndicator: null,
    };

    const [AWSCredentials, setAWSCredentials] = useState({
        AccessKeyID: "",
        SecretAccessKey: "",
        Region: "",
        BucketName: "",
    });

    const [brandOptions, setBrandOptions] = useState([]);

    const [uploadpercent, setUploadpercent] = useState(0);
    const [uploadCurrent, setUploadCurrent] = useState(0);

    const [categoryOptions, setCategoryOptions] = useState([]);
    const [subcategoryOptions, setSubcategoryOptions] = useState([]);

    const [imageData, setImageData] = useState({
        productImage: [],
        threeSixtyImage: [],
        threedImage: [],
        ARImage: [],
        allImage: [],
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            productId: "",
            category: "",
            subcategory: "",
            brand: "",
            brandId: "",
            userid: "",
            arimageurl: "",
            arimagedata: "",
            images: [],
            specifications: [],
            specificationsValue: "",
            sellerDiscountPercent: "",
            productRewardPercent: "",
            optionalField1: "",
            optionalField2: "",
            optionalField3: "",
            optionalField4: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required").min(2, "Must be at least 2 characters"),
            brand: Yup.string().required("Required").min(2, "Must be at least 2 characters"),
            description: Yup.string().required("Required").min(5, "Must be at least 5 characters"),
            category: Yup.string().required("Required"),
            subcategory: Yup.string().required("Required"),
            sellerDiscountPercent: Yup.number().required("Required").min(0, "Must be 0 Or greater than 0"),
            productRewardPercent: Yup.number().required("Required").min(0, "Must be 0 Or greater than 0"),
        }),
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2));

            // formik.resetForm();
        },
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (sessionStorage.getItem("product")) {
            const data = JSON.parse(sessionStorage.getItem("product"));

            formik.setFieldValue("name", data.name);
            formik.setFieldValue("description", data.description);
            formik.setFieldValue("category", data.category.id);
            formik.setFieldValue("subcategory", data.subcategory.id);
            formik.setFieldValue("brand", data.brand);
            formik.setFieldValue("sellerDiscountPercent", data.discountPercent);
            formik.setFieldValue("productRewardPercent", data.productRewardPercent);
            formik.setFieldValue("specifications", data.specifications);
            formik.setFieldValue("optionalField1", data.optionalField1);
            formik.setFieldValue("optionalField2", data.optionalField2);
            formik.setFieldValue("optionalField3", data.optionalField3);
            formik.setFieldValue("optionalField4", data.optionalField4);
            formik.setFieldValue("productId", data.productId);
            formik.setFieldValue("images", data.images)
            getBrandtList();

            if (data.category) {
                getSubcategorytList(data?.category?.categoryName);
            }
        }
        GetAWSCredentials();
        getCategorytList();
    }, []);

    const getBrandtList = async () => {
        try {
            let resp = await axios.get("brand");
            if (resp.data.data.length > 0) {
                const item = [];
                for (let i = 0; i < resp.data.data.length; i++) {
                    item.push({ value: resp.data.data[i].id, label: resp.data.data[i].brandName });
                }
                setBrandOptions([...item]);
            }
            console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const getCategorytList = async () => {
        try {
            let resp = await axios.get("category/categories");
            if (resp.data.length > 0) {
                const item = [];
                for (let i = 0; i < resp.data.length; i++) {
                    item.push({ value: resp.data[i].id, label: resp.data[i].categoryName });
                }
                setCategoryOptions([...item]);
            }
            // console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const getSubcategorytList = async (categoryName) => {
        try {
            const sendData = {
                category: categoryName,
            };
            let resp = await axios.post("category", sendData);
            if (resp.data.length > 0) {
                const data = resp.data[0].subcategories;
                const item = [];
                for (let i = 0; i < data.length; i++) {
                    item.push({ value: data[i].id, label: data[i].subcategoryName });
                }
                setSubcategoryOptions([...item]);
            }
            // console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const createOption = (label) => ({
        label: label,
        value: label,
        spec: label,
    });


    const getCategoryData = () => {
        const data = categoryOptions.filter((e) => {
            return e.value === parseInt(formik.values.category);
        });

        // console.log(data);

        return data;
    };

    const getSubategoryData = () => {
        const data = subcategoryOptions.filter((e) => {
            return e.value === parseInt(formik.values.subcategory);
        });

        return data;
    };

    const getBrandData = () => {
        const data = brandOptions.filter((e) => {
            return e.label === formik.values.brand;
            // return e.value === parseInt(formik.values.brandId);
        });
        // console.log(data);
        return data;
    };

    const imageLoaded = (data) => {
        setImageData({ ...imageData, productImage: data });
    };

    const image360Loaded = (data) => {
        setImageData({ ...imageData, threeSixtyImage: data });
    };

    const ARImageLoaded = (data) => {
        setImageData({ ...imageData, ARImage: data });
    };

    const onSubmitClick = async () => {
        const images = [];
        let imageList = [...imageData.allImage];

        let arimageurl = "";

        for (let i = 0; i < imageData.allImage.length; i++) {
            const file = imageData.allImage[i].fileInfo.file;
            const fileType = imageData.allImage[i].fileInfo.file.type.split("/");
            const fileName = imageData.allImage[i].fileInfo.file.name;

            setUploadCurrent(fileName);

            let data = [];

            if (imageData.allImage[i].fileType !== "AR IMAGE") {
                data = await uploadFiles(file, fileType[1], fileName);
            } else {
                data = await uploadFiles(file, "glb", fileName);
            }

            if (data.status === "success" && imageData.allImage[i].fileType !== "AR IMAGE") {
                images.push({ url: data.fileName, type: imageData.allImage[i].fileType });
                imageList[i].status = "done";
            } else {
                arimageurl = data.fileName;
                imageList[i].status = "done";
            }
            setImageData({ ...imageData, allImage: imageList });
        }

        setUploadpercent(0);

        let product = {
            name: formik.values.name,
            description: formik.values.description,
            category: formik.values.category,
            subcategory: formik.values.subcategory,
            brand: formik.values.brand,
            userid: "",
            arimageurl: arimageurl,
            arimagedata: "",
            // images: images,
            // specifications: formik.values.specifications,
            discountPercent: parseInt(formik.values.sellerDiscountPercent),
            productRewardPercent: parseInt(formik.values.productRewardPercent),
            optionalField1: formik.values.optionalField1,
            optionalField2: formik.values.optionalField2,
            optionalField3: formik.values.optionalField3,
            optionalField4: formik.values.optionalField4,
        };
        product.userid = getCookie("userid");

        try {
            let added = await axios.put(`admin/products/${formik.values.productId}`, product);

            if (added.data.acknowledge) {
                router.replace("/admin/product");
                toast.success("Product updated Successfully");
            } else {
                toast.error("Fail");
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const GetAWSCredentials = async () => {
        try {
            let resp = await axios.get("utilities/aws");

            if (resp.data) {
                setAWSCredentials(resp.data);
            }

            //  console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const uploadFiles = async (file, filetype, filename) => {
        return new Promise((resolve, reject) => {
            const contentType = file.type;
            const bucket = new S3({
                accessKeyId: AWSCredentials.AccessKeyID,
                secretAccessKey: AWSCredentials.SecretAccessKey,
                region: AWSCredentials.Region,
            });

            const filename_with_suffix = new Date().valueOf() + "." + filetype;
            let params = {
                Bucket: "www.emetacomm.com",
                Key: "upload_doc/images/" + filename_with_suffix,
                Body: file,
                ACL: "public-read",
                ContentType: contentType,
            };

            if (filetype === "glb") {
                params.Key = "upload_doc/glb/" + filename_with_suffix;
            }

            bucket
                .upload(params)
                .on("httpUploadProgress", (evt) => {
                    console.log((evt.loaded / evt.total) * 100);
                    setUploadpercent(((evt.loaded / evt.total) * 100).toFixed(0));
                })
                .send((err, data) => {
                    if (err) {
                        console.log("There was an error uploading your file: ", err);
                    }
                });

            bucket.upload(params, (err, data) => {
                if (err) {
                    console.log("There was an error uploading your file: ", err);

                    reject({
                        status: "error",
                    });
                }

                resolve({
                    status: "success",
                    fileName: filename_with_suffix,
                });
            });
        });
    };

    const specificationClick = async (e) => {
        e.preventDefault();
        let data = {
            productId: formik.values.productId,
            spec: specification
        }
        try {
            let added = await axios.post(`specification`, data);
            if (added.data.acknowledge) {
                setIsAddSpecification(false);
                toast.success("Specification Added");
            }
        } catch (error) {
            console.log(error)
            toast.error("Fail")
        }
    };

    const onSpecificationEditClic = ({ id, spec }) => {
        setSpecification(spec);
        setSpecificationId(id);
        setIsAddSpecification(true);
        setMode("Edit");
    };

    const reset = () => {
        setSpecification("");
        setSpecificationId(null);
        setIsAddSpecification(false);
        setMode("Add");
    };

    const onUpdateClick = async () => {
        try {
            let resp = await axios.put(`specification/${specificationId}`, { spec: specification });
            if (resp.data.acknowledge) {
                toast.success("Successfully Updated");
                reset();
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };

    const onDeleteClick = async ({ id }) => {
        try {
            let resp = await axios.delete(`specification/${id}`);
            if (resp.data.acknowledge) {
                toast.success("Succefully Delete");
            }
        } catch (error) {
            console.log(error);
            toast.error("Fail");
        }
    };


    return (
        <>
            <Layout title="Edit Product" metaDescription={[{ name: "description", content: "Edit Product" }]}>
                <div id="pageContainer" className="container">
                    <Breadcrumb className="m-2">
                        <Link href="/" passHref>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Link>
                        <Link href="/account" passHref>
                            <Breadcrumb.Item>My Account</Breadcrumb.Item>
                        </Link>
                        <Link href="/admin/product" passHref>
                            <Breadcrumb.Item>Product</Breadcrumb.Item>
                        </Link>
                        <Breadcrumb.Item active>Edit Product</Breadcrumb.Item>
                    </Breadcrumb>
                    <MyAccountLayout title={"Edit Product Of " + formik.values.name} activeLink={10} enableBack={true}>
                        <div className="px-md-5 px-2 py-3">
                            <Container>
                                <Row>
                                    <Col id={"editTabs"}>
                                        <Form onSubmit={formik.handleSubmit}>
                                            <Tabs defaultActiveKey="name" id="uncontrolled-tab" className="mb-3 nav-fill">
                                                <Tab eventKey="name" title={"Details"}>
                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-2 position-relative" controlId="name">
                                                                <Form.Label className="fw-bold">Product Name:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="name"
                                                                    placeholder="Enter Product Name"
                                                                    value={formik.values.name}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.name && formik.errors.name ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="brand">
                                                                <Form.Label className="fw-bold">Brand:</Form.Label>
                                                                <Select
                                                                    menuPlacement="bottom"
                                                                    options={brandOptions}
                                                                    placeholder={formik.values.brand}
                                                                    value={getBrandData()}
                                                                    onChange={(selectedOption) => {
                                                                        formik.setFieldValue("brand", selectedOption.label);
                                                                        formik.setFieldValue("brandId", selectedOption.value);
                                                                    }}
                                                                    className={formik.touched.brand && formik.errors.brand ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.brand}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group className="mb-2 position-relative" controlId="sellerDiscountPercent">
                                                                <Form.Label className="fw-bold">Discount Percent:</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="sellerDiscountPercent"
                                                                    placeholder="Enter Discount Percent"
                                                                    value={formik.values.sellerDiscountPercent}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.sellerDiscountPercent && formik.errors.sellerDiscountPercent ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.sellerDiscountPercent}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={3}>
                                                            <Form.Group className="mb-2 position-relative" controlId="productRewardPercent">
                                                                <Form.Label className="fw-bold">Reward Percent:</Form.Label>
                                                                <Form.Control
                                                                    type="number"
                                                                    name="productRewardPercent"
                                                                    placeholder="Enter Reward Percent"
                                                                    value={formik.values.productRewardPercent}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.productRewardPercent && formik.errors.productRewardPercent ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.productRewardPercent}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col>
                                                            <Form.Group className="mb-2 position-relative" controlId="description">
                                                                <Form.Label className="fw-bold">Description:</Form.Label>
                                                                <Form.Control
                                                                    as="textarea"
                                                                    name="description"
                                                                    rows={3}
                                                                    placeholder="Description"
                                                                    style={{ resize: "none" }}
                                                                    value={formik.values.description}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.description && formik.errors.description ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.description}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="category">
                                                                <Form.Label className="fw-bold">Category:</Form.Label>
                                                                <Select
                                                                    menuPlacement="top"
                                                                    options={categoryOptions}
                                                                    placeholder={formik.values.category}
                                                                    value={getCategoryData()}
                                                                    onChange={(selectedOption) => {
                                                                        getSubcategorytList(selectedOption.label);
                                                                        formik.setFieldValue("category", selectedOption.value);
                                                                        formik.setFieldValue("subcategory", "");
                                                                    }}
                                                                    className={formik.touched.category && formik.errors.category ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="subcategory">
                                                                <Form.Label className="fw-bold">Subcategory:</Form.Label>
                                                                <Select
                                                                    menuPlacement="top"
                                                                    options={subcategoryOptions}
                                                                    placeholder={formik.values.subcategory ? formik.values.subcategory : "Select Subcategory"}
                                                                    value={getSubategoryData()}
                                                                    onChange={(selectedOption) => {
                                                                        formik.setFieldValue("subcategory", selectedOption.value);
                                                                    }}
                                                                    className={formik.touched.subcategory && formik.errors.subcategory ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.subcategory}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="optionalField1">
                                                                <Form.Label className="fw-bold">Optional Field-1:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="optionalField1"
                                                                    placeholder="Enter Optional Field-1"
                                                                    value={formik.values.optionalField1}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.optionalField1 && formik.errors.optionalField1 ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.optionalField1}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="optionalField2">
                                                                <Form.Label className="fw-bold">Optional Field-2:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="optionalField2"
                                                                    placeholder="Enter Optional Field-2"
                                                                    value={formik.values.optionalField2}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.optionalField2 && formik.errors.optionalField2 ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.optionalField2}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="optionalField3">
                                                                <Form.Label className="fw-bold">Optional Field-3:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="optionalField3"
                                                                    placeholder="Enter Optional Field-3"
                                                                    value={formik.values.optionalField3}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.optionalField3 && formik.errors.optionalField3 ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.optionalField3}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col md={6}>
                                                            <Form.Group className="mb-2 position-relative" controlId="optionalField4">
                                                                <Form.Label className="fw-bold">Optional Field-4:</Form.Label>
                                                                <Form.Control
                                                                    type="text"
                                                                    name="optionalField4"
                                                                    placeholder="Enter Optional Field-4"
                                                                    value={formik.values.optionalField4}
                                                                    onChange={formik.handleChange}
                                                                    className={formik.touched.optionalField4 && formik.errors.optionalField4 ? "is-invalid" : ""}
                                                                />
                                                                <Form.Control.Feedback type="invalid">{formik.errors.optionalField4}</Form.Control.Feedback>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Tab>
                                                <Tab eventKey={"specification"} title={"Specification"}>
                                                    {isAddSpecification ? null :
                                                        <div className="d-block text-end mb-2">
                                                            <Button variant="warning" size="sm"
                                                                type="button"
                                                                style={{ fontSize: ".90rem" }}
                                                                onClick={() => setIsAddSpecification(!isAddSpecification)}
                                                            >
                                                                Add New Specification
                                                            </Button>
                                                        </div>}
                                                    {
                                                        isAddSpecification ?
                                                            <Card>
                                                                <Card.Body>
                                                                    <Row>
                                                                        <Form.Group className="mb-2 position-relative" controlId="specification">
                                                                            <Form.Label className="fw-bold">Product Specification:</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="specification"
                                                                                placeholder="Enter Product Specification"
                                                                                value={specification}
                                                                                onChange={(e) => setSpecification(e.target.value)}
                                                                            />
                                                                        </Form.Group>
                                                                    </Row>
                                                                    {mode === "Add" ?
                                                                        <Form.Group controlId="submitButton" className="text-center mt-5">
                                                                            <Button variant="primary"
                                                                                size="sm"
                                                                                style={{ width: '120px' }}
                                                                                onClick={(e) => specificationClick(e)}
                                                                            >
                                                                                Add
                                                                            </Button>
                                                                            <Button variant="danger" className="ms-2 text-white"
                                                                                size="sm"
                                                                                style={{ width: '120px' }}
                                                                                onClick={reset}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </Form.Group> :
                                                                        <Form.Group controlId="submitButton" className="text-center mt-5">
                                                                            <Button variant="primary"
                                                                                size="sm"
                                                                                style={{ width: '120px' }}
                                                                                onClick={onUpdateClick}
                                                                            >
                                                                                Update
                                                                            </Button>
                                                                            <Button variant="danger" className="ms-2 text-white"
                                                                                size="sm"
                                                                                style={{ width: '120px' }}
                                                                                onClick={reset}
                                                                            >
                                                                                Cancel
                                                                            </Button>
                                                                        </Form.Group>
                                                                    }
                                                                </Card.Body>
                                                            </Card>
                                                            :
                                                            formik.values.specifications &&
                                                            formik.values.specifications.map((data, i) => (
                                                                <Row key={i} className="mb-2">
                                                                    <Col>
                                                                        <Card>
                                                                            <Card.Body>
                                                                                <div className="d-inline-block">
                                                                                    {data?.spec}
                                                                                </div>
                                                                                <div className="d-inline-block float-end">
                                                                                    <i className="fa fa-edit me-2"
                                                                                        onClick={() => onSpecificationEditClic(data)}
                                                                                        style={{ cursor: 'pointer' }}>
                                                                                    </i>
                                                                                    <i className="fa fa-trash"
                                                                                        onClick={() => onDeleteClick(data)}
                                                                                        style={{ cursor: 'pointer' }}>
                                                                                    </i>
                                                                                </div>
                                                                            </Card.Body>
                                                                        </Card>
                                                                    </Col>
                                                                </Row>
                                                            ))}
                                                </Tab>
                                                <Tab eventKey={"image"} title={"Images"}>
                                                    <ImageList
                                                        imagesList={formik.values.images}
                                                        onSelectionChanged={imageLoaded}

                                                    />
                                                </Tab>
                                            </Tabs>
                                            {isAddSpecification || mode === "Edit" ? null :
                                                <Form.Group controlId="submitButton" className="float-end mt-3">
                                                    <Button variant="deep-purple-900"
                                                        onClick={(e) => onSubmitClick()}
                                                    >
                                                        submit
                                                    </Button>
                                                </Form.Group>}
                                        </Form>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </MyAccountLayout>
                </div>
            </Layout>
        </>
    );
};
export default withAuth(EditProductPage, ["ADMIN"]);
