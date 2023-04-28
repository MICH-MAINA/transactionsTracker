import { Component } from "react";
import Table from 'react-bootstrap/Table';


class Transaction extends Component {
    render() {
        return (
            <>
                <Table striped responsive >
                    <thead style={{fontSize: 15}}>
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
                        <tr>
                            <td>RHDFJKNJKEPO</td>
                            <td>Elsie Wamuyu</td>
                            <td>+254794904034</td>
                            <td>7/2/2019 12:00 AM</td>
                            <td>500</td>
                            <td> <button className="more" style={{border:"none", width:"50px", borderRadius:10}}><img src="/three-dots.png"/></button></td>
                        </tr>
                        
                    </tbody>
                </Table>


            </>
        )
    }
}

export default Transaction;