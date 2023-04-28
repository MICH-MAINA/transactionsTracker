import axios from "axios";
import { Component } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

class UserProfile extends Component {
    render() {
        return (
            <div style={{ backgroundColor: '#e0e0e0' }}>
                <div style={{ backgroundColor: "#006064", height: 200, position: "relative", borderRadius: "0 0 60px 60px" }}>
                    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', top: 140, width: '100%' }}>

                        <Form style={{ backgroundColor: '#ffffff', padding: 20, borderRadius: 5, position: "relative" }}>
                            <p style={{ fontFamily: 'Titan one', fontSize: 18, width: '100%', textAlign: 'center', color: '#006064' }}>CREATE ACCOUNT</p>
                            <Form.Group >
                                <div className="row" style={{marginBottom: 20}} >
                                    <div className="col-sm"><Form.Control type="text" placeholder="First Name" /></div>
                                    <div className="col-sm"><Form.Control type="text" placeholder="Last Name" /></div>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">

                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">+254</InputGroup.Text>
                                <Form.Control
                                    placeholder="Phone Number"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;