import { useEffect } from "react"

const OrderDetails = (props) => {
    // console.log("details ", props)

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span>Name : </span>
                    <span>{props?.details?.product?.name}</span>
                </li>
                <li className="list-group-item">Dapibus ac facilisis in</li>
                <li className="list-group-item">Morbi leo risus</li>
                <li className="list-group-item">Porta ac consectetur ac</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
        </div>
    )
}

export default OrderDetails