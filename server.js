const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

// import mongo model
const Name = require('./models/crud')

// mongodb
const uri = "mongodb+srv://vishwajeet:vishwajeet@quizzapp.8cryywh.mongodb.net/?retryWrites=true&w=majority"
async function connect(){
    try{
        await mongoose.connect(uri)
        console.log('connected to online MDB')
    }catch(error){
        console.log(error)
    }
}
connect()


app.use(express.urlencoded({extended:true}))


app.set('view engine', 'ejs')

// SHOWING NAMES
app.get('/',async (req,res) => {
    const names = await Name.find({})
    res.render('index', {names})
})

// create name
app.post('/createname' , async(req,res) => {
    // const {name} = req.body
    const createName  = new Name(req.body)
    await createName.save()
    res.redirect('/')
})

// UPDATE NAME

app.post('/update/:id', async(req,res) => {
    const {id} = req.params
    const name = req.body
    const nameupdate = await Name.findByIdAndUpdate(id, name)
    res.redirect('/')
})

app.post('/delete/:id', async(req,res) => {
    const {id} = req.params
    const deleteName = await Name.findByIdAndDelete(id)
    res.redirect('/')
})


app.listen(port, (req,res) => {
    console.log(`your app is running on http://localhost:${port}`)
})