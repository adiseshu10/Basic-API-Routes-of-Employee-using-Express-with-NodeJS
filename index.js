    const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://127.0.0.1:27017/dataset")
    .then((result) => {
        console.log('connected to db');
    })
    .catch((err)=>{
        console.log(err);
    })
const employeeSchema = new mongoose.Schema({
    name: String,
    age:Number,
    salary:Number,
    city:String
})
const employeeModel = new mongoose.model("employ1",employeeSchema)
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/insert',(req,res)=>{
    const newEmployee = new employeeModel({
        name:req.body.name,
        age:req.body.age,
        salary:req.body.salary,
        city:req.body.city
    })
    employeeModel.insertMany([newEmployee])
        .then((docs)=>{
          console.log(docs)
          res.redirect('/seedb')
        })
        .catch((err)=>console.log(err))
})
app.get('/viewdb',(req,res)=>{
    res.send("Today is sunday!")
})
app.get('/seedb',(req,res)=>{
    employeeModel.find()
    .then((result)=>{
        res.render('seedb',{db:result})
    })
    .catch((err)=>console.log(err))
})
app.get('/deletedoc',(req,res)=>{
    employeeModel.find()
    .then((result)=>{
        res.render('deletedoc',{db:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post('/delete',(req,res)=>{
    employeeModel.deleteOne()
    .then((docs)=>{
        console.log(docs)
        res.redirect('/seedb')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/updatedoc',(req,res)=>{
    employeeModel.find()
    .then((result)=>{
        res.render('updatedoc',{db:result})
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post('/update',(req,res)=>{
    employeeModel.findOne({_id: req.body._id})
    .then((docs)=>{
        console.log(docs)
        res.render('update', {doc: docs})
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.post('/updated',(req,res)=>{
    employeeModel.findOneAndUpdate({_id: req.body._id},
        {$set:{name:req.body.name,age:req.body.age,city:req.body.city,salary:req.body.salary}})
    .then((docs)=>{
        console.log(docs)
        res.redirect('/seedb')
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.listen(3000,function(){
    console.log('Successfully started at port 3000')
})