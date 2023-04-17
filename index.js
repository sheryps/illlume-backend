const express = require('express')

const cors = require('cors')
const dotenv=require('dotenv')
//to acess dataservices
const dataService = require('./services/dataservices')//to acess dataservice here
const mongoose = require('mongoose')
//2.create an app using express
const app = express()
///
//cors
dotenv.config()
app.use(cors({
    origin:'https://master--illume.netlify.app',
}))
console.log(process.env.MONGO_DB)
app.use(express.json())//to return json content to javascript
//3.create a port number
mongoose.connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
  }
  ).then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`);
})

app.post('/register',(req,res)=>{//in asynchronous call
    dataService.register(req.body.name,req.body.email,req.body.password,req.body.role).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})


app.post('/login',(req,res)=>{//in asynchronous call
    dataService.login(req.body.email,req.body.password).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})
//API call to get all products

app.get('/all-products',(req,res)=>{
    dataService.getProducts().then(
        result=>{
            res.status(result.statuscode).json(result)
        }
    )
})

app.post('/addproducts',(req,res)=>{//in asynchronous call
    dataService.addproducts(req.body.title,req.body.description,req.body.price,req.body.discount,req.body.category,req.body.image).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})

app.get('/all-pendingproducts',(req,res)=>{
    dataService.getpendingProducts().then(
        result=>{
            res.status(result.statuscode).json(result)
        }
    )
})
app.post('/approveproduct',(req,res)=>{//in asynchronous call
    dataService.approveproduct(req.body.id).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})

app.post('/addtoooriginal',(req,res)=>{//in asynchronous call
    dataService.addtoooriginal(req.body.id,req.body.title,req.body.description,req.body.price,req.body.discount,req.body.category,req.body.image).then(
        result=>res.status(result.statusCode).json(result)
    )//to check the values in request which is to dataservices
    
})
