import { Request } from "express";
import { handleErrors } from "../helpers";
import Paypal from "../models/paypal.model";


interface IError extends Error {
    code?: number;
}


export const _create = async (req: Request) => {

    let {
        paypal_client_id,
        paypal_secret_key,
        payee_email_address,
        payee_merchant_id,
        description,
        tax
    } = req.body;

    let params = {
        paypal_client_id,
        paypal_secret_key,
        payee_email_address,
        payee_merchant_id,
        description,
        tax
    }

    try {

        let paypal = new Paypal(params);
        await paypal.save();

        return {
            code: 201,
            message: "Paypal info was created successfully.",
            status: "success",
            data: []
        }
        
    } catch (err) {
        return handleErrors(err);
    }
};

export const _update = async (req: Request) => {
    let {
        paypal_client_id,
        paypal_secret_key,
        payee_email_address,
        payee_merchant_id,
        description,
        tax
    } = req.body;

    let params = {
        paypal_client_id,
        paypal_secret_key,
        payee_email_address,
        payee_merchant_id,
        description,
        tax
    }

    try {

        let paypal = await Paypal.find({});
        if(!paypal[0]) {
            let error: IError = new Error("Paypal info not found");
            error.code = 404;
            throw error;
        }
        
        let updatePaypal = await Paypal.findByIdAndUpdate(paypal[0]._id, params, { new: true, runValidators: true, context: 'query' });
        
        return {
            code: 200,
            message: "Model information is retrieved.",
            status: "success",
            data: [updatePaypal]
        }
    } catch (err) {
        return handleErrors(err);
    }
};

export const _get = async (req: Request) => {
    
    try {
        let paypal = await Paypal.find({});
        if(!paypal[0]) {
            let error: IError = new Error("Paypal info not found");
            error.code = 404;
            throw error;
        }

        return {
            code: 200,
            message: "Paypal information is retrieved.",
            status: "success",
            data: [paypal[0]]
        }
    } catch (err) {
        return handleErrors(err);
    }
};
