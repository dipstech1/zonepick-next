import { useEffect } from 'react';
import ModelViewGTLF from '../../components/modelViewGLTF'
import ModalBody from '../../ui-lib/Modal/modalBody';
import ModalFooter from '../../ui-lib/Modal/modalFooter';
import ModalHeader from '../../ui-lib/Modal/modalHeader';


const ThreeDView = (props) => {
  useEffect(() => {
    console.log(props?.imageInfo?.imgurl)
  }, []);
  return (
    <>
      <ModalHeader>
        <h5 className="modal-title">3d View</h5> 
        <button type="button" className="btn-close" onClick={props.close}></button>
      </ModalHeader>
      <ModalBody>       
        <ModelViewGTLF scale={[1.1,1.1,1.1]} source={props?.imageInfo?.imgurl}/>
      </ModalBody>
      <ModalFooter>
      </ModalFooter>
    </>
  );
};

export default ThreeDView;
