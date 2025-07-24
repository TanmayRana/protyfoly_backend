import { Schema, model, models } from "mongoose";

// Passions Schema and Model
const PassionsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

export const Passions = models.Passions || model("Passions", PassionsSchema);

// About Schema and Model
const AboutSchema = new Schema({
  story: {
    type: String,
    required: true,
  },
  passions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Passions",
    },
  ],
});

const About = models.About || model("About", AboutSchema);

export default About;
