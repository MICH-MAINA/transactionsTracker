import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import DashBoard from "./dashboard";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            userEmail: '',
            userPassword: '',
            loginError: false,
            userId : ''


        }
    }



    userLogin = (e) => {
        e.preventDefault();
        const payload = {
            userEmail: this.state.userEmail,
            userPassword: this.state.userPassword
        }

        const url = 'http://localhost:3001/login'
        axios.post(url, payload).then((response) => {

            // window.location.href =`/dashboard/${response.data.idUserProfile}`
            console.log(response.data)

            const res = response.data
            this.setState({userId: res.idUserProfile})
            
            
            
            

        }).catch((response) => {
            if (response.status != 200){
                this.setState({loginError: true})
            }
            console.log("failed")
            this.setState({ loginError: true })
        })
        
    }
    render() {
        
        return (
            
            <div style={{ backgroundColor: '#e0e0e0' }}>
                {this.state.userId? <DashBoard userId={this.state.userId} /> :
                <div style={{ backgroundColor: "#006064", height: 200, position: "relative", borderRadius: "0 0 60px 60px" }}>
                    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 140, width: '100%' }}>

                        <Form style={{ minWidth:300,backgroundColor: '#ffffff', padding: 20, borderRadius: 5, position: "relative", minWidth: '40%' }}>
                            <div style={{ display: 'flex', position: "absolute", justifyContent: "center", width: '90%', alignItems: 'center', top: -40 }}>
                                <img style={{ width: 70, backgroundColor: '#ffffff', height: 70, border: "2px solid #0097a7", borderRadius: 35 }} src="login.png" />
                            </div>

                            <Form.Group className="mb-3" controlId="formBasicEmail" style={{ marginTop: 25 }}>

                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => { this.setState({ userEmail: e.target.value }) }} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">

                                <Form.Control type="password" placeholder="Password" onChange={(e) => { this.setState({ userPassword: e.target.value }) }} />
                            </Form.Group>
                            {this.state.loginError? 
                            <Alert variant="warning" style={{marginTop:15}}>
                                Wrong email and password combination
                            </Alert>:
                             ""
                            }
                            <Button  style={{ backgroundColor: '#006064', width: '100%', marginTop: 10 }} type="submit" onClick={this.userLogin}>
                                Login
                            </Button>
                            <br />
                            
                            
            
                            {/* <Alert variant="danger">
                                {this.state.loginStatus}
                            </Alert> */}


                            
                            <p style={{ paddingTop: 20 }}>Need an account<span style={{ color: 'blue', fontWeight: 'bold' }}> Sign Up</span></p>
                        </Form>

                    </div>
                </div>

                }

            </div>


        )
    }
}

export default Login;