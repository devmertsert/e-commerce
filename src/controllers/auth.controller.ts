import { Request, Response } from "express";
import * as Service from "../services/auth.service"

const register = async (req: Request, res: Response) => {
    let response = await Service.register(req);
    return res.status(response.code).json(response);
}

const login = async (req: Request, res: Response) => {
    let response = await Service.login(req);
    return res.status(response.code).json(response);
}

export { register, login }