import mongoose, { Schema, Document, mongo } from "mongoose";
import bcrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";

interface IUserModel extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	admin: number;
	cart: object;
	addresses: object[];
	orders: object[];
	isValidPassword(password: string): boolean;
}

const schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		max: 255,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Invalid email format.",
		],
	},
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	dateOfBirth: { type: Date, required: true },
	admin: { type: Number, default: 0, enum: [0, 1] }, // 0 -> user, 1 -> admin
	cart: {
		type: mongoose.Types.ObjectId,
        ref: "Cart",
        required: true
	},
	addresses: [{
		type: mongoose.Types.ObjectId,
		ref: "Address"
	}],
	orders: [{
		type: mongoose.Types.ObjectId,
		ref: "Order"
	}]
}, { timestamps: true, collection: "users" });

/** @TODO Learn why here doesn't like the arrow functions. */
schema.pre("save", function(this: IUserModel, next) {
    if(!this.isModified("password")) return next();
    const salt = bcrypt.genSaltSync(12); // 12 roll
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

/** @TODO Learn why here doesn't like the arrow functions. */
schema.methods.isValidPassword = function(this: IUserModel, password: string) {
    return bcrypt.compareSync(password, this.password);
}

schema.plugin(uniqueValidator);

export default mongoose.model<IUserModel>("User", schema);
