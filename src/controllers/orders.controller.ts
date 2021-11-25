import { Request, Response } from "express";
import * as Service from "../services/orders.service";

export const _get = async (req: Request, res: Response) => {
    let response = await Service._get(req);
    return res.status(response.code).json(response);
};

export const _getById = async (req: Request, res: Response) => {
    let response = await Service._getById(req);
    return res.status(response.code).json(response);
}

export const _update = async (req: Request, res: Response) => {
    let response = await Service._update(req);
    return res.status(response.code).json(response);
}