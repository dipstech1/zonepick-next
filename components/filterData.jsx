import { Col, Card, Row } from "react-bootstrap"


const FilterData = ({ filterData = {} }) => {
    const { options } = filterData
    return (
        // <button onClick={() => console.log(options)}>click</button>
        options.map((data, i) => (
            <Row key={i} className="mb-2">
                <Col>
                    <Card onClick={() => console.log(filterData)}>
                        <Card.Body>
                            <div className="d-inline-block">
                                <h6>Filter Data Of: {filterData.filterName}</h6>
                                <span className="fw-bold">{data?.name}</span>
                            </div>
                            <div className="d-inline-block float-end">
                                <i className="fa fa-edit me-2"
                                    style={{ cursor: 'pointer' }}>
                                </i>
                                <i className="fa fa-trash"
                                    style={{ cursor: 'pointer' }}>
                                </i>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        ))

    )
};

export default FilterData;