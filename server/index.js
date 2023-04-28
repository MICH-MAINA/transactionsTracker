const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const { response } = require('express');
const bcrypt = require("bcrypt")


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());


app.use(express.static("public"))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "transactionsdb"
})




app.post('/signup', (req, res) => {

    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword
    const userFname = req.body.userFname;
    const userLname = req.body.userLname;
    const userDateOfBirth = req.body.userDateOfBirth
    const userPhoneNo = req.body.userPhoneNo

    // bcrypt.hash(userPassword, 10, (err, newPassword) => {
        // if (err) {
        //     console.log(err)
        // } else {
            // console.log(newPassword)
            newUser = { userEmail, userPassword, userFname, userLname, userDateOfBirth, userPhoneNo }
            db.query("INSERT INTO userprofile (userFirstName, userLastName, useremail, userPhoneNumber, userDateOfBirth, userpassword) VALUES (?, ?, ?, ? , ? , ?) ", [userFname, userLname, userEmail, userPhoneNo, userDateOfBirth, userPassword], (err, result) => {
                res.json({userId:result.insertId })
                console.log(result.insertId)
                console.log(result)

                if (err) {
                    return console.log(err.message)
                }
                console.log(result)

            })
        // }
    // })
    





})

app.post('/createBusiness', (req, res) => {

    const businessName = req.body.businessName;
    const businessEmail = req.body.businessEmail;
    const businessTill = req.body.businessTill;
    const businessPhoneNo = req.body.businessPhoneNo;
    const businessDescription = req.body.businessDescription;
    const userProfileId = req.body.userId

    db.query("INSERT INTO userbusiness (businessName, businessEmail, businessPhone, businessTill, businessDescription, userProfileId) VALUES (?, ?, ?, ?, ?,?)", [businessName, businessEmail, businessPhoneNo, businessTill, businessDescription, userProfileId], (err, result) => {
        res.json({businessId:result.insertId })
        console.log(result.insertId)
        if (err) {
            console.log(err.message)
            res.send(err)


        }
        console.log(result)
        
    })

})

app.post('/login', (req, res) => {

    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword


    db.query(`SELECT idUserProfile,userEmail, userPassword FROM userprofile WHERE userEmail = ? AND userPassword = ?`, [userEmail, userPassword], (err, result) => {
        if (err) {
            console.error("Error querying the database", err)
            res.status(500).json({ error: "Internal server error" })
            return;
        }
        if (result.length > 0) {
            res.json({ message: "Login Successful", idUserProfile: result[0].idUserProfile })

            res.json(result.idUserProfile)
        } else {
            res.status(401).json({ error: "Invalid username or password" })
        }
        console.log(result)
        res.end()
    })
})

app.post('/dashboard', (req,res)=>{
    const {sql, params} = req.body;
    db.query(sql,params, (err,result) =>{
        if(err) throw err;
        const userData = result
        res.send({userData})
    })
})

app.post('/dashboard/addTransaction',(req,res) =>{
    const{businessId, mpesaCode,customerName,customerPhone,transactionDateTime, amountReceived } = req.body

    db.query("INSERT INTO transactions (idUserBusiness, transactionCodeNo, transactionCustomerName, transactionDateTime, transactionPhoneNo, transactionAmount) VALUES (?,?,?,?,?,?)", [businessId, mpesaCode,customerName, customerPhone,transactionDateTime, amountReceived ], (err,result)=>{
        
        res.json({message:res.status})
        if (err) {
                    return console.log(err.message)
                }
    })
})
app.get('/dashboard/business/:businessId', (req,res) =>{
    const businessId = req.params.businessId
    console.log(req.params.businessId)
    db.query(`SELECT * FROM userBusiness WHERE iduserBusiness=?`,[businessId], (err,result)=>{
        if(err) throw err;
        const selectedBusiness = result
        res.send({selectedBusiness})
        console.log(selectedBusiness)
        if (err) {
                    return console.log(err.message)
                }
    })
   
})
app.post('addTransaction', (req,res)=>{
    const {iduserBusiness,mpesaCode, customerName, customerPhone, transactionDateTime, amountReceived} = req.body
    db.query("INSERT INTO transactions (idUserBusiness, transactionCode" )
})
app.listen(3001, () => {
    console.log("running on port 3001")
})

