import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';



class Navigation extends Component {
    render() {
        return (
            <>

                <Navbar expand='lg' className="mb-3" style={{padding: '15px 35px 0 15px'}}>
                    <Container fluid style={{ color: '#ffffff' }}>
                        <Navbar.Brand href="#" style={{ color: "#ffffff", fontWeight: 'bolder', fontSize: 20, paddingRight: 20 }}>MONGOOSE</Navbar.Brand>
                        <Navbar.Toggle aria-controls='offcanvasNavbar-expand' style={{backgroundColor:'#ffffff', fontSize: 15}}/>
                        <Navbar.Offcanvas
                            placement="end"
                        >
                            <Offcanvas.Header closeButton style={{backgroundColor:'#006064', color:'#ffffff' }}>
                                <Offcanvas.Title>Panel</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body style={{backgroundColor: '#006064'}}>
                                <Nav className="justify-content-start flex-grow-1 pe-3 ">
                                    <Nav.Link href="#action1">DashBoard</Nav.Link>
                                    <Nav.Link href="#action1">Reports</Nav.Link>
                                    <Nav.Link href="#action2">Settings</Nav.Link>
                                    
                                </Nav>
                                
                                <Navbar.Collapse className="justify-content-end">
                                
                                <img style={{width:40, height:40, border:"2px solid grey", borderRadius: 20, marginRight:15}} src="user.png"/>
                                    <NavDropdown title="Jewelry Business">
                                    
                                        
                                        <NavDropdown.Item href="#action3"><img style={{width:40, height:40, border:"2px solid grey", borderRadius: 20, marginRight:15}} src="user.png"/>Clothes Store</NavDropdown.Item>

                                    </NavDropdown>
                                </Navbar.Collapse>
                                
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>

                {/* <Navbar >
                    <Container style={{color:"#ffffff"}}>
                        <Nav.Link href="#features" style={{fontWeight:'bolder', fontSize:20, paddingRight:20}}>MONGOOSE</Nav.Link>
                        <Navbar.Toggle />
                        <Nav className="me-auto" style={{color:"#ffffff"}}>
                            <Nav.Link href="#features">Dashboard</Nav.Link>
                            <Nav.Link href="#pricing">Reports</Nav.Link>
                            <Nav.Link href="#pricing">Settings</Nav.Link>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <NavDropdown
                                title="Jewelry Business"
                                
                            >
                                <NavDropdown.Item href="#action3">Clothes Store</NavDropdown.Item>
                                
                            </NavDropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar> */}
            </>
        )
    }
}

export default Navigation