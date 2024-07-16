const mongoose=require('mongoose')
const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    console.log("Ekart server connected with mongodb database")
}).catch(err=>{
    console.log(err)
})