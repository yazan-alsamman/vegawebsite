import mongoose, { Schema, type InferSchemaType } from "mongoose";

const adminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true },
);

export type AdminUserDocument = InferSchemaType<typeof adminUserSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", adminUserSchema);
