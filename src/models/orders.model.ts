import mongoose, { Schema, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

interface IOrders extends Document {
    status: string;
    orderTrackNo: string;
    items: [{
        item: mongoose.Types.ObjectId;
        quantity: number;
    }];
    total: {
        total: number;
        productTotal: number;
        totalTax: number;
    };
    address: mongoose.Types.ObjectId;
    paypal_payment_information: object;
}

const schema = new Schema({

    status: {
        type: String,
        default: 'IN PROGRESS',
        enum: ['IN PROGRESS', 'IN CARGO', 'COMPLETED', 'CANCELEDasADMIN', 'CANCELEDasUSER']
    },
    orderTrackNo: {
        type: String,
        default: 'Order Track No not yet created'
    },
    items: [{
        item: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    total: {
        total: { type: Number, required: true },
        productTotal: { type: Number, required: true },
        totalTax: { type: Number, required: true }
    },
    address: {
        type: mongoose.Types.ObjectId,
        ref: "Address",
        required: true
    },
    paypal_payment_information: {
        type: Object,
        required: true
    }

}, { timestamps: true, collection: "orders" });

schema.plugin(uniqueValidator);

export default mongoose.model<IOrders>("Order", schema);
