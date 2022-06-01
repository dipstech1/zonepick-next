import { useEffect, useState } from "react"
import StarRatings from 'react-star-ratings';

const OrderDetails = (props) => {
    // console.log("details ", props)

    const [ratingData, setRatingData] = useState({
        productrating:0,
        sellerrating:0
    })

    useEffect(() => {
        console.log(props)
    }, []);

    const changeRating = (rating,type) => {
        console.log(rating)
        ratingData[type] = rating;
        setRatingData({...ratingData})
    }

    return (
        <div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <span>Name : </span>
                    <span>{props?.details?.product?.name}</span>
                </li>
                <li class="list-group-item">
                    <span>Seller Name : </span>
                    <span>{props?.details?.seller_details?.name}</span>
                </li>
                <li class="list-group-item">
                    <span>Seller Contact : </span>
                    <span>{props?.details?.seller_details?.phone}</span>
                </li>
                <li class="list-group-item">
                    <span>Product Rating : </span>
                    <span>
                        <StarRatings
                            starRatedColor="#e74c3c"
                            changeRating={(e) => changeRating(e,'productrating')}
                            numberOfStars={5}
                            name='productrating'
                            rating={ratingData?.productrating}
                        />
                    </span>
                </li>
                <li class="list-group-item">
                    <span>Seller Rating : </span>
                    <span>
                        <StarRatings
                            starRatedColor="#e74c3c"
                            changeRating={(e) => changeRating(e,'sellerrating')}
                            numberOfStars={5}
                            name='sellerrating'
                            rating={ratingData?.sellerrating}

                        />
                    </span>
                </li>
                <li>

                </li>
            </ul>
        </div>
    )
}

export default OrderDetails