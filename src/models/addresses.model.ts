import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IAddressModel extends Document {
    alias: string;
    firstname: string;
    lastname: string;
    company: string;
    vat: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    active: number;
}

const schema = new Schema({

    alias: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: false
    },
    vat: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    active: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }

}, { timestamps: true, collection: "addresses" });


schema.plugin(uniqueValidator);

export default mongoose.model<IAddressModel>("Address", schema);
