import { Component, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

class Transaction extends Component {
    constructor(props) {
        super(props)
        this.state = {

            transactions: props.transactions,
            currentBusinessId: this.props.currentBusinessId,
            selectedTransactionId: '',
            transactionLoading: false,
            showModal: false,
            mpesaCode: "",
            customerName: "",
            customerPhone: "",
            transactionDateTime: Date,
            amountReceived: "",

        }
        this.handleDelete = this.handleDelete.bind(this);
    }
    // componentDidMount() {
    //     axios.get(`http://localhost:3001/dashboard/${this.props.currentBusinessId}/transactions`).then(response => {

    //             console.log(response.data.transactions)
    //             this.setState({ transactions: response.data.transactions})
    //         });


    // }

    componentDidUpdate(prevProps) {
        if (this.props.transactions !== prevProps.transactions) {
            this.setState({ transactions: this.props.transactions });
        }
    }
    handleModalShow = (e) => {
        this.setState({ showModal: true, selectedTransactionId: e.currentTarget.id })
    }

    handleModalClose = () => {
        this.setState({ showModal: false })
    }
    exportPdf = (e) => {
        const input =  document.getElementById('pdf-container');
        console.log(input)
        html2canvas(input)
            .then((canvas) => {
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
                pdf.save('download.pdf');
            });
    };
    handleDelete = (e) => {


        this.setState({ selectedTransactionId: e.currentTarget.id })
        console.log(e.currentTarget.id)
        axios.delete(`http://localhost:3001/dashboard/${this.props.currentBusinessId}/transaction/${e.currentTarget.id}`).then(response => {
            const res = response.data
            this.setState({ transactions: res.transactions })
            console.log(res.transactions)
            console.log('item deleted')
            console.log(res)

        }).catch(err => {
            console.error("error deleting item", err)
        })
    }


    handleUpdate = (e) => {
        e.preventDefault()
        this.setState({ selectedTransactionId: e.currentTarget.id })
        console.log(this.state.selectedTransactionId)
        const payload = {
            mpesaCode: this.state.mpesaCode,
            customerName: this.state.customerName,
            customerPhone: this.state.customerPhone,
            transactionDateTime: this.state.transactionDateTime,
            amountReceived: this.state.amountReceived
        }
        axios.put(`http://localhost:3001/dashboard/${this.props.currentBusinessId}/transaction/${this.state.selectedTransactionId}`, payload).then(response => {
            const res = response.data
            this.setState({ transactions: res.transactions, showModal: false })
        }).catch(err => {
            console.error("Error updating item", err)
        })
    }
    handleInputChange = (e) => {
        const { target } = e;
        const { name, value } = target
        this.setState({
            [name]: value,
        });
    }

    render() {

        // this.setState({transactions: this.props.transactions})
        const { transactions } = this.state
        console.log(this.state.transactions)
        return (
            <>
                <div style={{ width: "100%", marginBottom: 5, display: "flex", justifyContent: "end" }}>
                    <Button style={{ fontWeight: "bold", backgroundColor: "#006064", marginRight: 30 }} onClick={this.exportPdf}>Export</Button></div>
                <div id="pdf-container">
                    <Table striped responsive >
                        <thead style={{ fontSize: 15 }}>
                            <tr >
                        
                                <th>Code</th>
                                <th>Customer</th>
                                <th>Phone No</th>
                                <th> Date</th>
                                <th>Amount </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map((item) => (
                                <tr key={item.idAccountTransactions}>
                                   
                                    <td>{item.transactionCodeNo}</td>
                                    <td>{item.transactionCustomerName} </td>
                                    <td>{item.transactionPhoneNo}</td>
                                    <td>{item.transactionDateTime}</td>
                                    <td>{item.transactionAmount}</td>
                                    <td><button id={item.idAccountTransactions} onClick={this.handleModalShow} style={{ backgroundColor: "grey", borderRadius: 20, padding: 0 }}><img src="/pen.png" /> </button></td>
                                    <td><Button id={item.idAccountTransactions} onClick={this.handleDelete} style={{ backgroundColor: "grey", borderRadius: 20, padding: 0 }}><img src="/bin.png" /> </Button></td>

                                    {/* <td style={{display:'flex', justifyContent:"space-evenly"}}>
                                    <div style={{marginRight:8}}>
                                        <button id={item.idAccountTransactions } onClick={this.handleDelete} style={{backgroundColor: "grey", borderRadius:20, padding:0}}><img src="/pen.png"/> </button>
                                    </div>
                                    <div>
                                       <Button  id={item.idAccountTransactions} onClick={this.handleDelete} style={{backgroundColor: "grey", borderRadius:20, padding:0}}><img src="/bin.png"/> </Button>
                                    </div>
                                </td> */}
                                    {/* <td> <button className="more" style={{ border: "none", withdth: "50px", borderRadius: 10 }}><img src="/three-dots.png" /></button></td> */}
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </div>
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ fontWeight: "bold" }}>UPDATING TRANSACTION</Modal.Title>
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
                                type="text"
                                placeholder="Amount"
                                aria-label="amountReceived"
                                aria-describedby="amountReceived"
                                name="amountReceived"
                                value={this.state.amountReceived}
                                onChange={this.handleInputChange}

                            />
                        </InputGroup>

                        <hr />
                        <Button style={{ float: "right", backgroundColor: "#006064", width: 170 }} onClick={this.handleUpdate}>
                            {this.state.transactionLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Submit"}
                        </Button>
                    </Modal.Body>


                </Modal>

            </>
        )
    }
}


export default Transaction;