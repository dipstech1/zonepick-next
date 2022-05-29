import { useEffect } from "react"

const OrderDetails = (props) => {
    // console.log("details ", props)

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span>Name : </span>
                    <span>{props?.details?.product?.name}</span>
                </li>
                <li class="list-group-item">Dapibus ac facilisis in</li>
                <li class="list-group-item">Morbi leo risus</li>
                <li class="list-group-item">Porta ac consectetur ac</li>
                <li class="list-group-item">Vestibulum at eros</li>
            </ul>
        </div>
    )
}

export default OrderDetails