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


export const getAllPurchaseOrder=async(req,res,next)=>{
    try {

        const allpurchaseOrderdata=await Purchaseorder.find({}).sort({createdAt:-1})

        if(!allpurchaseOrderdata)
        {
            res.status(400).json({
                success:false,
                message:"Purchase Order Not Found"
            })
        }

        res.status(200).json({
            success:true,
            allpurchaseOrderdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}


export const deletePurchaseOrder=async(req,res,next)=>{
    try {
      let order=await Purchaseorder.findById(req.params.id)
  
      if(!order)
      {
        return res.status(400).json({
          success:false,
          message:"Order Not Found"
        })
      }
  
      await order.deleteOne()
  
      res.status(200).json({
        success:true,
        message:"Order Deleted"
      })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }