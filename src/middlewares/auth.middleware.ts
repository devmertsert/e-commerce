import * as jwt from "jsonwebtoken"
import { Response, Request, NextFunction } from "express";
import { Types } from "mongoose";

interface IRequest extends Request {
    user: {
        id: Types.ObjectId;
        role: number;
    }
}

export const isRole = (role: number): any => {
    return (req: IRequest, res: Response, next: NextFunction) => {
        const authHeader = <string>req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        
        // if no token is given, return http 401.
        if(!token) {
          return res.sendStatus(401);
        }
        
        try {
          let user = <any>jwt.verify(token, process.env.ACCESS_TOKEN as string);
          req.user = user; // { id: "....", role: "user|admin" }
          if(user.role !== role && user.role !== 1) {
            return res.sendStatus(403);
          }
          
          next();
        } catch (err) {
          return res.sendStatus(403);
        }
      };
}