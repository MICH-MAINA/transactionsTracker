import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import { Component, useEffect } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DashBoard from "./dashboard";
// import CreateBusiness from "./createBusiness";



class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userFname: '',
            userLname: '',
            userPhoneNo: '',
            userDateOfBirth: "",
            userEmail: '',
            userPassword: '',
            userFname_error: '',
            userLname_error: '',
            userPhoneNo_error: '',
            userEmail_error: '',
            userPassword_error: '',
            userConfirmPassword: '',
            userConfirmPassword_error: '',
            userDateOfBirth_error: '',
            isButtonLoading: false,
            formError: false,
            shouldRender: false,
            shouldRedirect: false,
            disableProfileTab: false,
            disableBusinessTab: true,
            activeKey: 'profile',
            signUpSucess: true,

            businessName: '',
            businessEmail: "",
            businessPhoneNo: "",
            businessDescription: "",
            businessTill: "",
            notSubmitted: false,
            isBusinessButtonLoading: false,

            businessId: ""

        }
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    handleSuccess = () => {
        useEffect(() => {
            const timer = setTimeout(() => {
                this.setState({ signUpSucess: false })
            }, 1000)
            return () => clearTimeout(timer)
        }, [])
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { userEmail, userPassword, userConfirmPassword, userFname, userLname, userPhoneNo, userDateOfBirth } = this.state
        this.setState({ isButtonLoading: true })


        let userDateOfBirth_error = ""
        let userFname_error = "";
        let userLname_error = "";
        let userPhoneNo_error = "";
        let userEmail_error = "";
        let userPassword_error = "";
        let userConfirmPassword_error = "";

        if (userFname === "") {
            userFname_error = "Please enter your first name"
        }
        if (userLname === "") {
            userLname_error = "Please enter your last name"
        }

        if (userPhoneNo === "") {
            userPhoneNo_error = "Please enter your phone number"
        } else if (userPhoneNo.length < 9) {
            userPhoneNo_error = "Enter a valid phone no"
        }
        if (userDateOfBirth === "") {
            userDateOfBirth_error = "Enter your date of birth"
        }
        if (userEmail === "") {
            userEmail_error = "Please enter your email"
        } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
            userEmail_error = "Please enter a valid email"
        }

        if (userPassword === "") {
            userPassword_error = "Please enter a password";
        } else if (userPassword.length < 4) {
            userPassword_error = "Your password must be 8 characters long";
        }
        if (userConfirmPassword === "") {
            userConfirmPassword_error = "Please confirm your password";
        } else if (userPassword !== userConfirmPassword) {
            userConfirmPassword_error = "Your passwords do not match"
        }


        if (userEmail_error || userPassword_error || userConfirmPassword_error || userFname_error || userLname_error || userPhoneNo_error || userDateOfBirth_error) {
            this.setState({
                userEmail_error,
                userPassword_error,
                userConfirmPassword_error,
                userFname_error,
                userLname_error,
                userPhoneNo_error,
                userDateOfBirth_error,
                isButtonLoading: false,

            });
        } else {
            const payload = {
                userEmail: this.state.userEmail,
                userPassword: this.state.userPassword,
                userFname: this.state.userFname,
                userLname: this.state.userLname,
                userPhoneNo: this.state.userPhoneNo,
                userDateOfBirth: this.state.userDateOfBirth
            }
            const url = 'http://localhost:3001/signup'


            axios.post(url, payload).then((response) => {

                console.log('You have sucessfully logged in', response)
                const res = response.data
                this.setState({ activeKey: "business", disableBusinessTab: false, disableProfileTab: true, userId: res.userId, formError: false, userEmail_error: "", userPassword_error: "", userConfirmPassword_error: "", userFname_error: "", userLname_error: "", userPhoneNo_error: "", userDateOfBirth_error: "", isButtonLoading: false , userId: res.userId})
                // window.location.href ="/createbusiness"
                console.log(res.userId)

                // console.log(this.state.activeKey)

            }).catch((err) => {
                console.log(err.message)
                this.setState({ isButtonLoading: false, formError: true })
            })
        }

    }

    handleCreateBusiness = (e) => {
        e.preventDefault();

        const { businessEmail, businessName, businessPhoneNo, businessTill } = this.state
        this.setState({ isBusinessButtonLoading: true })

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
                isBusinessButtonLoading: false,

            });
        } else {
            const payload = {
                businessName: this.state.businessName,
                businessEmail: this.state.businessEmail,
                businessPhoneNo: this.state.businessPhoneNo,
                businessTill: this.state.businessTill,
                businessDescription: this.state.businessDescription,
                userId: this.state.userId,

            }
            const url = 'http://localhost:3001/createbusiness'
            axios.post(url, payload).then((response) => {

                console.log('You have sucessfully logged in', response)
                const res = response.data
                this.setState({ businessName_error: "", businessEmail_error: "", businessPhoneNo_error: "", businessTill_error: "", isButtonLoading: false, userId: this.state.userId, businessId: res.businessId })
                // window.location.href = `/dashboard/${this.props.userId}`

              
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

        return (
            <div style={{ backgroundColor: '#e0e0e0' }}>
                <div style={{ backgroundColor: "#006064", height: 200, position: "relative", borderRadius: "0 0 60px 60px" }}>
                    {this.state.userId && this.state.businessId ? <DashBoard userId={this.state.userId} businessId={this.state.businessId} /> :
                        <div style={{ position: 'absolute', display: "flex", alignItems: 'center', justifyContent: 'center', top: 60, width: '100%' }}>
                            <div style={{ margin: 20, backgroundColor: "#ffffff", borderRadius: "10px 10px 10px 10px" }}>
                                <Tabs
                                    activeKey={this.state.activeKey}
                                    id="justify-tab-example"
                                    className="mb-3"
                                    justify

                                >
                                    <Tab eventKey="profile" title="Profile" disabled={this.state.disableProfileTab}>
                                        <Profile userFname={this.state.userFname} userLname={this.state.userLname} userEmail={this.state.userEmail} userPassword={this.state.userPassword} userConfirmPassword={this.state.userConfirmPassword}
                                            userDateOfBirth={this.state.userDateOfBirth} userFname_error={this.state.userFname_error} userLname_error={this.state.userLname_error} userEmail_error={this.state.userEmail_error} userPassword_error={this.state.userPassword_error}
                                            userConfirmPassword_error={this.state.userConfirmPassword_error} userDateOfBirth_error={this.state.userDateOfBirth_error} userPhoneNo={this.state.userPhoneNo} userPhoneNo_error={this.state.userPhoneNo_error} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit} formError={this.state.formError} isButtonLoading={this.state.isButtonLoading} />
                                    </Tab>
                                    <Tab eventKey="business" title="Business" disabled={this.state.disableBusinessTab}>
                                        <CreateBusiness userId={this.state.userId} businessName={this.state.businessName} businessEmail={this.state.businessEmail} businessDescription={this.state.businessDescription} businessTill={this.state.businessTill}
                                            notSubmitted={this.state.notSubmitted} businessId={this.state.businessId} handleInputChange={this.handleInputChange} handleCreateBusiness={this.handleCreateBusiness}
                                        />
                                    </Tab>

                                </Tabs>
                            </div>

                        </div>
                    }
                </div>
            </div>
        )
    }
}


const Profile = (props) => {

    return (
        <Form style={{ backgroundColor: "#ffffff", padding: 20 }}>
            {/* <div style={{ display: 'flex', position: "absolute", justifyContent: "center", width: '90%', alignItems: 'center', top: -40 }}>
                                        <img style={{ width: 70, backgroundColor: '#ffffff', height: 70, border: "2px solid #0097a7", borderRadius: 35 }} src="add-friend.png" />
                                    </div> */}
            {props.formError ?
                <Alert variant="danger" style={{ marginBottom: 10, marginBottom: 0 }}>
                    An Error has occurred please try again

                </Alert>

                :
                // <CreateBusiness />


                ""

            }
            <Form.Group >
                <div className="row"  >
                    <div className="col-sm" style={{ paddingBottom: 20 }}><Form.Control type="text" placeholder="First Name" name="userFname" value={props.userFname} onChange={props.handleInputChange} /></div>
                    {props.userFname_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userFname_error}</span>}
                    <div className="col-sm" style={{ paddingBottom: 20 }}><Form.Control type="text" placeholder="Last Name" name="userLname" value={props.userLname} onChange={props.handleInputChange} /></div>
                    {props.userLname_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userLname_error}</span>}
                </div>
            </Form.Group>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
                <Form.Control
                    placeholder="Phone Number"
                    aria-label="Phone number"
                    aria-describedby="basic-addon1"
                    name="userPhoneNo"
                    value={props.userPhoneNo}
                    onChange={props.handleInputChange}
                />


            </InputGroup>
            {props.userPhoneNo_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userPhoneNo_error}</span>}
            <Form.Group className="mb-3">

                <Form.Control
                    type="date"
                    placeholder="Phone Number"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="userDateOfBirth"
                    value={props.userDateOfBirth}
                    onChange={props.handleInputChange}
                />
                {props.userDateOfBirth_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userDateOfBirth_error}</span>}
            </Form.Group>

            <Form.Group style={{ marginTop: 20 }} className="mb-3" >

                <Form.Control type="email" id="userEmail" name="userEmail" value={props.userEmail} placeholder="Enter email" onChange={props.handleInputChange} />
                {props.userEmail_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userEmail_error}</span>}
                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}

            </Form.Group>

            <Form.Group className="mb-3" >

                <Form.Control type="password" id="userPassword" name="userPassword" value={props.userPassword} placeholder="Password" onChange={props.handleInputChange} />
                {props.userPassword_error && <span style={{ color: "#f44336", fontWeight: "bolder", fontSize: 12 }}>{props.userPassword_error}</span>}
            </Form.Group>
            <Form.Group className="mb-3" >

                <Form.Control type="password" id="userConfirmPassword" name="userConfirmPassword" value={props.userConfirmPassword} onChange={props.handleInputChange} placeholder="Confirm Password" />
                {props.userConfirmPassword_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.userConfirmPassword_error}</span>}
            </Form.Group>

            <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10, marginBottom: 10 }} onClick={props.handleSubmit} type="submit">
                {props.isButtonLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Account"}

            </Button>

            <br />

            <p >Already have an account? <a href="login" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></p>
        </Form>
    )
}

const CreateBusiness = (props) => {
    // const { businessName, businessEmail, businessPhoneNo, businessTill, businessDescription, businessEmail_error, businessName_error, businessPhoneNo_error, businessTill_error } = this.state;

    // console.log(this.props.userId)
    return (

        <div>

            <Form style={{ backgroundColor: '#ffffff', padding: 20 }}>

                {props.notSubmitted ?
                    <Alert variant="danger" style={{ marginTop: 10, marginBottom: 0 }}>
                        An Error has occurred please try again

                    </Alert> :
                    ""

                }
                <Form.Group >
                    <div className="row" style={{ marginBottom: 20, marginTop: 20 }} >
                        <div className="col-sm"><Form.Control type="text" placeholder="Business Name" name="businessName" value={props.businessName} onChange={props.handleInputChange} /></div>
                        {props.businessName_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.businessName_error}</span>}

                    </div>
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
                    <Form.Control
                        placeholder="Phone Number"
                        aria-label="Phone number"
                        aria-describedby="basic-addon1"
                        name="businessPhoneNo"
                        value={props.businessPhoneNo}
                        onChange={props.handleInputChange}
                    />
                    {props.businessPhoneNo_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.businessPhoneNo_error}</span>}
                </InputGroup>


                <Form.Group style={{ marginTop: 20 }} className="mb-3" >

                    <Form.Control type="email" id="businessEmail" name="businessEmail" value={props.businessEmail} placeholder="Enter email" onChange={props.handleInputChange} />
                    {props.businessEmail_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{props.businessEmail_error}</span>}
                    {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}

                </Form.Group>

                <Form.Group className="mb-3" >

                    <Form.Control type="text" id="businessTill" name="businessTill" value={props.businessTill} placeholder="Business Till Number" onChange={props.handleInputChange} />
                    {props.businessTill_error && <span style={{ color: "#f44336", fontWeight: "bolder", fontSize: 12 }}>{props.businessTill_error}</span>}
                </Form.Group>
                <InputGroup>

                    <Form.Control as="textarea" aria-label="With textarea" id="businessDecription" name="businessDescription" value={props.businessDescription} onChange={props.handleInputChange} placeholder="Description" />
                </InputGroup>


                <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10, marginBottom: 10 }} onClick={props.handleCreateBusiness} type="submit">
                    {props.isBusinessButtonLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Business Account"}

                </Button>

                <br />

                <p >Already have an account? <a href="login" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></p>
            </Form>

        </div>




    )
}
export default Registration