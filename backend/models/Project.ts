import mongoose, { Schema, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, default: null },
    featured: { type: Boolean, default: false },
    image: { type: String, required: true },
    logo: { type: String, default: null },
    logoFit: { type: String, enum: ["cover", "contain"], default: "cover" },
    tags: { type: [String], default: [] },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
