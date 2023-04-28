import axios from "axios";
import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import DashBoard from "./dashboard";




class CreateBusiness extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessName: '',
            businessEmail: "",
            businessPhoneNo: "",
            businessDescription: "",
            businessTill: "",
            notSubmitted: false,
            isButtonLoading: false,
            userId: '',
            businessId: ""

        }
        this.handleInputChange = this.handleInputChange.bind(this);


    }



    handleSubmit = (e) => {
        e.preventDefault();

        const { businessEmail, businessName, businessPhoneNo, businessTill, businessDescription, userId } = this.state
        this.setState({ isButtonLoading: true })

        let businessEmail_error = "";
        let businessName_error = "";
        let businessPhoneNo_error = "";
        let businessTill_error = "";

        if (businessName === "") {
            businessName_error = "Please enter the name of the business"
        }

        if (businessPhoneNo === "") {
            businessPhoneNo_error = "Please enter your phone number"
        } else if (businessPhoneNo.length < 9) {
            businessPhoneNo_error = "Enter a valid phone no"
        }

        if (businessEmail === "") {
            businessEmail_error = "Please enter your email"
        } else if (!/\S+@\S+\.\S+/.test(businessEmail)) {
            businessEmail_error = "Please enter a valid email"
        }

        if (businessTill === "") {
            businessTill_error = "Please enter a password";
        }


        if (businessEmail_error || businessName_error || businessPhoneNo_error || businessTill_error) {
            this.setState({
                businessName_error,
                businessEmail_error,
                businessPhoneNo_error,
                businessTill_error,
                isButtonLoading: false,

            });
        } else {
            const payload = {
                businessName: this.state.businessName,
                businessEmail: this.state.businessEmail,
                businessPhoneNo: this.state.businessPhoneNo,
                businessTill: this.state.businessTill,
                businessDescription: this.state.businessDescription,
                userId: this.props.userId,

            }
            const url = 'http://localhost:3001/createbusiness'
            axios.post(url, payload).then((response) => {

                console.log('You have sucessfully logged in', response)
                const res = response.data
                this.setState({ businessName_error: "", businessEmail_error: "", businessPhoneNo_error: "", businessTill_error: "", isButtonLoading: false, userId: this.props.userId, businessId: res.businessId })
                // window.location.href = `/dashboard/${this.props.userId}`

                console.log(this.props.userId)
                console.log(res.businessId)

            }).catch((err) => {
                console.log(err)
                this.setState({ notSubmitted: true, isButtonLoading: false })
            })
        }

    }
    handleInputChange = (event) => {
        const { target } = event;
        const { name, value } = target
        this.setState({
            [name]: value,
        });
    };


    render() {

        const { businessName, businessEmail, businessPhoneNo, businessTill, businessDescription, businessEmail_error, businessName_error, businessPhoneNo_error, businessTill_error } = this.state;

        // console.log(this.props.userId)
        return (

            <div>
                {this.state.userId && this.state.businessId ? <DashBoard userId={this.state.userId} businessId={this.state.businessId} /> :
                    <Form style={{ backgroundColor: '#ffffff', padding: 20 }}>

                        {this.state.notSubmitted ?
                            <Alert variant="danger" style={{ marginTop: 10, marginBottom: 0 }}>
                                An Error has occurred please try again

                            </Alert> :
                            ""

                        }
                        <Form.Group >
                            <div className="row" style={{ marginBottom: 20, marginTop: 20 }} >
                                <div className="col-sm"><Form.Control type="text" placeholder="Business Name" name="businessName" value={businessName} onChange={this.handleInputChange} /></div>
                                {businessName_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessName_error}</span>}

                            </div>
                        </Form.Group>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
                            <Form.Control
                                placeholder="Phone Number"
                                aria-label="Phone number"
                                aria-describedby="basic-addon1"
                                name="businessPhoneNo"
                                value={businessPhoneNo}
                                onChange={this.handleInputChange}
                            />
                            {businessPhoneNo_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessPhoneNo_error}</span>}
                        </InputGroup>


                        <Form.Group style={{ marginTop: 20 }} className="mb-3" >

                            <Form.Control type="email" id="businessEmail" name="businessEmail" value={businessEmail} placeholder="Enter email" onChange={this.handleInputChange} />
                            {businessEmail_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessEmail_error}</span>}
                            {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}

                        </Form.Group>

                        <Form.Group className="mb-3" >

                            <Form.Control type="text" id="businessTill" name="businessTill" value={businessTill} placeholder="Business Till Number" onChange={this.handleInputChange} />
                            {businessTill_error && <span style={{ color: "#f44336", fontWeight: "bolder", fontSize: 12 }}>{businessTill_error}</span>}
                        </Form.Group>
                        <InputGroup>

                            <Form.Control as="textarea" aria-label="With textarea" id="businessDecription" name="businessDescription" value={businessDescription} onChange={this.handleInputChange} placeholder="Description" />
                        </InputGroup>


                        <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10, marginBottom: 10 }} onClick={this.handleSubmit} type="submit">
                            {this.state.isButtonLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Business Account"}

                        </Button>

                        <br />

                        <p >Already have an account? <a href="login" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></p>
                    </Form>
                }
            </div>




        )


    }
}





export default CreateBusiness;