import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IModel extends Document {
    name: string;
    slug: string;
    brand: mongoose.Types.ObjectId;
}

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Model name can't be empty."]
  },

  slug: {
    type: String,
    required: [true, "Model slug can't be empty."],
    unique: "Model slug must be unique.",
    match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  },

  brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
      required: [true, "Brand of Model can't be empty."]
  }
}, { timestamps: true, collection: "models" });

schema.plugin(uniqueValidator);

export default mongoose.model<IModel>("Model", schema);
