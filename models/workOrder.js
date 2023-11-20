import mongoose from "mongoose";

const schema=new mongoose.Schema({
    general_Information:{
        reference_number:String,
        subject:String,
        letter:String
    },
    taxation_Details:{
        current_total_amount: String,
          discount: String,
          total_after_discount: String,
          cgst: String,
          scgst: String,
          final_total_amount: String
    },
    table_Data:Array
})

export const Workorder=mongoose.model("Workorder",schema)