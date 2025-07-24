import { Schema, models, model } from "mongoose";

const SkillsCategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SkillsCategory =
  models.SkillsCategory || model("SkillsCategory", SkillsCategorySchema);

export default SkillsCategory;
