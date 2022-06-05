/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import ModalBody from '../../ui-lib/Modal/modalBody';
import ModalFooter from '../../ui-lib/Modal/modalFooter';
import ModalHeader from '../../ui-lib/Modal/modalHeader';
import {PanoViewer} from '@egjs/view360'

const ThreeSixtyView = (props) => {
  const [containerRef, setContainerRef] = useState();

  useEffect(() => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set360Image = (imgUrl) => {
   
    const panoViewer = new PanoViewer(containerRef, {
      image: imgUrl,
      projectionType: 'equirectangular'
    });
   

  };

  return (
    <>
      <ModalHeader>
        <h5 className="modal-title">360&#176; View</h5>
        <button type="button" className="btn-close" onClick={props.close}></button>
      </ModalHeader>
      <ModalBody>
        <div className="w-100 h-100">
          <div ref={(ref) => setContainerRef(ref)} style={{ position: 'relative', height: '400px' }} />
        </div>
        <div className="row pt-1">
          {props.imageInfo?.imgSrc?.length > 0 &&
            props.imageInfo?.imgSrc?.map((itm, i) => {
              return (
                <div className="col-1" key={i}>
                  <img className='img-fluid'
                    onClick={() => set360Image(itm.url)}
                    src={itm.url}  alt="" style={{height: '40px'}}                    
                  />
                </div>
              );
            })}
        </div>       
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default ThreeSixtyView;
