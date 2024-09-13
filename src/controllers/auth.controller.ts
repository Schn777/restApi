import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
    public static async Register(req: Request, res: Response): Promise<void> {
        var serviceRes = await AuthService.register({
            name: req.body.name,
            password: req.body.password, 
            username: req.body.email,
        });

        res
            .status(serviceRes.code)
            .json(serviceRes.jwt)
            .send(serviceRes.message);
    }

    public static async Authenticate(req: Request, res: Response): Promise<void> {
        var serviceRes = await AuthService.authenticate({password: req.body.password, username: req.body.email});
        res
            .status(serviceRes.code)
            .json(serviceRes.jwt)
            .send(serviceRes.message);
    }
}