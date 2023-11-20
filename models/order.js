import mongoose from "mongoose";

const orderScehma = new mongoose.Schema({
  requisition_name: String,
  department: {
    type: String,
  },
  lab: String,
  itemtype: {
    type: String,
    enum: ["Supplies", "Repair", "External Services", "Equipment"],
    default: "Supplies",
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendors",
  },

  items: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
      total: Number,
    },
  ],

  orderaction: {
    type: String,
    enum: ["none", "Approved", "Rejected"],
    default: "none",
  },

  approveorderaction: {
    type: String,
    enum: ["none", "Approved", "Rejected"],
    default: "none",
  },

  orderStatus: {
    type: String,
    default:"Others"
  },
  remark: {
    type: String,
  },
  approverremark:{
    type:String
  },
  verifierName:{
    type:String
  },
  approverName:{
    type:String
  },
  verifierApprovedDate:{
    type:Date
  },
  verifierRejectedDate:{
    type:Date
  },
  createdBy: {
    type: Date,
    default: Date.now(),
  },
  inwardDate:{
    type:Date,
  },
  archived:{
    type:String,
  },
  orderArchived:{
    type:String
  }
});

export const Orders = mongoose.model("Orders", orderScehma);
