/* eslint-disable @next/next/no-img-element */
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { Breadcrumb, Button, Col, Form, Row, Tabs, Tab, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../../components/Account/myaccount";
import Layout from "../../../components/Layout/layout";
import withAuth from "../../../components/withAuth";
import axios from "../../../utils/axios.interceptor";
import * as S3 from "aws-sdk/clients/s3";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const AddCategoryPage = () => {
  const router = useRouter();

  const [imageLocation, setImageLocation] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState();
  const [uploadpercent, setUploadpercent] = useState(0);

  const [AWSCredentials, setAWSCredentials] = useState({
    AccessKeyID: "",
    SecretAccessKey: "",
    Region: "",
    BucketName: "",
  });

  const formik = useFormik({
    initialValues: {
      userid: "",
      categoryName: "",
      image: "",
      subcategories: [],
    },
    validationSchema: Yup.object({
      categoryName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      //  console.log(JSON.stringify(values, null, 2));
      addCategory(values);
    },
  });

  useEffect(() => {
    GetAWSCredentials();
  }, []);

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

  const addCategory = async (category) => {
    category.userid = getCookie("userid");
    // console.log(category);

    try {
      if (selectedFiles) {
        const file = selectedFiles.item(0);
        const filetypes = file.type.split("/");
        const data = await uploadFile(file, filetypes[1], file.name);

        if ((data.status = "success")) {
          category.image = data.fileName;
          let resp = await axios.post("admin/create-category", category);

          if (resp.data.acknowledge) {
            router.back();
            toast.success("Category added Successfully");
          } else {
            toast.error("Fail");
          }
        }
      } else {
        toast.error("Please select an Image");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const getFile = () => {
    if (document.getElementById("imgload")) {
      document.getElementById("imgload")?.click();
    }
  };

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFiles(event.target.files);

      let msg = "";
      const imagefile = event.target.files[0].type;
      const match = ["image/jpeg", "image/jpg", "image/png"];

      const img = new Image();
      img.src = window.URL.createObjectURL(event.target.files[0]);

      img.onload = () => {
        if (!(imagefile === match[0] || imagefile === match[1] || imagefile === match[2])) {
          alert("Please Select JPG/JPEG/PNG File.");
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (events) => {
            setImageLocation(events.target.result);
          };

          reader.onloadend = () => {
            console.log("XX");
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
          setFileName(event.target.files[0].name);
        }
      };
    }
  };

  const uploadFile = async (file, filetype) => {
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

  return (
    <>
      <Layout title="Add Category" metaDescription={[{ name: "description", content: "Add Category" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Link href="/admin/category" passHref>
              <Breadcrumb.Item>Category</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Add Category</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Add Category" activeLink={8} enableBack={true}>
            <div id="editTabs" className="py-3 px-5">
              <Tabs defaultActiveKey="name" id="uncontrolled-tab" className="mb-3 nav-fill">
                <Tab eventKey="name" title="Category Name">
                  <Row>
                    <Col>
                      <Form onSubmit={formik.handleSubmit}>
                        <Row>
                          <Col>
                            <Form.Group className="mb-2 position-relative" controlId="categoryName">
                              <Form.Label className="fw-bold">Category Name:</Form.Label>
                              <Form.Control
                                type="text"
                                name="categoryName"
                                placeholder="Enter Category Name"
                                value={formik.values.categoryName}
                                onChange={formik.handleChange}
                                className={formik.touched.categoryName && formik.errors.categoryName ? "is-invalid" : ""}
                              />
                              <Form.Control.Feedback type="invalid">{formik.errors.categoryName}</Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>

                        {uploadpercent > 0 ? (
                          <Row className="mb-2">
                            <Col>
                              <ProgressBar now={uploadpercent} label={uploadpercent}></ProgressBar>
                            </Col>
                          </Row>
                        ) : null}

                        <Form.Group controlId="submitButton" className="text-center mt-5">
                          <Button variant="deep-purple-900" type="submit" style={{ width: "120px" }}>
                            Add
                          </Button>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="image" title="Category Image">
                  <Row>
                    <Col xs={6} lg={3} className={"uploader-container "}>
                      <button type="button" className="btn" onClick={getFile}>
                        <div className="image-container">
                          <img src="/img/browse_ic.svg" alt="" className="img-responsive-uploader" />
                          <div className="centered text-nowrap">Upload Image</div>
                        </div>
                      </button>
                      <input
                        type="file"
                        className="custom-file-input"
                        accept={"image/png,image/jpg,image/jpeg"}
                        id={"imgload"}
                        onChange={onFileChange}
                        hidden={true}
                      />
                    </Col>
                    <Col>{imageLocation !== "" ? <img src={imageLocation} alt="Images" id="previewing2" style={{ maxHeight: 90 }} /> : null}</Col>
                  </Row>
                </Tab>
              </Tabs>
            </div>
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};
export default withAuth(AddCategoryPage, ["ADMIN"]);
