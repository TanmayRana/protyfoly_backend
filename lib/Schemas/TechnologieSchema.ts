import { Schema, model, models } from "mongoose";

const TechnologieSchema = new Schema({
  name: String,
});

const Technologie =
  models.Technologie || model("Technologie", TechnologieSchema);

export default Technologie;
