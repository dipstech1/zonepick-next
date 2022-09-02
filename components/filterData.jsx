import { useState } from "react";
import { Col, Card, Row, Form, Button } from "react-bootstrap"
import { toast } from "react-toastify";
import axios from "../utils/axios.interceptor";


const FilterData = ({ filterData = {}, isAddFilterData = false, filterDataAddClick, filterDataEditClick, filterDataDelete, isAddFilterDataClick }) => {
    const { options } = filterData;
    const [filterDataName, setFilterDataName] = useState("");
    const [id, setId] = useState("");
    const [mode, setMode] = useState("Add");

    const onAddClick = () => {
        const data = {
            name: filterDataName,
            filter: filterData.id
        }
        filterDataAddClick(data);
        setFilterDataName("");
    };

    const onEditClick = ({ id, name }) => {
        setId(id);
        setFilterDataName(name);
        isAddFilterDataClick();
        setMode("Edit");
    };

    const onUpdateClick = () => {
        const data = {
            id: parseInt(id),
            name: filterDataName,
        }
        filterDataEditClick(data);
    }

    return (
        <>
            {
                isAddFilterData ?
                    <Row>
                        <Col>
                            <Form.Group className="mb-2 position-relative" controlId="categoryName">
                                <Form.Label className="fw-bold">Filter Data Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="filterName"
                                    placeholder="Enter Filter Data Name"
                                    value={filterDataName}
                                    onChange={(e) => setFilterDataName(e.target.value)}
                                // className={formiks.touched.filterName && formiks.errors.filterName ? "is-invalid" : ""}
                                />
                                {/* <Form.Control.Feedback type="invalid">{formiks.errors.filterName}</Form.Control.Feedback> */}
                            </Form.Group>
                            <Form.Group controlId="submitButton" className="text-center mt-5">
                                {
                                    mode === "Add" ?
                                        <>
                                            <Button variant="primary"
                                                size="sm"
                                                style={{ width: '120px' }}
                                                onClick={onAddClick}
                                            >
                                                Add
                                            </Button>
                                            <Button variant="danger" className="ms-2"
                                                size="sm"
                                                style={{ width: '120px' }}
                                                onClick={isAddFilterDataClick}
                                            >
                                                Cancel
                                            </Button>
                                        </> : <>
                                            <Button variant="primary"
                                                size="sm"
                                                style={{ width: '120px' }}
                                                onClick={onUpdateClick}
                                            >
                                                Update
                                            </Button>
                                            <Button variant="danger" className="ms-2"
                                                size="sm"
                                                style={{ width: '120px' }}
                                                onClick={isAddFilterDataClick}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                }
                            </Form.Group>
                        </Col>
                    </Row>
                    :
                    options.map((data, i) => (
                        <Row key={i} className="mb-2">
                            <Col>
                                <Card>
                                    <Card.Body style={{ padding: "8px 13px" }}>
                                        <div className="d-inline-block">
                                            {/* <h6>Filter Data Of: {filterData.filterName}</h6> */}
                                            {data?.name}
                                        </div>
                                        <div className="d-inline-block float-end">
                                            <i className="fa fa-edit me-2"
                                                onClick={(e) => onEditClick(data)}
                                                title="Edit Filter Data"
                                                style={{ cursor: 'pointer' }}>
                                            </i>
                                            <i className="fa fa-trash"
                                                onClick={() => filterDataDelete(data.id)}
                                                style={{ cursor: 'pointer' }}>
                                            </i>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    ))
            }
        </>
    )
};

export default FilterData;