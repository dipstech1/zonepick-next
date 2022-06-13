import { useEffect, useState } from 'react';

const OrderStatus = ({orderValue=2,orderStausChanged}) => {

    const [orderStatusValue, setOrderStatusValue] = useState(2);


    useEffect(() => {        
        setOrderStatusValue(orderValue)
      }, [orderValue]);

    const onchangeRadio = (e)=> {
        setOrderStatusValue(parseInt(e.target.value))
        orderStausChanged({value: e.target.value})
    }



    return (
        <div className="card border-0 py-3 border-bottom">
            <h5 className="mb-3 text-bold pb-2">Order Status</h5>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio1" name='orderRadio' value="2" onChange={onchangeRadio} checked={orderStatusValue===2} />
                <label className="form-check-label mb-0" htmlFor="orderRadio1">
                    2 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio2" name='orderRadio' value="4" onChange={onchangeRadio} checked={orderStatusValue===4}/>
                <label className="form-check-label mb-0" htmlFor="orderRadio2">
                    2-4 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio3" name='orderRadio' value="8" onChange={onchangeRadio} checked={orderStatusValue===8}/>
                <label className="form-check-label mb-0" htmlFor="orderRadio3">
                    4-8 Months
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" id="orderRadio4" name='orderRadio' value="12" onChange={onchangeRadio} checked={orderStatusValue===12}/>
                <label className="form-check-label mb-0" htmlFor="orderRadio4">
                    1 Year
                </label>
            </div>
        </div>
    )
}

export default OrderStatus