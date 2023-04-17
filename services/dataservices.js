//impport db.js

const db = require('./db')

const register =(name,email,password,role)=>{
    return db.User.findOne({email}).then(//asynchronous call
    user=>{
      if(user){
        return{
          status:false,
          statusCode:400,
          message:'User already exists'
        }
      }else{
        const newuser = new db.User({
          name:name,
          email:email,
          password:password,
          role:role
        })
        newuser.save()//to save new data to mongodb
        return {
          status:true,
          statusCode:200,
          message:'register sucessfull'
        }
      }
    }
  )
}
const login=(email,password)=>{
    return db.User.findOne({email,password}).then(
        user=>{
          if(user){
            return {
              status:true, 
              statusCode:200,
              message:'login sucessfull',
              user:user.email,
              role:user.role
            }
          }
          else{
            return {
              status:false,
              statusCode:400,
              message:'Invalid User Credentials'
            }
          }
        }
      )

}
//get all products from db

const getProducts = ()=>{
  return db.Product.find().then(
      (result)=>{
          if(result){
              return{
                  status:true,
                  statuscode:200,
                  products:result
              }
          }else{
              return{
                  status:false,
                  statuscode:400,
                  message:'Product not found'
              }
          }
      }
  )}

  const addproducts=(title,description,price,discount,category,image)=>{
    return db.AddProduct.findOne({title}).then(//asynchronous call
    user=>{
      if(user){
        return{
          status:false,
          statusCode:400,
          message:'Product already exists'
        }
      }else{
        const newuser = new db.AddProduct({
          title:title,
          description:description,
          price:price,
          discount:discount,
          category:category,
          image:image,
          action:"pending"
        })
        newuser.save()//to save new data to mongodb
        return {
          status:true,
          statusCode:200,
          message:'Product sucessfully sent to approval'
        }
      }
    }
  )
  }

  const getpendingProducts=()=>{
    return db.AddProduct.find().then(
      (result)=>{
          if(result){
              return{
                  status:true,
                  statuscode:200,
                  products:result
              }
          }else{
              return{
                  status:false,
                  statuscode:400,
                  message:'Product not found'
              }
          }
      }
  )
  }
  const approveproduct=(id)=>{
    console.log(id);
    return db.AddProduct.findById(id).then(
      result=>{
        if(result){
          result.action="Approved"
          result.save()
            return{
                status:true,
                statusCode:200,
                
                message:"Product has been approved.Sent to Verification"
            }
        }else{
            return{
                status:false,
                statuscode:400,
                message:'Product not found'
            }
        }
    }
    )
  }

  const addtoooriginal=(id,title,description,price,discount,category,image)=>{
    return db.AddProduct.findById(id).then(//asynchronous call
    user=>{
      if(user){
        user.action="verified"
        user.save()
        const newuser = new db.Product({
          _id:id,
          title:title,
          description:description,
          price:price,
          discount:discount,
          category:category,
          image:image,
        })
        newuser.save()//to save new data to mongodb
        return {
          status:true,
          statusCode:200,
          message:'Product sucessfully added after verification'
        }
    }}
  )
  }

module.exports={
    register,
    login,
    getProducts,
    addproducts,
    getpendingProducts,
    approveproduct,
    addtoooriginal
}