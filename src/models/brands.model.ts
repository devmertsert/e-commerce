import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IBrand extends Document {
    name: string;
    slug: string;
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Brand name can't be empty."],
    unique: "Brand name must be unique.",
  },

  slug: {
    type: String,
    required: [true, "Brand slug can't be empty."],
    unique: "Brand slug must be unique.",
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  }
}, { timestamps: true, collection: "brands" });

schema.plugin(uniqueValidator);

export default mongoose.model<IBrand>("Brand", schema);
