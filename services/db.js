const mongoose = require('mongoose')

//2. state connection string via mongoose


//3. Define bank Model

const User = mongoose.model('User',{//model creation
    //schema creation
    name:String,
    email:String,
    password:String,
    role:Number

})
const Product = mongoose.model('products',{
    //schema creation

    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    discout:Number
})

const AddProduct = mongoose.model('statproducts',{
    //schema creation

    id:Number,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    discout:Number,
    action:String
})
//exporting model
module.exports={
    User,
    Product,
    AddProduct
}