import { Request, Response } from "express";
import * as Service from "../services/products.service";

const _create = async (req: Request, res: Response) => {
    let response = await Service._create(req);
    return res.status(response.code).json(response);
};

const _update = async (req: Request, res: Response) => {
    let response = await Service._update(req);
    return res.status(response.code).json(response);
};

const _delete = async (req: Request, res: Response) => {
    let response = await Service._delete(req);
    return res.status(response.code).json(response);
};

const _get = async (req: Request, res: Response) => {
    let response = await Service._get(req);
    return res.status(response.code).json(response);
}

const _list = async (req: Request, res: Response) => {
    let response = await Service._list(req);
    return res.status(response.code).json(response);
};

export { _create, _delete, _update, _get, _list };
