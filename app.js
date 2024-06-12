// init express
const express = require('express')
const app = express();
app.use(express.json())

// init Mongo
const mongoose = require('mongoose')
const mongoUrl = "mongodb+srv://rhysindodev:eOR1HJsCqGsWzVO7@cluster0.mqk2f9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Monggo Connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
}).then(()=>{
    console.log("Mongo Connected From Server")
}).catch((e)=> console.log(e))

// Express Listen if Running
app.listen(1234 , ()=>{
    console.log('Server is started: Port: 1234')
})

// Expressing Post Method
app.post("/post", async(req, res)=>{
    const { name } = req.body

    try {
        if( name == 'Rhysin'){
            res.send({ status: 'Data Found' })
       }
       else{
        res.status(404).send('Not Found')
       }
        
    } catch (error) {
       res.send({status: "Something went wrong"})
    }

 

})