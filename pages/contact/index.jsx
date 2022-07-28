import Link from 'next/link';
import { useState } from 'react';
import { Breadcrumb, Button, Card, Col, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/layout';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function ContactUs () {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

   const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Enter Your Name').min(3, 'Must be at least 3 characters'),
      phone: Yup.string()
        .required('Enter Phone Number')
        .matches(phoneRegExp, 'Phone number is not valid')
        .min(10, 'Phone number is not valid')
        .max(10, 'Phone number is not valid'),
      email: Yup.string().email('Invalid email address').required('Enter Email Address'),
      subject: Yup.string().required('Enter Subject').min(3, 'Must be at least 3 characters'),
      message: Yup.string().required('Enter Message').min(10, 'Must be at least 10 characters')
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      // formik.resetForm();
    }
  });

  return (
    <Layout title="Contact Us">
      <div id="pageContainer" className="container">
        <Breadcrumb className="m-2">
          <Link href="/" passHref>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item active>Contact Us</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md={6}>
            <Card className=" p-3 pt-1">
              <Card.Header className="border-bottom-0 bg-transparent">
                <Card.Title>
                  <span className="border-bottom  border-color-deep-purple-900 border-2 fs-4">Let&apos;s Get In Touch</span>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3 position-relative" controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      className={formik.touched.name && formik.errors.name ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2 position-relative" controlId="phone">
                    <Form.Control
                      type="phone"
                      name="phone"
                      placeholder="Phone No."
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      maxLength="10"
                      className={formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2 position-relative" controlId="email">
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      className={formik.touched.email && formik.errors.email ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2 position-relative" controlId="subject">
                    <Form.Control
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formik.values.subject}
                      onChange={formik.handleChange}
                      className={formik.touched.subject && formik.errors.subject ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3 mt-2 position-relative" controlId="message">
                    <Form.Control
                      as="textarea"
                      name="message"
                      rows={4}
                      placeholder="Message"
                      style={{ resize: 'none' }}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      className={formik.touched.message && formik.errors.message ? 'is-invalid' : ''}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {formik.errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="submitButton" className="float-end mt-3">
                    <Button variant="deep-purple-900 btn-rounded" type="submit" size="sm">
                      Send Message
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className=" p-3 pt-1">
              <Card.Header className="border-bottom-0 bg-transparent">
                <Card.Title>
                  <span className="border-bottom border-deep-purple-900 border-2 fs-4">Address</span>
                </Card.Title>
              </Card.Header>
              <Card.Body className="pt-0 contact">
                <div className="d-block">
                  <i className="fa fa-location-dot me-3"></i> Near 206 Bus Stand,
                </div>
                <div className="d-block">
                  <i className="fa fa-location-dot me-3"></i> BJ Block, Saltlake City, Sector 2,
                </div>
                <div className="d-block">
                  <i className="fa fa-location-dot me-3"></i> Kolkata, West Bengal 700091
                </div>
                <div className="d-block">
                  <i className="fa fa-phone me-3"></i> <Link href={'tel:+911234567890'}>+91 1234567890</Link>
                </div>
                <div className="d-block">
                  <i className="fa-solid fa-mobile-button me-3"></i>{' '}
                  <Link href={'tel:+911234567890'}>+91 1234567890</Link>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-md-1 p-3 pt-1">
              <Card.Header className="border-bottom-0 bg-transparent">
                <Card.Title>
                  <span className="border-bottom border-deep-purple-900 border-2 fs-4">Online service</span>
                </Card.Title>
              </Card.Header>
              <Card.Body className="pt-0 contact">               
                <div className="d-block">
                  <i className="fa fa-envelope me-3"></i>
                  <Link href={'mailto:info@emetacomm.com'}>info@emetacomm.com</Link>
                </div>
                <div className="d-block">
                  <i className="fa fa-at me-3"></i> <Link href={'mailto:info@emetacomm.com'}>help@emetacomm.com</Link>
                </div>
                <div className="d-block">
                  <i className="fa-brands fa-facebook me-3"></i>
                  <Link href={'https://www.facebook.com/softgem'}>facebook.com/softgem</Link>
                </div>
                <div className="d-block">
                  <i className="fa-brands fa-twitter me-3"></i>
                  <Link href={'https://www.facebook.com/softgem'}>twitter.com/softgem</Link>
                </div>
                
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
