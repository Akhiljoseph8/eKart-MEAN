const carts=require("../Models/cartModel")

exports.addToCart=async(req,res)=>{
    const {id,title,price,quantity,image}=req.body
    const userId=req.payload
    try{
        const existingProduct=await carts.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity+=1
            existingProduct.totalPrice=existingProduct.quantity*existingProduct.price
            await existingProduct.save()
            res.status(200).json("Added")
        }else{
            const newItem=new carts({
             id,title,price,image,quantity,totalPrice:price,userId
            })
            await newItem.save()
            res.status(200).json("Added")
        }
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getCartItems=async(req,res)=>{
    try{
        const userId=req.payload
        const result=await carts.find({userId})
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}
exports.removeCartItem=async(req,res)=>{
    try{
        const itemId=req.params.id
        const result=await carts.findByIdAndDelete({_id:itemId})
        res.status(200).json(result)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.incrementCartQuantity=async(req,res)=>{
    const cid =req.params.id
    try{
       const cartItem=await carts.findById({_id:cid})
       cartItem.quantity+=1
       cartItem.totalPrice=cartItem.price*cartItem.quantity
       await cartItem.save()
       res.status(200).json("Quantity Updated")
    }catch(err){
        res.status(401).json(err)
    }
}

exports.decrementCartQuantity=async(req,res)=>{
    const cid =req.params.id
    try{
       const cartItem=await carts.findById({_id:cid})
       if(cartItem.quantity==1){
        const result= await carts.deleteOne({_id:cid})
        res.status(200).json("Quantity Updated")
        cartItem.totalPrice=cartItem.price*cartItem.quantity
       }
       else{
        cartItem.quantity-=1
        cartItem.totalPrice=cartItem.price*cartItem.quantity
        await cartItem.save()
        res.status(200).json("Quantity Updated")
       }
  
    }catch(err){
        res.status(401).json(err)
    }
}

exports.emptyCart=async(req,res)=>{
    const userId=req.payload
    try{
        const result=await carts.deleteMany({userId})
        res.status(200).json("empty")
    }catch(err){
        res.status(401).json(err)
    }
}
