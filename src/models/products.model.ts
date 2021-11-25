import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

// TODO: Add option to set a thumbnail image for the product.
// it must be a string (ie: https://via.placeholder.com/80)
// and must be required.

interface IProducts extends Document {
  name: string;
  description?: string;
  specificDetails?: object[];
  slug: string;
  price: number;
  offPrice: number;
  category: Schema.Types.ObjectId;
  quantity: number;
  active: number;
  sold: number;
  photos?: object[];
  thumbnail: string;
}


const photosSchema = new Schema({
  url: { type: String, required: true },
  description: { type: String, required: false }, // will be useful for seo (img.alt etc).
});

const specificDetailsSchema = new Schema({
    key: { type: String, required: true },
    value: { type: String, required: true }
});

const schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name can't be empty."],
      minlength: 3,
    },

    description: {
      type: String,
      required: [true, "Product description can't be empty."],
      maxlength: 2000,
    },

    /* Specific details. ie: { key: "Color", value: "Blue, White" } */
    specificDetails: [specificDetailsSchema],
    
    slug: {
      type: String,
      required: [true, "Product slug can't be empty."],
      maxlength: 300,
      match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      unique: "Product slug must be unique.",
    },

    price: {
      type: Number,
      trim: true,
      required: [true, "Product price can't be empty."],
      maxlength: 32,
      min: 0,
    },

    offPrice: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
      min: 0,
    },

    carModel: {
      type: mongoose.Types.ObjectId,
      ref: "CarModel",
      required: [true, "Car Model of Product can't be empty."],
    },
    
    quantity: { // stock
      type: Number,
      required: false,
      default: 0,
    },
    
    active: {
      type: Number,
      enum: [0, 1],
      default: 1,
    },
    
    sold: {
      type: Number,
      default: 0,
    },

    photos: [photosSchema],

    thumbnail: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, collection: "products" }
);

schema.plugin(uniqueValidator);

export default mongoose.model<IProducts>("Product", schema);
