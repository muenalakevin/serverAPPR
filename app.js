require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const {dbConnect} = require('./config/mongo')
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/',require('./app/routes'))
//routes
app.get("/api",(req,res)=>{ 
    res.json({
        mensaje:"nodejs  an jwt"
    })
})

app.post("/api/login",(req,res)=>{
    const user ={
        id:1,
        nombre: "kevin",
        email:"kovi123mau@gmail.com"
    }
    jwt.sign({user},'secretkey', {expiresIn: '30d'},(err,token)=>{
        res.json({
            token
        })
    })
})

// Authorization: Bearer <token>
verifyToken=(req, res, next)=>{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearertoken = bearerHeader.split(" ")[1];
        req.token = bearertoken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.post("/api/post", verifyToken ,(req,res)=>{
    jwt.verify(req.token, 'secretkey' ,(err, authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                mensaje:"post fue creado",
                authData
            })
        }
    })
    
})

//connection mongodb
dbConnect();
app.listen(PORT, ()=>{
    console.log('nodejs app run '+PORT)
})