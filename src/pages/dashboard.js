import React, { Component } from "react";
import Transaction from "../components/transactions";
import Summary from "../components/summary";
import { Button } from "react-bootstrap";
// import {Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useAsyncError } from "react-router-dom";


class DashBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            userData: [],
            mpesaCode: "",
            customerName: "",
            customerPhone: "",
            transactionDateTime: "",
            amountReceived: "",
            selectedBusinessId: "",
            selectedBusiness: "",
            activeBusiness: false,
            currentBusiness: [],

            userId: this.props.userId,
            businesId: this.props.businesId

        }
        this.handleSelectedBusiness = this.handleSelectedBusiness.bind(this);
        this.selectedBusiness = this.selectedBusiness.bind(this)
    }
    handleModalShow = () => {
        this.setState({ showModal: true })
    }

    handleModalClose = () => {
        this.setState({ showModal: false })
    }
    selectedBusiness = (eventKey) => {
        this.setState({ selectedBusinessId: eventKey })

    }



    handleSelectedBusiness = async () => {

        axios.get(`http://localhost:3001/dashboard/business/${this.state.selectedBusinessId}`).then(response => {
            this.setState({ businessName: "", currentBusiness: response.data.selectedBusiness[0] })
            console.log(this.state.selectedBusinessId)
        })
        // axios.get(`http://localhost:3001`)
    }

    componentDidMount() {
        if (this.state.selectedBusinessId) {
            this.handleSelectedBusiness()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedBusinessId !== this.state.selectedBusinessId) {
            if (this.state.selectedBusinessId) {
                this.handleSelectedBusiness();
            }
        }
    }

    componentDidMount() {

        const sql = "SELECT * FROM userbusiness WHERE userProfileId = ?";
        const params = [this.state.userId]


        axios.post('http://localhost:3001/dashboard', { sql, params }).then(response => {

            const res = response.data
            this.setState({ userData: response.data.userData, businessName: res.userData[0].businessName, currentBusiness: res.userData[0] })

        })
            .catch(error => {
                console.error(error)
            })

    }


    handleInputChange = (e) => {
        const { target } = e;
        const { name, value } = target
        this.setState({
            [name]: value,
        });
    }
    // selectedBusiness = () => {
    //     const businessId = this.state.selectedBusinessId
    //     axios.get(`http://localhost:3001/dashboard/business${businessId}`).then(response =>{
    //         this.selectedBusiness(response.data[0])
    //     })
    // }
    addTransaction = () => {
        const payload = {
            businessId: this.state.currentBusiness.iduserBusiness,
            mpesaCode: this.state.mpesaCode,
            customerName: this.state.customerName,
            customerPhone: this.state.customerPhone,
            transactionDateTime: this.state.transactionDateTime,
            amountReceived: this.state.amountReceived
        }
        axios.post('http://localhost:3001/dashboard/addTransaction', payload).then((response) => {
            console.log("The transaction has been added successfully")
        }).catch((err) => {
            console.log(err.message)
        })
    }


    render() {
        console.log(this.state.selectedBusinessId)
        console.log(this.state.currentBusiness)
        console.log(this.state.currentBusiness.iduserBusiness)
        return (
            <div>

                < div style={{ backgroundColor: '#F8F8FF' }}>
                    <div style={{ backgroundColor: "#006064", height: 200, position: "relative", borderRadius: "0 0 60px 60px" }}>
                        <Navigation userData={this.state.userData} handleSelectedBusiness={this.handleSelectedBusiness} selectedBusiness={this.selectedBusiness} selectedBusinessId={this.state.selectedBusinessId} activeBusiness={this.state.activeBusiness} businessName={this.state.businessName} currentBusiness={this.state.currentBusiness} />

                        <Summary />

                    </div>
                    {/* <div>{userData.userFirstName}</div> */}
                    <div style={{ position: 'relative', top: 70, backgroundColor: '#F8F8FF', padding: '10px 20px 10px 20px' }}>
                        <div style={{ width: "100%", display: "flex", justifyContent: "end" }}><Button className="addTransactionBtn" style={{ fontWeight: "bold", backgroundColor: "#006064", marginRight: 30, padding: "2px 10px 2px 10px" }} onClick={this.handleModalShow}><span style={{ paddingRight: 10, fontSize: 20 }}>+</span>Add</Button></div>
                        <Transaction />
                    </div>
                    <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{ fontWeight: "bold" }}>ADD TRANSACTION</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><img src="/calculator.png" /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Mpesa Code"
                                    aria-label="mpesa-code"
                                    aria-describedby="mpesa-code"
                                    name="mpesaCode"
                                    value={this.state.mpesaCode}
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><img src="/user.png" /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Customer Name"
                                    aria-label="customer-name"
                                    aria-describedby="customer-name"
                                    name="customerName"
                                    value={this.state.customerName}
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><img src="/phone-call.png" /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Phone Number"
                                    aria-label="phone-no"
                                    aria-describedby="phone-no"
                                    name="customerPhone"
                                    value={this.state.customerPhone}
                                    onChange={this.handleInputChange}
                                />
                            </InputGroup>
                            <Form.Group className="mb-3">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text ><img src="/calendar.png" /></InputGroup.Text>
                                    <Form.Control
                                        type="datetime-local"
                                        placeholder="Transaction Date Time"
                                        aria-label="transactionDateTime"
                                        aria-describedby="transactionDateTime"
                                        name="transactionDateTime"
                                        value={this.state.transactionDateTime}
                                        onChange={this.handleInputChange}

                                    />
                                </InputGroup>
                            </Form.Group>
                            <InputGroup className="mb-3">
                                <InputGroup.Text ><img src="/arrow.png" /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Amount"
                                    aria-label="amountReceived"
                                    aria-describedby="amountReceived"
                                    name="amountReceived"
                                    value={this.state.amountReceived}
                                    onChange={this.handleInputChange}

                                />
                            </InputGroup>

                            <hr />
                            <Button style={{ float: "right", backgroundColor: "#006064" }} onClick={this.addTransaction}>Submit</Button>
                        </Modal.Body>


                    </Modal>


                </div>
            </div>

        )
    }
}

const Navigation = (props) => {



    return (
        <>

            <Navbar expand='lg' className="mb-3" style={{ padding: '15px 35px 0 15px' }}>
                <Container fluid style={{ color: '#ffffff' }}>
                    <Navbar.Brand href="#" style={{ color: "#ffffff", fontWeight: 'bolder', fontSize: 20, paddingRight: 20 }}>MONGOOSE</Navbar.Brand>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand' style={{ backgroundColor: '#ffffff', fontSize: 15 }} />
                    <Navbar.Offcanvas
                        placement="end"
                    >
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#006064', color: '#ffffff' }}>
                            <Offcanvas.Title>Panel</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#006064' }}>
                            <Nav className="justify-content-start flex-grow-1 pe-3 ">
                                <Nav.Link href="#action1">DashBoard</Nav.Link>
                                <Nav.Link href="#action1">Reports</Nav.Link>
                                <Nav.Link href="#action2">Settings</Nav.Link>

                            </Nav>


                            <Navbar.Collapse className="justify-content-end" style={{ width: 200 }} >


                                <Dropdown onSelect={props.selectedBusiness} >
                                    <DropdownButton variant="success" id="dropdown-item-button" title={props.currentBusiness.businessName}>
                                        {props.userData.length > 1 ? props.userData.map((businessList) =>


                                             
                                            <Dropdown.Item key={businessList.iduserBusiness} id={businessList.userId} eventKey={businessList.iduserBusiness} as="button">{businessList.businessName}</Dropdown.Item>



                                        ) :
                                            <Button variant="success">{props.currentBusiness.businessName}</Button>
                                        }
                                    </DropdownButton>
                                </Dropdown>







                            </Navbar.Collapse>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </>
    )
}

export default DashBoard;