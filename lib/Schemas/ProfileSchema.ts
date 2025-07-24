// models/Profile.ts
import { Schema, models, model } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
      default:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite on hot reload in development
const Profile = models.Profile || model("Profile", ProfileSchema);

export default Profile;
