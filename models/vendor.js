import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    billingaddress:{
        type:String
    },
    companyName:{
        type:String
    },
    contactPerson:{
        type:String
    },
    designation:{
        type:String,
    },
    email:{
        type:String,
    },
    formationDate:{
        type:String,
    },
    organizationStatus:{
        type: String,
    enum: ["Shipped", "Processing", "Delivered", "Cancelled"],
    default: "Processing",
    },
    mobileNumber:{
        type:String,
    },
    officeNumber:{
        type:String,
    },
    panNumber:{
        type:String,
    },
    tanNumber:{
        type:String,
    },
    gstNumber:{
        type:String,
    },
    sign:{
        type:String,
    },
    registerAddress:{
        type:String,
    },
    vendorName:{
        type:String,
    }
    ,
});

export const Vendors = mongoose.model("Vendors", vendorSchema);

