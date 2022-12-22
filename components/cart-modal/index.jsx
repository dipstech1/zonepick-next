import { getCookie } from 'cookies-next';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { default as Select } from 'react-select';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import cartService from '../../services/cart-service';

const CartModal = ({ onClose, itemDetails = {} }) => {
  const [show, setShow] = useState(true);

  const [cartInfo, setCartInfo] = useState([]);

  const formik = useFormik({
    initialValues: {
      userid: '',
      orderedQuantity: 0,
      purpose: 'Single',
      courseDate: 0,
      courseTimingId: 0,
    },
    validationSchema: Yup.object({
      orderedQuantity: Yup.number().required('Required'),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      onAddToCart(values);
    },
  });

  const [timingList, setTimingList] = useState([]);

  useEffect(() => {
    const userId = getCookie('jr1hIxJJ2Ia5c');

    formik.setFieldValue('userid', userId);
    formik.setFieldValue('courseDate', formatDate(new Date()));
    formik.setFieldValue('purpose', itemDetails.purpose);

    getData();

    console.log(itemDetails);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose('selectedItem');
    setShow(false);
  };

  const getData = async () => {
    try {
      const userId = getCookie('jr1hIxJJ2Ia5c');
      const resp = await Promise.all([cartService.getData(userId)]);

      let tempCart = [];

      if (resp) {
        tempCart = resp[0].data.length > 0 ? resp[0].data : [];
      }

      setCartInfo(tempCart);

      const tempTiming = itemDetails.course.timing;

      const tempData = [];

      for (let i = 0; i < tempTiming.length; i++) {
        tempData.push({ value: tempTiming[i].id, label: tempTiming[i].day + ' [' + tempTiming[i].startTime + ' - ' + tempTiming[i].endTime + ']' });
      }
      if (tempData.length > 0) {
        formik.setFieldValue('courseTimingId', tempData[0].value);
      }
      setTimingList(tempData);
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const onAddToCart = async (cartData) => {
    if (cartInfo.length > 0) {
      let sendData = {
        courseRecordId: itemDetails?.recordId,
        cartId: cartInfo[0].id,
        courseTimingId: formik.values.courseTimingId,
        quantity: formik.values.orderedQuantity,
      };

      addToCartDetails(sendData);
    } else {
      createCart(cartData);
    }
  };

  const createCart = async (cartData) => {
    cartData.courseDate = Math.round(new Date(formik.values.courseDate).getTime());

    try {
      let response = await cartService.addCart(cartData);

      if (response.data.acknowledge) {
        let sendData = {
          courseRecordId: itemDetails?.recordId,
          cartId: response.data.cartId,
          courseTimingId: formik.values.courseTimingId,
          quantity: formik.values.orderedQuantity,
        };

        addToCartDetails(sendData);
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const addToCartDetails = async (sendData) => {
    try {
      let response = await cartService.addToCartDetails(sendData);

      if (response.data.acknowledge) {
        toast.success('Item added to Cart');
        setShow(false);
        handleClose();
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const getTimingDetails = () => {
    const data = timingList.filter((item) => {
      return item.value === formik.values.courseTimingId;
    });
    return data;
  };

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Header closeButton className="pt-2 pb-2">
          <Modal.Title className="fs-5">Cart Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={8}>
              <Form.Group className="mb-2 position-relative" controlId="courseTimingId">
                <Form.Label className="fw-bold">Timing:</Form.Label>
                <Select
                  id="courseTimingId"
                  menuPlacement="bottom"
                  options={timingList}
                  placeholder="Select Timing"
                  value={getTimingDetails()}
                  onChange={(selectedOption) => {
                    formik.setFieldValue('courseTimingId', selectedOption.value);
                  }}
                  className={formik.touched.courseTimingId && formik.errors.courseTimingId ? 'is-invalid' : ''}
                />
              </Form.Group>
              <Form.Control.Feedback type="invalid">{formik.errors.courseTimingId}</Form.Control.Feedback>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-2 position-relative" controlId="orderedQuantity">
                <Form.Label className="fw-bold">Quantity:</Form.Label>
                <Form.Control
                  type="number"
                  name="orderedQuantity"
                  min={0}
                  max={itemDetails.quantity}
                  placeholder="Enter Quantity"
                  value={formik.values.orderedQuantity}
                  onChange={formik.handleChange}
                  className={formik.touched.orderedQuantity && formik.errors.orderedQuantity ? 'is-invalid' : ''}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.orderedQuantity}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {cartInfo.length < 1 ? (
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="courseDate">
                  <Form.Label>Course Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="courseDate"
                    min={formatDate(formik.values.courseDate)}
                    placeholder="To Date"
                    value={formik.values.courseDate}
                    onChange={formik.handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          ) : null}
        </Modal.Body>
        <Modal.Footer className="pt-1 pb-1">
          <Button variant="primary" size="sm" type="submit">
            Add to Cart
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CartModal;
