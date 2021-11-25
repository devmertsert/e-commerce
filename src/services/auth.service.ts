import User from '../models/user.model'
import Cart from "../models/cart.model";
import { Request } from "express";
import jwt from "jsonwebtoken";

/**
 * POST /auth/register
 */
export const register = async (req: Request) => {    
    let { email, password, firstName, lastName, dateOfBirth } = req.body;
    try {
        // Create a cart for user
        let cart = new Cart();
        await cart.save();

        let user = new User({ email, password, firstName, lastName, dateOfBirth, cart: cart._id });
        await user.save();

        return {
            code: 201,
            message: "You've successfully signed up.",
            status: "success",
            user: user
        }

    } catch (err) {        
        return {
            code: 500,
            message: err._message,
            status: "error",
            errors: err.errors || {}
        }
    }
}

export const login = async (req: Request) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if(!user) {
            return {
                message: "No user found with this email address.",
                status: "error",
                code: 404
            }
        }

        // check passwords
        let isAuthenticated = user.isValidPassword(password);
        if(!isAuthenticated) {
            return {
                message: "Invalid email or password",
                code: 401,
                status: "error"
            }
        }

        // get the access token
        let accessToken = jwt.sign({id: user._id, role: user.admin}, process.env.ACCESS_TOKEN as string);
        return {
            message: "You've successfully logged in.",
            code: 200,
            status: "success",
            data: { accessToken }
        }

    } catch(err) {
        return {
            message: err.message,
            code: err.code || 500,
            status: "error"
        }
    }

}