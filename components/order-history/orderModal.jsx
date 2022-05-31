import { useEffect } from 'react';

import ModalBody from '../../ui-lib/Modal/modalBody';
import ModalFooter from '../../ui-lib/Modal/modalFooter';
import ModalHeader from '../../ui-lib/Modal/modalHeader';
import OrderDetails from './orderDetails';

const OrderModal = (props) => {
  useEffect(() => {}, []);
  return (
    <>
      <ModalHeader>
        <h5 className="modal-title">Order Details</h5> 
        <button type="button" className="btn-close" onClick={props.close}></button>
      </ModalHeader>
      <ModalBody>
        <div>
          <OrderDetails details={props?.orderdetails} />
        </div>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </>
  );
};

export default OrderModal;
