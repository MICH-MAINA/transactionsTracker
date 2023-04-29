import { Component } from "react";

class Summary extends Component {
    render() {
        return (
           
                
                <div  style={{ position: 'absolute', width: '100%', top: 140 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="box" style={{ height: 100, width: 250, backgroundColor: "#ffffff", borderRadius: 10, padding: 10, margin: 10, boxShadow:"5px 5px #E0E0E0" }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="salary.png" style={{ border: '2px solid grey ', padding: 1, borderRadius: 10 }} />
                                <p style={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 10, margin: 0 }}><span >Total Amount</span></p>
                            </div>
                            <p style={{ color: 'grey', fontSize: 12, fontWeight: 'bolder', margin: 0 }}><span> February 2023</span></p>
                            <p style={{ fontWeight: 'bolder', fontSize: 17 }}> <span> KSH 1500</span></p>

                        </div>
                        <div className="box" style={{ height: 100, width: 250, backgroundColor: "#ffffff", borderRadius: 10, padding: 10, margin: 10, boxShadow:"5px 5px #E0E0E0" }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src="salary.png" style={{ border: '2px solid grey', padding: 2, borderRadius: 20 }} />
                                <p style={{ fontWeight: 'bold', fontSize: 13, paddingLeft: 10, margin: 0 }}><span >Unique Customers</span></p>
                            </div>

                            <p style={{ color: 'grey', fontSize: 12, fontWeight: 'bolder', margin: 0 }}><span>February 2023</span></p>
                            <p style={{ fontWeight: 'bolder', fontSize: 17 }}> <span>5</span></p>

                        </div>

                        
                    </div>


                </div>
            
        )
    }
}

export default Summary;