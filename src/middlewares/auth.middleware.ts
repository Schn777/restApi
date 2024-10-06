import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import logger from '../utils/logger';

export default class AuthenticationFilter {

    authFilter(req: any, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (!token) {
            logger.warn("No token provided");
            return res.status(401).json({ message: 'No token provided' });
        }
        try{
            let decoded;
            try {
                decoded = jwt.verify(token, config.SECRET_KEY_ADMIN);
            } catch (e) {
                decoded = jwt.verify(token, config.SECRET_KEY);
            }
            req.user = decoded;
            next();
        } catch (error){
            logger.warn("Invalid token");
            return res.status(403).json({ message: 'Invalid token' });
        }
        
    }
    authHandleUser(req: any, res: Response, next: NextFunction){
        const token = req.headers['authorization'];
        if (!token){
            logger.warn("No token provided");
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            const decoded = jwt.verify(token, config.SECRET_KEY_ADMIN);
            req.user = decoded;
            next();
        } catch (error) {
            logger.warn("Invalid token");
            return res.status(403).json({ message: 'Invalid token' });
        }
    }

    authorizeRole(role: string) {
        return (req: any, res: Response, next: NextFunction) => {
            if (req.user && req.user.role === role) {
                next();
            } else {
                res.status(403).json({ message: 'Forbidden' });
            }
        };
    }
}
