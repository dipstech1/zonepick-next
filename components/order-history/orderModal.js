import { useEffect } from "react"
import Modal from "ui-lib/Modal/Modal"
import ModalBody from "ui-lib/Modal/ModalBody"
import ModalFooter from "ui-lib/Modal/ModalFooter"
import ModalHeader from "ui-lib/Modal/ModalHeader"
import OrderDetails from "./orderDetails"

const OrderModal = (props) => {
    useEffect(()=>{
    },[])
    return (
        <>
            <Modal>
                <ModalHeader>
                    <h3>Test Modal #1</h3>
                </ModalHeader>
                <ModalBody>
                    <div>
                        <OrderDetails details={props?.orderdetails}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button onClick={props.close} className="btn btn-primary">Close Modal</button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default OrderModal