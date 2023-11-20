
import { Vendors } from "../models/vendor.js";

export const AddVendor = async (req, res, next) => {
  console.log("hiii");
  try {
    const {
      vendorName, billingaddress, companyName, contactPerson, designation, email,
      formationDate, organizationStatus, mobileNumber, officeNumber, panNumber,
      tanNumber, gstNumber, sign, registerAddress
    } = req.body;

    const bd = {
      vendorName, billingaddress, companyName, contactPerson, designation, email,
      formationDate, organizationStatus, mobileNumber, officeNumber, panNumber,
      tanNumber, gstNumber, sign, registerAddress
    };

    console.log(bd);

    const vendor = await Vendors.create(bd);

    console.log(vendor);

    if (!vendor) {
      return res.status(500).json({ message: "Vendor creation failed" });
    }

    return res.status(200).json({ vendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const GetAllVendor = async (req, res, next) => {
  try {
    const vendors = await Vendors.find({});

    if (!vendors) {
      return res.status(500).json({ mesage: "Empty :(" });
    }
    const vendor = vendors.map(item => {
      if (item.vendorName) {
        
        item.sign = item.sign.toString('base64');
      
        //item.sign=item.sign.toString('base64');
      }
      return item;
    });
    
    
    res.status(200).json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const GetVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendors.findById(req.params.id);
    if (!vendor) {
      return res.status(500).json({ mesage: "No vendor exists :(" });
    }
    vendor.sign = vendor.sign.toString('base64');

        //item.sign=item.sign.toString('base64');
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
