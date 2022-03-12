import Image from "next/image"

const Card = () => {
    return (
        <>
            <div class="card" style={{width:"18rem"}}>
                <Image src={'https://thumbs.dreamstime.com/b/dslr-camera-13618571.jpg'} height="200px" width="200px"/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </>
    )
}

export default Card