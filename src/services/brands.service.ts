import { Request } from "express";
import Brands from "../models/brands.model";
import { handleErrors } from "../helpers"

import { Types } from "mongoose";

interface IError extends Error {
    code?: number;
}


export const _create = async (req: Request) => {
    let { name, slug } = req.body;
    slug = slug || ( name.split(" ").join("-") + "-" + new Date().getTime() ).toLowerCase();

    let brand = new Brands({ name, slug });

    try {
        await brand.save();

        return {
            code: 201,
            message: "Brand was created successfully.",
            status: "success",
            data: [brand]
        }
        
    } catch (err) {
        return handleErrors(err);
    }
};

export const _update = async (req: Request) => {
    let { id: _id } = req.params;
    let { name, slug } = req.body;

    let params = { name, slug };
    try {
        let brand = await Brands.findOneAndUpdate({_id}, params, { new: true, runValidators: true, context: 'query' })
        
        return {
            message: "Brand was updated successfully",
            code: 200,
            status: "success",
            data: [brand]
        }

    } catch (err) {
        return handleErrors(err);
    }
};

export const _delete = async (req: Request) => {
    let { id } = req.params;
    try {
        let brand = await Brands.findByIdAndDelete(id);
        if(!brand) {
            let error: IError = new Error("Brand was not found");
            error.code = 404;
            throw error;
        }

        return {
            message: "Brand was deleted successfully",
            code: 200,
            status: "success",
            data: []
        }

    } catch (err) {
        return handleErrors(err);
    }
};

export const _get = async (req: Request) => {
    let { id: _id } = req.params;
    
    try {
        let brand = await Brands.findOne({_id})
        if(!brand) {
            return {
                code: 404,
                message: "No brand was found",
                status: "error",
                errors: []
            }
        }
        
        return {
            code: 200,
            message: "Brand information is retrieved.",
            status: "success",
            data: [brand]
        }
    } catch (err) {
        return handleErrors(err);
    }
};

export const _list = async (req: Request) => {
    try {
        let brands = await Brands.find({});
        
        if (!brands.length) {
            return {
                code: 404,
                message: "No brands found",
                status: "error",
                errors: []
            }
        }

        return {
            code: 200,
            message: "Brands are fetched.",
            status: "success",
            data: [brands]
        }
    } catch (err) {
        return handleErrors(err);
    }
};
