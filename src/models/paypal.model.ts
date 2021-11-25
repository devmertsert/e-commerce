import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IPaypalModel extends Document {
    paypal_client_id: string;
    paypal_secret_key: string;
    payee_email_address: string;
    payee_merchant_id: string;
    description: string;
    tax: number;
}

const schema = new Schema({

    paypal_client_id: {
        type: String,
        required: true
    },
    paypal_secret_key: {
        type: String,
        required: true
    },
    payee_email_address: {
        type: String,
        required: true
    },
    payee_merchant_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tax: {
        type: Number,
        required: true
    }

}, { timestamps: true, collection: "paypal" });


schema.plugin(uniqueValidator);

export default mongoose.model<IPaypalModel>("Paypal", schema);
