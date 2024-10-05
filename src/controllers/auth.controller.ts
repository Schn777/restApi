import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    public static async Register(req: Request, res: Response): Promise<void> {
        try {
            const serviceRes = await AuthService.register({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                charge : req.body.charge
            });

            res.status(serviceRes.code).json({
                jwt: serviceRes.jwt,
                message: serviceRes.message
            });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(400).json({ message: 'Invalid fileds' });
        }
    }

    public static async Authenticate(req: Request, res: Response): Promise<void> {
        try {
            const serviceRes = await AuthService.authenticate({ password: req.body.password, email: req.body.email });

            res.status(serviceRes.code).json({
                jwt: serviceRes.jwt,
                message: serviceRes.message
            });
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(401).json({ message: 'Authentication failed'});
        }
    }
    public static async UpdateUser(req: Request, res: Response): Promise<void> {
        try {
            const serviceRes = await AuthService.authenticate({ password: req.body.password, email: req.body.email });

            res.status(serviceRes.code).json({
                jwt: serviceRes.jwt,
                message: serviceRes.message
            });
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(400).json({ message: 'Invalid fileds' });
        }
    }
}
