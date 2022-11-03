import Transaction from '../models/Transaction.js'



export const index =  async(req,res)=>{
    const data = await Transaction.find({user_id:req.user._id}).sort({createdAt:-1})
    res.json(data)}

export const destroy = async(req,res)=>{
    const id = req.params.id
    const del = await Transaction.findOneAndDelete({_id:id})
    res.json({message:"success"})
}

export const create = async(req,res)=>{
    const {amount,desc,date} = req.body
    const transaction = new Transaction({
        amount,
        desc,
        date,
        user_id:req.user._id
    }) 
    await transaction.save((err)=>{
        if(err){console.log(err)}
    })
    res.json("success")
}

export const update = async(req,res)=>{
    const {amount,desc,date} = req.body
    const id = req.params.id
    const update = await Transaction.updateOne({_id:id},{amount,desc,date})
    res.json({message:'success'})
}