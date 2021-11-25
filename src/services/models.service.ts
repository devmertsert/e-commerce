import { Request } from "express";
import Models from "../models/models.model";
import { handleErrors } from "../helpers"

import { Model, Types } from "mongoose";

interface IError extends Error {
    code?: number;
}


export const _create = async (req: Request) => {
    let { name, slug, brand } = req.body;
    slug = slug || ( name.split(" ").join("-") + "-" + new Date().getTime() ).toLowerCase();

    let model = new Models({ name, slug, brand });

    try {
        await model.save();

        return {
            code: 201,
            message: "Model was created successfully.",
            status: "success",
            data: [model]
        }
        
    } catch (err) {
        return handleErrors(err);
    }
};

export const _update = async (req: Request) => {
    let { id: _id } = req.params;
    let { name, slug, brand } = req.body;

    let params = { name, slug, brand };
    try {
        let model = await Models.findOneAndUpdate({_id}, params, { new: true, runValidators: true, context: 'query' })
        
        return {
            message: "Model was updated successfully",
            code: 200,
            status: "success",
            data: [model]
        }

    } catch (err) {
        return handleErrors(err);
    }
};

export const _delete = async (req: Request) => {
    let { id } = req.params;
    try {
        let model = await Models.findByIdAndDelete(id);
        if(!model) {
            let error: IError = new Error("Model was not found");
            error.code = 404;
            throw error;
        }

        return {
            message: "Model was deleted successfully",
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
        let model = await Models.findOne({_id}).populate('brand');
        if(!model) {
            return {
                code: 404,
                message: "No model was found",
                status: "error",
                errors: []
            }
        }
        
        return {
            code: 200,
            message: "Model information is retrieved.",
            status: "success",
            data: [model]
        }
    } catch (err) {
        return handleErrors(err);
    }
};

export const _list = async (req: Request) => {
    try {
        let models = await Models.find({}).populate('brand');
        
        if (!models.length) {
            return {
                code: 404,
                message: "No models found",
                status: "error",
                errors: []
            }
        }

        return {
            code: 200,
            message: "Models are fetched.",
            status: "success",
            data: [models]
        }
    } catch (err) {
        return handleErrors(err);
    }
};
