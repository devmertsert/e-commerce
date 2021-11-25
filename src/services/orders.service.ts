import { Request } from "express";
import { handleErrors } from "../helpers";

import Addresses from "../models/addresses.model";
import Orders from "../models/orders.model";
import User from "../models/user.model";

interface IError extends Error {
    code?: number;
}

export const _get = async (req: Request) => {
    
    try {
        let orders = await Orders.find({});
        if(!orders) {
            let error: IError = new Error("No orders found");
            error.code = 404;
            throw error;
        }
        
        let orderId: [any] = [{}];
        orderId.splice(0, 1);
        orders.forEach(element => {
            orderId.push(element._id);
        });

        let users = await User.find({
            orders: {
                $in: orderId
            }
        }).populate({
            path: 'orders',
            select: '_id status total'
        }).select("_id firstName lastName email orders");

        return {
            code: 200,
            message: "Orders are retrieved.",
            status: "success",
            data: users
        }
    } catch (err) {
        console.log(err);
        return handleErrors(err);
    }
};

export const _getById = async (req: Request) => {
    
    try {
        let { id } = req.params;

        let order = await Orders.findById(id).populate({
            path: 'items',
            populate: {
                path: 'item'
            }
        });
        if(!order) {
            let error: IError = new Error("Order with this id not found");
            error.code = 404;
            throw error;
        }

        let address = await Addresses.findById(order.address);
        let updatedOrder: any = order;
        updatedOrder.address = address;

        return {
            code: 200,
            message: "Orders are retrieved.",
            status: "success",
            data: [updatedOrder]
        }
    } catch (err) {
        return handleErrors(err);
    }
};

export const _update = async (req: Request) => {
    try {
        let { id } = req.params;
        let { status, orderTrackNo } = req.body;

        let params = { status, orderTrackNo }

        let order = await Orders.findByIdAndUpdate(id, params, { new: true, runValidators: true, context: 'query' });

        return {
            code: 200,
            message: "Orders are retrieved.",
            status: "success",
            data: [order]
        }
    } catch (err) {
        return handleErrors(err);
    }
}