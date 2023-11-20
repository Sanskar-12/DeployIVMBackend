import { Orders } from "../models/order.js"


export const inwardArchive=async(req,res,next)=>{
    try {
        const orders=await Orders.find({})

        let archivedOrders=orders.filter((item)=>item.archived==="true")

        res.status(200).json({
            success:true,
            archivedOrders
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}