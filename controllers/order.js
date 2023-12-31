import { Orders } from "../models/order.js";
import { Vendors } from "../models/vendor.js";
import ApiFeature from "../utils/apiFeatures.js";
export const createOrder = async (req, res, next) => {
  try {
    const { requisition_name, department, lab, itemtype, vendor_id, items } =
      req.body;

    const orders = await Orders.create({
      requisition_name,
      department,
      lab,
      itemtype,
      vendor_id,
      items,
    });
    console.log(orders);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallOrders = async (req, res, next) => {
  try {
    // const resultPerPage = 5;
    // const orderCount = await Orders.countDocuments();

    // const apifeature = new ApiFeature(Orders, req.query)
    //   .search()
    //   .filter()
    //   .pagination(resultPerPage);

    // let orders = await apifeature.query;
    let orders = await Orders.find({}).sort({ createdBy: -1 });

    orders = orders.filter((item) => item.orderaction === "none");

    res.status(200).json({
      success: true,
      orders,
      // orderCount,
      // resultPerPage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getallOrdersforIntiatorSuperAdminandAdmin = async (
  req,
  res,
  next
) => {
  try {
    let orders = await Orders.find({}).sort({ createdBy: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const filterOrder = async (req, res, next) => {
  try {
    const { selectedCategories } = req.body;

    if (!selectedCategories || selectedCategories.length === 0) {
      const items = await Orders.find({});
      return res.status(200).json({
        success: true,
        items,
      });
    } else {
      const items = await Orders.find({
        categorie: { $in: selectedCategories },
      });
      return res.status(200).json({
        success: true,
        items,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderaction = "Approved";
    order.remark = req.body.remark;
    order.verifierName = req.user.username;
    order.verifierApprovedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Approved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RejectOrder = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.orderaction = "Rejected";
    order.remark = req.body.remark;
    order.verifierName = req.user.username;
    order.verifierRejectedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Rejected",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getallOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await Orders.findById(id);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getApprovedOrder = async (req, res, next) => {
  try {
    const order = await Orders.find().sort({ createdBy: -1 });

    const approvedOrder = order.filter(
      (item) => item.orderaction === "Approved"
    );

    res.status(200).json({
      success: true,
      approvedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRejectedOrder = async (req, res, next) => {
  try {
    const order = await Orders.find().sort({ createdBy: -1 });

    const rejectedOrder = order.filter(
      (item) =>
        item.orderaction === "Rejected" ||
        item.approveorderaction === "Rejected"
    );

    res.status(200).json({
      success: true,
      rejectedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const processOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const order = await Orders.findById(id);
    const { status } = req.body;

    order.orderStatus = status;
    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const ApproverOrder = async (req, res, next) => {
  try {
    const order = await Orders.find({}).sort({ createdBy: -1 });

    const orders = order.filter(
      (item) =>
        item.approveorderaction === "none" &&
        item.remark !== undefined &&
        item.orderaction === "Approved" &&
        item.orderArchived===undefined
    );

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const AcceptOrderforApprover = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.approveorderaction = "Approved";
    order.approverremark = req.body.approverremark;
    order.verifierName = req.user.username;
    order.verifierApprovedDate = new Date(Date.now());
    order.inwardDate=new Date(Date.now())

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Approved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RejectOrderforApprover = async (req, res, next) => {
  try {
    const order = await Orders.findById(req.params.id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    order.approveorderaction = "Rejected";
    order.approverremark = req.body.approverremark;
    order.verifierName = req.user.username;
    order.verifierRejectedDate = new Date(Date.now());
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Rejected",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const InwardOrders = async (req, res, next) => {
  try {
    const order = await Orders.find({}).sort({ createdBy: -1 });

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    let orders = order.filter((item) => item.approveorderaction === "Approved" && item.archived===undefined);

  
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const changeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Orders.findById(id);

    if (!order) {
      res.status(400).json({
        success: false,
        message: "Order Not Found",
      });
    }

    const { status } = req.body;

    order.orderStatus = status;

    await order.save();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const moveToInwardArchive = async (req, res, next) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  try {
    const ordertoMove = await Orders.find({
      inwardDate: { $lt: fifteenDaysAgo },
    });

    ordertoMove.forEach(async (item) => {
      item.archived = true;
      await item.save();
    });

    res.status(200).json({
      success: true,
      ordertoMove
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



export const moveToOrderArchive = async (req, res, next) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  try {
    const ordertoMoveinOrderArchived = await Orders.find({
      verifierApprovedDate: { $lt: fifteenDaysAgo },
    });

    ordertoMove.forEach(async (item) => {
      item.orderArchived = true;
      await item.save();
    });

    res.status(200).json({
      success: true,
      ordertoMoveinOrderArchived
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


export const orderArchive=async(req,res,next)=>{
  try {
      const orders=await Orders.find({}).sort({ createdBy: -1 })

      let archivedOrders=orders.filter((item)=>item.orderArchived==="true")

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

export const inventoryProducts=async(req,res,next)=>{
  try {
    const orders=await Orders.find({}).sort({createdBy:-1})

    let products=orders.filter((item)=>item.orderStatus==="Receieved")

    res.status(200).json({
      success:true,
      products
    })

  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
  })
  }
}