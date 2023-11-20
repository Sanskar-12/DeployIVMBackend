import mongoose from "mongoose";

const schema = new mongoose.Schema({
  general_Information: {
    reference_number: String,
    to: String,
    subject: String,
    letter: String,
  },

  table_Data: Array,
  terms_and_conditions: {
    payment: String,
    waranty: String,
    delivery: String,
  },
});

export const Purchaseorder = mongoose.model("Purchaseorder", schema);
