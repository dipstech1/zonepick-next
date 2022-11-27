/* eslint-disable @next/next/no-img-element */
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import * as Yup from "yup";
import MyAccountLayout from "../../components/Account/myaccount";
import Layout from "../../components/Layout/layout";
import withAuth from "../../components/withAuth";
import axios from "../../utils/axios.interceptor";
import common from "../../utils/commonService";
import * as S3 from "aws-sdk/clients/s3";

const EditProfile = () => {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [userId, setUserId] = useState(null);

  const [imageLocation, setImageLocation] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadpercent, setUploadpercent] = useState(0);

  const [AWSCredentials, setAWSCredentials] = useState({
    AccessKeyID: "",
    SecretAccessKey: "",
    Region: "",
    BucketName: "",
  });

  const [userData, setUserData] = useState({
    address1: "",
    address2: "",
    address3: "",
    address4: "",
    address5: "",
    email: "",
    name: "",
    aboutme: "",
    phone: "",
    userId: "",
  });

  const formik = useFormik({
    initialValues: {
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      address5: "",
      email: "",
      name: "",
      aboutMe: "",
      phone: "",
      userId: "",
      profileImage: "",
      rewardWalletAddress: "",
      solnftWalletAddress: "",
      ethnftWalletAddress: "",
      bnbnftWalletAddress: "",
      ictnftWalletAddress: "",
      polygonnftWalletAddress: "",
      solRewardAddress: "",
      ethRewardAddress: "",
      bnbRewardAddress: "",
      ictRewardAddress: "",
      polygonRewardWalletAddress: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter Your Name").min(3, "Must be at least 3 characters"),
      phone: Yup.string()
        .required("Enter Phone Number")
        .matches(phoneRegExp, "Phone number is not valid")
        .min(10, "Phone number is not valid")
        .max(10, "Phone number is not valid"),
      email: Yup.string().email("Invalid email address").required("Enter Email Address"),
      aboutMe: Yup.string().required("Enter About Me").min(3, "Must be at least 3 characters"),
      address1: Yup.string().required("Enter Address-1").min(1, "Must be at least 1 characters"),
      address2: Yup.string().required("Enter Address-2").min(1, "Must be at least 1 characters"),
      address3: Yup.string().required("Enter Address-3").min(1, "Must be at least 1 characters"),
      address4: Yup.string().required("Enter Address-4").min(1, "Must be at least 1 characters"),
      // address5: Yup.string().required("Enter Address-5").min(1, "Must be at least 10 characters"),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      updateProfile(values);
    },
  });

  useEffect(() => {
    const userId = getCookie("userid");
    setUserId(userId);
    getUserData(userId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getUserData = async (userId) => {
    try {
      let resp = await axios.get(`profile/${userId}`);
      if (resp.data.length > 0) {
        setUserData({ ...resp.data[0] });
        setIsLoaded(true);
        formik.setFieldValue("userId", userId);
        formik.setFieldValue("name", resp.data[0].name || "");
        formik.setFieldValue("address1", resp.data[0].address1 || "");
        formik.setFieldValue("address2", resp.data[0].address2 || "");
        formik.setFieldValue("address3", resp.data[0].address3 || "");
        formik.setFieldValue("address4", resp.data[0].address4 || "");
        //  formik.setFieldValue("address5", resp.data[0].address5);
        formik.setFieldValue("email", resp.data[0].email || "");
        formik.setFieldValue("phone", resp.data[0].phone || "");
        formik.setFieldValue("aboutMe", resp.data[0].aboutMe || "");

        formik.setFieldValue("rewardWalletAddress", resp.data[0].rewardWalletAddress || "");
        formik.setFieldValue("solnftWalletAddress", resp.data[0].solnftWalletAddress || "");
        formik.setFieldValue("ethnftWalletAddress", resp.data[0].ethnftWalletAddress || "");
        formik.setFieldValue("bnbnftWalletAddress", resp.data[0].bnbnftWalletAddress || "");
        formik.setFieldValue("ictnftWalletAddress", resp.data[0].ictnftWalletAddress || "");
        formik.setFieldValue("polygonnftWalletAddress", resp.data[0].polygonnftWalletAddress || "");
        formik.setFieldValue("solRewardAddress", resp.data[0].solRewardAddress || "");
        formik.setFieldValue("ethRewardAddress", resp.data[0].ethRewardAddress || "");
        formik.setFieldValue("bnbRewardAddress", resp.data[0].bnbRewardAddress || "");
        formik.setFieldValue("ictRewardAddress", resp.data[0].ictRewardAddress || "");
        formik.setFieldValue("polygonRewardWalletAddress", resp.data[0].polygonRewardWalletAddress || "");


        formik.setFieldValue("profileImage", resp.data[0].profileImage || "");
        setImageLocation(common.avatorUrl + resp.data[0].profileImage);

        GetAWSCredentials();
      }

      // console.log(resp.data);
    } catch (error) {
      console.log(error);
      toast.error("Fail");
    }
  };

  const updateProfile = async (user, redirect = true) => {
    user.phone = +user.phone;

    try {
      let response = await axios.patch(`profile/${userId}`, user);

      if (response.data.acknowledged) {
        if (redirect) {
          toast.success("Profile Successfully Updated");
          router.back();
        } else {
          toast.success("Profile Image Successfully Updated");
        }
      } else {
        toast.warning("Fail");
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

          reader.onloadend = async () => {
            const file = event.target.files[0];
            const filetypes = file.type.split("/");
            const data = await uploadFile(file, filetypes[1], file.name);

            if ((data.status = "success")) {
              setUploadStatus("Complete");
              setUploadpercent(0);
              formik.setFieldValue("profileImage", data.fileName);

              const sendData = {
                address1: formik.values.address1,
                address2: formik.values.address2,
                address3: formik.values.address3,
                address4: formik.values.address4,
                address5: formik.values.address5,
                email: formik.values.email,
                name: formik.values.name,
                aboutMe: formik.values.aboutMe,
                phone: formik.values.phone,
                userId: formik.values.userId,
                profileImage: data.fileName,
              };

              updateProfile(sendData, false);
            }
          };
          reader.onerror = () => {
            console.log(reader.error);
          };
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
        Key: "upload_doc/avator/" + filename_with_suffix,
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
      <Layout title="Edit Profile" metaDescription={[{ name: "description", content: "Edit Profile" }]}>
        <div id="pageContainer" className="container">
          <Breadcrumb className="m-2">
            <Link href="/" passHref>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
            </Link>
            <Link href="/account" passHref>
              <Breadcrumb.Item>My Account</Breadcrumb.Item>
            </Link>
            <Breadcrumb.Item active>Edit Profile</Breadcrumb.Item>
          </Breadcrumb>
          <MyAccountLayout title="Edit Profile" enableBack={true}>
            {isLoaded ? (
              <div className="py-3 px-5">
                <Row className="mt-2">
                  <Col className="text-center">
                    <button type="button" className="btn" onClick={getFile}>
                      <div className="image-container">
                        <img
                          className="m-auto mr-lg-auto profile_img"
                          src={imageLocation}
                          onError={(e) => {
                            e.currentTarget.src = "/img/avator/no-image-icon.jpg";
                          }}
                          alt="Profile Picture"
                        />

                        {uploadStatus !== "" ? (
                          <>
                            <div className="bottom-right">
                              <span className="text-uppercase">{uploadStatus}</span>
                            </div>
                          </>
                        ) : null}

                        {uploadpercent > 0 ? (
                          <>
                            <div className="centered">
                              <span className="text-uppercase">{uploadpercent}</span>
                            </div>
                          </>
                        ) : null}
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
                </Row>

                <Row className="mt-4">
                  <Col>
                    <Form onSubmit={formik.handleSubmit}>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="name">
                            <Form.Label className="fw-bold">Your Name:</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Enter Your Name"
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
                          <Form.Group className="mb-2 position-relative" controlId="phone">
                            <Form.Label className="fw-bold">Phone No:</Form.Label>
                            <Form.Control
                              type="phone"
                              name="phone"
                              placeholder="Phone No."
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              maxLength="10"
                              className={formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-2 position-relative" controlId="email">
                            <Form.Label className="fw-bold">Email Address:</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Email address"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              className={formik.touched.email && formik.errors.email ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-2 position-relative" controlId="address1">
                            <Form.Label className="fw-bold">Address Line 1:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address1"
                              placeholder="Address Line 1"
                              style={{ resize: "none" }}
                              value={formik.values.address1}
                              onChange={formik.handleChange}
                              className={formik.touched.address1 && formik.errors.address1 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address1}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-2 position-relative" controlId="address2">
                            <Form.Label className="fw-bold">Address Line 2:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address2"
                              placeholder="Address Line 2"
                              style={{ resize: "none" }}
                              value={formik.values.address2}
                              onChange={formik.handleChange}
                              className={formik.touched.address2 && formik.errors.address2 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address2}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="address3">
                            <Form.Label className="fw-bold">Address Line 3:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address3"
                              placeholder="Address Line 3"
                              style={{ resize: "none" }}
                              value={formik.values.address3}
                              onChange={formik.handleChange}
                              className={formik.touched.address3 && formik.errors.address3 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address3}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="address4">
                            <Form.Label className="fw-bold">Address Line 4:</Form.Label>
                            <Form.Control
                              type="text"
                              name="address4"
                              placeholder="Address Line 4"
                              style={{ resize: "none" }}
                              value={formik.values.address4}
                              onChange={formik.handleChange}
                              className={formik.touched.address4 && formik.errors.address4 ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.address4}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="rewardWalletAddress">
                            <Form.Label className="fw-bold">Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="rewardWalletAddress"
                              placeholder="Enter Reward Wallet Address"
                              value={formik.values.rewardWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.rewardWalletAddress && formik.errors.rewardWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.rewardWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="solnftWalletAddress">
                            <Form.Label className="fw-bold">Sol NFT Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="solnftWalletAddress"
                              placeholder="Enter Sol NFT Wallet Address"
                              value={formik.values.solnftWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.solnftWalletAddress && formik.errors.solnftWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.solnftWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="ethnftWalletAddress">
                            <Form.Label className="fw-bold">Eth NFT Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="ethnftWalletAddress"
                              placeholder="Enter Eth NFT Wallet Address"
                              value={formik.values.ethnftWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.ethnftWalletAddress && formik.errors.ethnftWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.ethnftWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="bnbnftWalletAddress">
                            <Form.Label className="fw-bold">Bnb NFT Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="bnbnftWalletAddress"
                              placeholder="Enter Bnb NFT Wallet Address"
                              value={formik.values.bnbnftWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.bnbnftWalletAddress && formik.errors.bnbnftWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.bnbnftWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="ictnftWalletAddress">
                            <Form.Label className="fw-bold">Ict NFT Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="ictnftWalletAddress"
                              placeholder="Enter Ict NFT Wallet Address"
                              value={formik.values.ictnftWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.ictnftWalletAddress && formik.errors.ictnftWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.ictnftWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="polygonnftWalletAddress">
                            <Form.Label className="fw-bold">Polygon NFT Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="polygonnftWalletAddress"
                              placeholder="Enter Polygon NFT Wallet Address"
                              value={formik.values.polygonnftWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.polygonnftWalletAddress && formik.errors.polygonnftWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.polygonnftWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="solRewardAddress">
                            <Form.Label className="fw-bold">Sol Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="solRewardAddress"
                              placeholder="Enter Sol Reward Wallet Address"
                              value={formik.values.solRewardAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.solRewardAddress && formik.errors.solRewardAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.solRewardAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="ethRewardAddress">
                            <Form.Label className="fw-bold">Eth Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="ethRewardAddress"
                              placeholder="Enter Eth Reward Wallet Address"
                              value={formik.values.ethRewardAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.ethRewardAddress && formik.errors.ethRewardAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.ethRewardAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="bnbRewardAddress">
                            <Form.Label className="fw-bold">Bnb Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="bnbRewardAddress"
                              placeholder="Enter Bnb Reward Wallet Address"
                              value={formik.values.bnbRewardAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.bnbRewardAddress && formik.errors.bnbRewardAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.bnbRewardAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="ictRewardAddress">
                            <Form.Label className="fw-bold">Ict Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="ictRewardAddress"
                              placeholder="Enter Ict Reward Wallet Address"
                              value={formik.values.ictRewardAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.ictRewardAddress && formik.errors.ictRewardAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.ictRewardAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="polygonRewardWalletAddress">
                            <Form.Label className="fw-bold">Polygon Reward Wallet Address:</Form.Label>
                            <Form.Control
                              type="text"
                              name="polygonRewardWalletAddress"
                              placeholder="Enter Polygon Reward Wallet Address"
                              value={formik.values.polygonRewardWalletAddress}
                              onChange={formik.handleChange}
                              className={formik.touched.polygonRewardWalletAddress && formik.errors.polygonRewardWalletAddress ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.polygonRewardWalletAddress}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col>
                          <Form.Group className="mb-2 position-relative" controlId="aboutMe">
                            <Form.Label className="fw-bold">About Me:</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="aboutMe"
                              rows={4}
                              placeholder="About Me"
                              style={{ resize: "none" }}
                              value={formik.values.aboutMe}
                              onChange={formik.handleChange}
                              className={formik.touched.aboutMe && formik.errors.aboutMe ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">{formik.errors.aboutMe}</Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group controlId="submitButton" className="float-end mt-3">
                        <Button variant="deep-purple-900" type="submit" style={{ width: 132 }}>
                          Update
                        </Button>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </div>
            ) : null}
          </MyAccountLayout>
        </div>
      </Layout>
    </>
  );
};

export default withAuth(EditProfile, ["admin", "super-admin", "user"]);
