import Card from "ui-lib/Card"

const productCard = ({ productDetails }) => {
    return (
        <>
            <div class="container-fluid">
                <div class="row justify-content-center">
                    {
                        productDetails.map((data, i) => {
                            return (
                                <div class="col-md-3 col-sm-12 product-card mt-4 mb-4" >
                                    <Card />
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default productCard