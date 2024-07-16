const products=require('../Models/productModel')

exports.getAllproducts=async(req,res)=>{
    try{
        const result=await products.find()
        res.status(200).json(result)
    }catch(err){
        res.status(406).json(err)
    }
}

exports.getProduct = async(req,res)=>{
    try {
        const result = await products.findOne({id:req.params.id})
        res.status(200).json(result) 
    } catch (error) {
        res.status(404).json(error)
    }

} 

