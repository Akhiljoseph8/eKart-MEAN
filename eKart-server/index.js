require('dotenv').config()
const express=require('express')
const cors= require('cors')
require('./Connection/db')
const router=require('./Routes/routes')

const eKartServer=express()
eKartServer.use(cors())
eKartServer.use(express.json())
eKartServer.use(router)

const PORT =3000 || process.env.PORT
eKartServer.listen(PORT,()=>{
    console.log(`Ekart server running at PORT:${PORT}`)
})

eKartServer.get('/',(req,res)=>{
    res.send("<h1>SET</h1>")
})
