import { getCookie } from 'cookies-next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import wishlistService from '../../services/wishlist-service';

const WishListModal = ({ wishlistDetails = [], onClose, itemDetails = {} }) => {
  const [show, setShow] = useState(true);
  const [addWish, setAddWish] = useState(false);
  const [wishlistItem, setWishlistItem] = useState([]);

  const formik = useFormik({
    initialValues: {
      userid: '',
      wishlistName: '',
      wishlistDescription: '',
    },
    validationSchema: Yup.object({
      wishlistName: Yup.string().required('Required'),
      wishlistDescription: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // console.log(JSON.stringify(values, null, 2));
      onAddWishList(values);
    },
  });

  const [wishlistInfo, setWishlistInfo] = useState({
    userid: 0,
    itemRecordId: '',
    wishlistId: 0,
    fromDate: '',
    toDate: '',
  });

  useEffect(() => {
    const userId = getCookie('jr1hIxJJ2Ia5c');

    formik.setFieldValue('userid', userId);

    const info = {
      userid: userId,
      courseRecordId: itemDetails?.recordId,
      wishlistId: 0,
      fromDate: formatDate(new Date()),
      toDate: formatDate(new Date()),
    };

    setWishlistInfo(info);

    getWishlist(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose('selectedItem');
    setShow(false);
  };

  const onAddToWishList = async () => {
    let sendData = { ...wishlistInfo };

    sendData.fromDate = Math.round(new Date(wishlistInfo.fromDate).getTime());
    sendData.toDate = Math.round(new Date(wishlistInfo.toDate).getTime());
    try {
      let response = await wishlistService.addToWishListDetails(sendData);

      if (response.data.acknowledge) {
        toast.success('Item added to Wish List');
        setShow(false);
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const onChangeToDate = (value) => {
    setWishlistInfo({ ...wishlistInfo, toDate: value });
  };

  const onChangeFromDate = (value) => {
    setWishlistInfo({ ...wishlistInfo, fromDate: value });
  };

  const onRadioChanged = (data) => {
    setWishlistInfo({ ...wishlistInfo, wishlistId: data.id });
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

  const onAddWishList = async (item) => {
    const userId = getCookie('jr1hIxJJ2Ia5c');
    item.userid = userId;
    try {
      let resp = await wishlistService.addWishList(item);

      if (resp.data.acknowledge) {
        getWishlist(userId);
        setAddWish(false);
        formik.resetForm();
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  const getWishlist = async (userId) => {
    try {
      let resp = await wishlistService.getData(userId);

      if (resp.data) {
        setWishlistItem(resp.data); 
      } else {
        toast.error('Fail');
      }
    } catch (error) {
      console.log(error);
      toast.error('Fail');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton className='pt-2 pb-2'>
        <Modal.Title className='fs-5'>Your Wishlist(s)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!addWish ? (
          <>
            <Row>
              <Col className='mb-2'>
                <ul style={{ listStyle: 'none', paddingLeft: '1rem' }}>
                  {wishlistItem.length > 0
                    ? wishlistItem.map((item, i) => {
                        return (
                          <li key={i} className='mb-2'>
                            <Form.Check
                              type={'radio'}
                              label={item.wishlistName}
                              id={`default-${i}`}
                              name={'radio-1'}
                              onChange={() => {
                                onRadioChanged(item);
                              }}
                            />
                          </li>
                        );
                      })
                    : null}
                  <li>
                    <button className='btn btn-link' onClick={() => setAddWish(true)}>
                      Add New Wishlist
                    </button>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='from-date'>
                  <Form.Label>From Date</Form.Label>
                  <Form.Control
                    type='date'
                    min={formatDate(new Date())}
                    placeholder='From Date'
                    value={wishlistInfo.fromDate}
                    onChange={(e) => {
                      onChangeFromDate(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='to-date'>
                  <Form.Label>To Date</Form.Label>
                  <Form.Control
                    type='date'
                    min={formatDate(wishlistInfo.fromDate)}
                    placeholder='To Date'
                    value={wishlistInfo.toDate}
                    onChange={(e) => {
                      onChangeToDate(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row>
              <Col>
                <Form onSubmit={formik.handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group className='mb-2 position-relative' controlId='wishlistName'>
                        <Form.Label className='fw-bold'>Wishlist Name:</Form.Label>
                        <Form.Control
                          type='text'
                          name='wishlistName'
                          placeholder='Enter Wishlist Name'
                          value={formik.values.wishlistName}
                          onChange={formik.handleChange}
                          className={formik.touched.wishlistName && formik.errors.wishlistName ? 'is-invalid' : ''}
                          required
                        />
                        <Form.Control.Feedback type='invalid'>{formik.errors.wishlistName}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group className='mb-2 position-relative' controlId='wishlistDescription'>
                        <Form.Label className='fw-bold'>Description:</Form.Label>
                        <Form.Control
                          type='text'
                          as={'textarea'}
                          name='wishlistDescription'
                          placeholder='Enter Wishlist Description'
                          value={formik.values.wishlistDescription}
                          onChange={formik.handleChange}
                          className={formik.touched.wishlistDescription && formik.errors.wishlistDescription ? 'is-invalid' : ''}
                          required
                        />
                        <Form.Control.Feedback type='invalid'>{formik.errors.wishlistDescription}</Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className='pt-1 pb-1'>
        {!addWish ? (
          <>
            <Button
              variant='primary'
              size='sm'
              onClick={onAddToWishList}
              disabled={wishlistInfo.wishlistId === 0 || wishlistInfo.toDate === 0 || wishlistInfo.fromDate === 0}
            >
              Add to Wishlist
            </Button>
          </>
        ) : (
          <>
            <Button variant='danger' size='sm' onClick={() => setAddWish(false)}>
              Cancel
            </Button>
            <Button variant='primary' size='sm' onClick={formik.handleSubmit} disabled={!formik.isValid}>
              Add Wishlist
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default WishListModal;
