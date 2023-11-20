import { Purchaseorder } from "../models/purchaseOrder.js"


export const createPurchaseOrder=async(req,res,next)=>{
    try {
        const {general_Information,table_Data,terms_and_conditions}=req.body

        const purchaseOrderdata=await Purchaseorder.create({
            general_Information,table_Data,terms_and_conditions
        })

        res.status(200).json({
            success:true,
            purchaseOrderdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const getPurchaseOrder=async(req,res,next)=>{
    try {
        const {id}=req.params

        const purchaseOrderdata=await Purchaseorder.findById(id)

        if(!purchaseOrderdata)
        {
            res.status(400).json({
                success:false,
                message:"Purchase Order Not Found"
            })
        }

        res.status(200).json({
            success:true,
            purchaseOrderdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}