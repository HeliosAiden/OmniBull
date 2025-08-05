import mongoose from "mongoose";

const CexAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  exchange: String,
  apiKeyEncrypted: String,
  apiSecretEncrypted: String,
  label: String
});

export default mongoose.models.CexAccount || mongoose.model("CexAccount", CexAccountSchema);
