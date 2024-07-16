const wishlists=require('../Models/wishlistModel')
exports.addToWishList = async(req,res)=>{
    try{
        const userId =req.payload
        const {id,title,description, price, category, image, rating}=req.body
        const existingProduct=await wishlists.findOne({userId,id})
        if(existingProduct){
            res.status(406).json("Product Already added to wishlist")
        }else{
            const newWish = new wishlists({
                id,title, description,price,category,image,rating,userId
            })
            await newWish.save()
            res.status(200).json(newWish)
        }
    }
    catch(err){
        res.status(401).json(err)
    }
}


exports.getWishList=async(req,res)=>{
    try{
        const userId=req.payload
        const result=await wishlists.find({userId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.removeWishList=async(req,res)=>{
    try{
        const wishId=req.params.id
        const result=await wishlists.findByIdAndDelete({_id:wishId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}
