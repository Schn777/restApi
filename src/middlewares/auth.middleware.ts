import { Request, Response, NextFunction } from 'express';
import Properties from '../config/properties.interface';
import jwt from 'jsonwebtoken';

export default class AuthenticationFilter {

    authFilter(req: any, res: Response, next: NextFunction) {
        const token = req.headers["Authorization"]?.split(" ")[1];

        if (!token) {
            return res.sendStatus(403);
        }

        console.log(req);
        console.log(res);
        
        
        jwt.verify(token, Properties.SECRET_KEY, (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }

    authorizeRole(role: string) {
        return (req:any, res: Response, next: NextFunction) => {
            if (req.user.role !== role) return res.sendStatus(401);
            next();
        };
    }
}
