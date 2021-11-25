import { Request, Response } from "express";
import * as Service from "../services/paypal.service";

const _create = async (req: Request, res: Response) => {
  let response = await Service._create(req);
  return res.status(response.code).json(response);
};

const _update = async (req: Request, res: Response) => {
    let response = await Service._update(req);
    return res.status(response.code).json(response);
  };

const _get = async (req: Request, res: Response) => {
  let response = await Service._get(req);
  return res.status(response.code).json(response);
};

export { _create, _update, _get };
