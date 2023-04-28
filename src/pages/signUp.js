import axios from "axios";
import { Component, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner';
import InputGroup from 'react-bootstrap/InputGroup';
import CreateBusiness from "./createBusiness";




class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFname: '',
            userLname: '',
            userPhoneNo: '',
            userDateOfBirth: "",
            userEmail: '',
            userPassword: '',
            userConfirmPassword: '',
            userFname_error: '',
            userLname_error: '',
            userPhoneNo_error: '',
            userEmail_error: '',
            userPassword_error: '',
            userConfirmPassword: '',
            isButtonLoading: false,
            formError: false,
            shouldRender: false,
            shouldRedirect: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    componentDidMount() {
        const { shouldRedirect } = this.state;
        if (shouldRedirect) {
            // window.location = "/profile"
        } else {
            this.setState({ shouldRender: true })
        }
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
                this.setState({ formError: false, userEmail_error: "", userPassword_error: "", userConfirmPassword_error: "", userFname_error: "", userLname_error: "", userPhoneNo_error: "", userDateOfBirth_error, isButtonLoading: false })
                // window.location.href ="/createbusiness"


            }).catch((err) => {
                console.log(err.message)
                this.setState({ isButtonLoading: false, formError: true })
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

        const { userFname, userLname, userPhoneNo, userDateOfBirth, userEmail, userPassword, userConfirmPassword, userEmail_error, userPassword_error, userConfirmPassword_error, userFname_error, userLname_error, userPhoneNo_error, userDateOfBirth_error, formError } = this.state;


        return (
            <div style={{ backgroundColor: '#e0e0e0' }}>
                <div style={{ backgroundColor: "#006064", height: 200, position: "relative", borderRadius: "0 0 60px 60px" }}>
                    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 60, width: '100%' }}>

                        <Form style={{ minWidth: 300, backgroundColor: '#ffffff', padding: 20, borderRadius: 5, position: "relative" }}>
                            <div style={{ display: 'flex', position: "absolute", justifyContent: "center", width: '90%', alignItems: 'center', top: -40 }}>
                                <img style={{ width: 70, backgroundColor: '#ffffff', height: 70, border: "2px solid #0097a7", borderRadius: 35 }} src="add-friend.png" />
                            </div>
                            {formError ?
                                <Alert variant="danger" style={{ marginTop: 10, marginBottom: 0 }}>
                                    An Error has occurred please try again

                                </Alert>

                                :
                                // <CreateBusiness />
                                
                               
                                ""

                            }
                            <Form.Group >
                                <div className="row" style={{ marginBottom: 20, marginTop: 20 }} >
                                    <div className="col-sm"><Form.Control type="text" placeholder="First Name" name="userFname" value={userFname} onChange={this.handleInputChange} /></div>
                                    {userFname_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userFname_error}</span>}
                                    <div className="col-sm"><Form.Control type="text" placeholder="Last Name" name="userLname" value={userLname} onChange={this.handleInputChange} /></div>
                                    {userLname_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userLname_error}</span>}
                                </div>
                            </Form.Group>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
                                <Form.Control
                                    placeholder="Phone Number"
                                    aria-label="Phone number"
                                    aria-describedby="basic-addon1"
                                    name="userPhoneNo"
                                    value={userPhoneNo}
                                    onChange={this.handleInputChange}
                                />
                                <div>{userPhoneNo_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userPhoneNo_error}</span>}</div>

                            </InputGroup>
                            <Form.Group className="mb-3">

                                <Form.Control
                                    type="date"
                                    placeholder="Phone Number"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    name="userDateOfBirth"
                                    value={userDateOfBirth}
                                    onChange={this.handleInputChange}
                                />
                                {userDateOfBirth_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userDateOfBirth_error}</span>}
                            </Form.Group>

                            <Form.Group style={{ marginTop: 20 }} className="mb-3" >

                                <Form.Control type="email" id="userEmail" name="userEmail" value={userEmail} placeholder="Enter email" onChange={this.handleInputChange} />
                                {userEmail_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userEmail_error}</span>}
                                {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}

                            </Form.Group>

                            <Form.Group className="mb-3" >

                                <Form.Control type="password" id="userPassword" name="userPassword" value={userPassword} placeholder="Password" onChange={this.handleInputChange} />
                                {userPassword_error && <span style={{ color: "#f44336", fontWeight: "bolder", fontSize: 12 }}>{userPassword_error}</span>}
                            </Form.Group>
                            <Form.Group className="mb-3" >

                                <Form.Control type="password" id="userConfirmPassword" name="userConfirmPassword" value={userConfirmPassword} onChange={this.handleInputChange} placeholder="Confirm Password" />
                                {userConfirmPassword_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{userConfirmPassword_error}</span>}
                            </Form.Group>

                            <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10, marginBottom: 10 }} onClick={this.handleSubmit} type="submit">
                                {this.state.isButtonLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Account"}

                            </Button>

                            <br />

                            <p >Already have an account? <a href="login" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></p>
                        </Form>

                    </div>
                </div>



            </div>



        )


    }
}

// const CreateBusiness = ()=> {

//     const [notSubmitted, setNotSubmitted] = useState(false)
//     const [isButtonLoading, setIsButtonLoading] = useState(false)
//     const [formData, setFormData] = useState({
//         businessName: '',
//         buinessEmail: "",
//         businessPhoneNo: "",
//         businessDescription: "",
//         businessTill: "",

//     })

//     const handleInputChange = event => {
//         const { name, value } = event.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }))
//     }
//     const handleSubmit = event => {

//         setIsButtonLoading(true)


//         event.preventDefault();
//         const url = 'http://localhost:3001/createbusiness'
//         axios.post(url, formData).then(response => {
//             console.log(response.data)
//             setIsButtonLoading(false)
//         }).catch(error => {
//             console.log(error)
//             setNotSubmitted(true)
//             setIsButtonLoading(false)
//         })
//     }

//     return (
//         <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 100, width: '100%' }}>

//             <Form style={{ minWidth: 300, backgroundColor: '#ffffff', padding: 20, borderRadius: 5, position: "relative" }}>
//                 <div style={{ display: 'flex', position: "absolute", justifyContent: "center", width: '90%', alignItems: 'center', top: -40 }}>
//                     <img style={{ width: 70, backgroundColor: '#ffffff', height: 70, border: "2px solid #0097a7", borderRadius: 35 }} src="add-friend.png" />
//                 </div>
//                 {notSubmitted ?
//                     <Alert variant="danger" style={{ marginTop: 10, marginBottom: 0 }}>
//                         An Error has occurred please try again

//                     </Alert> :
//                     ""

//                 }
//                 <Form.Group >
//                     <div className="row" style={{ marginBottom: 20, marginTop: 20 }} >
//                         <div className="col-sm"><Form.Control type="text" placeholder="Business Name" name="businessName" value={formData.businessName} onChange={handleInputChange} /></div>
//                         {/* {businessName_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessName_error}</span>} */}

//                     </div>
//                 </Form.Group>
//                 <InputGroup className="mb-3">
//                     <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
//                     <Form.Control
//                         placeholder="Phone Number"
//                         aria-label="Phone number"
//                         aria-describedby="basic-addon1"
//                         name="businessPhoneNo"
//                         value={formData.businessPhoneNo}
//                         onChange={handleInputChange}
//                     />
//                     {/* {businessPhoneNo_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessPhoneNo_error}</span>} */}
//                 </InputGroup>


//                 <Form.Group style={{ marginTop: 20 }} className="mb-3" >

//                     <Form.Control type="email" id="userEmail" name="businessEmail" value={formData.businessEmail} placeholder="Enter email" onChange={handleInputChange} />
//                     {/* {businessEmail_error && <span style={{ fontSize: 12, color: "#f44336", fontWeight: "bolder" }}>{businessEmail_error}</span>} */}
//                     {/* <Form.Text className="text-muted">
//                                     We'll never share your email with anyone else.
//                                 </Form.Text> */}

//                 </Form.Group>

//                 <Form.Group className="mb-3" >

//                     <Form.Control type="text" id="businessTill" name="businessTill" value={formData.businessTill} placeholder="Business Till Number" onChange={handleInputChange} />
//                     {/* {businessTill_error && <span style={{ color: "#f44336", fontWeight: "bolder", fontSize: 12 }}>{businessTill_error}</span>} */}
//                 </Form.Group>
//                 <InputGroup>

//                     <Form.Control as="textarea" aria-label="With textarea" id="businessDecription" name="businessDescription" value={formData.businessDescription} onChange={handleInputChange} placeholder="Description" />
//                 </InputGroup>


//                 <Button style={{ backgroundColor: '#006064', width: '100%', marginTop: 10, marginBottom: 10 }} onClick={handleSubmit} type="submit">
//                     {isButtonLoading === true ? <Spinner style={{ color: 'white', padding: "7px" }} /> : "Create Business Account"}

//                 </Button>

//                 <br />

//                 <p >Already have an account? <a href="login" style={{ color: '#006064', fontWeight: 'bold', cursor: 'pointer' }}>Login</a></p>
//             </Form>

//         </div>
//     )
// }



export default SignUp;