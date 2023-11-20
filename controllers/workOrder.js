import { Workorder } from "../models/workOrder.js"


export const createWorkOrder=async(req,res,next)=>{
    try {
        const {general_Information,taxation_Details,table_Data}=req.body

        const workOrderdata=await Workorder.create({
            general_Information,taxation_Details,table_Data
        })

        res.status(200).json({
            success:true,
            workOrderdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}

export const getWorkOrder=async(req,res,next)=>{
    try {
        const {id}=req.params

        const workOrderdata=await Workorder.findById(id)

        if(!workOrderdata)
        {
            res.status(400).json({
                success:false,
                message:"Work Order Not Found"
            })
        }

        res.status(200).json({
            success:true,
            workOrderdata
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}