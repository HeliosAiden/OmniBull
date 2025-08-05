import mongoose from "mongoose";

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: String,
  chain: String,
  type: { type: String, enum: ['dex', 'cex'], default: 'dex' }
});

export default mongoose.models.Wallet || mongoose.model("Wallet", WalletSchema);
