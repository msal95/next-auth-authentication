import mongoose, { models } from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: [{ type: String }],
});

const Role = models.Role || mongoose.model("Role", roleSchema);

export default Role;
