import mongoose, { Schema, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface ICart extends Document {
    items: [{
        item: mongoose.Types.ObjectId;
        quantity: number;
    }]
}

const schema = new Schema({
    items: [{
        item:{
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            min: 0,
            default: 1
        }
    }]
}, { timestamps: true, collection: "carts" })

schema.plugin(uniqueValidator);

export default mongoose.model<ICart>("Cart", schema);