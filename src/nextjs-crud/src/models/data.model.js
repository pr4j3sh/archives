import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    data: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Data = mongoose.models.data || mongoose.model("data", dataSchema);

export default Data;
