import { useState, useEffect } from 'react';
import ModalService from './modalService';

const ModalRoot = () => {
  const [show, setShow] = useState(false);

  const [modal, setModal] = useState({});

  useEffect(() => {
    ModalService.on('open', ({ component, props }) => {
      setModal({
        component,
        props,
        close: (value) => {
          setModal({});
          setShow(false)
        }
      });  
      setShow(true)
    });
  }, []);

  const handleCloseModal = (e) => {
    e.preventDefault();
    //  onClose();
  };

  const ModalComponent = modal.component ? modal.component : null;

  return (
    <div className={['modal fade', show === true ? 'show show_modal' : null]}  id="myModal" tabIndex="-1"    aria-labelledby="exampleModalLabel"      aria-hidden="true"    >
      <div className="modal-dialog">
        <div className="modal-content">
          {ModalComponent && (
            <ModalComponent {...modal.props} close={modal.close} className={ModalComponent ? 'd-block' : ''} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalRoot;
