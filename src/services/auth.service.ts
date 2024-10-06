import jwt from 'jsonwebtoken';
import RegistrationDTO from '../payloads/dto/register.dto';
import LoginDTO from '../payloads/dto/login.dto';
import { User } from '../models/user.model';
import {verifyPassword } from '../utils/security.utils';
import AuthenticationResponseObject from '../payloads/response/authResponseObject.vm';
import { config } from "../config/config";
import { UserService } from './user.service';
import logger from '../utils/logger';

export class AuthService {
    
    static async register(registrationDto: RegistrationDTO) : Promise<AuthenticationResponseObject> {
        try {
           
            await UserService.createUser(registrationDto);
            const token = jwt.sign({ username: registrationDto.email }, config.SECRET_KEY, { expiresIn: '1h' });
            logger.info("Successfully Registererd");
            return {
                code: 200,
                jwt: token,
                message: "Successfully Registererd."
            }
        } catch (e) {
            logger.warn("Register failed");
            throw new Error(""+ e)
        }
    }

    static async authenticate(loginDto: LoginDTO) : Promise<AuthenticationResponseObject> {
        try{
            const result  = await UserService.getUserByEmail(loginDto.email);

            if (result instanceof Error) {
                logger.info("Utilisateur non trouvé");
                return {code : 401, message: 'Utilisateur non trouvé', jwt:""}
            }
            const user : User = result;
            
            const isValidPassword = await verifyPassword(loginDto.password.trim(), user.password);
            if (!isValidPassword) {
                logger.info("Mot de passe incorrect");
                return {code : 401, message: 'Mot de passe incorrect', jwt: ""}
            }
        
            // Génération d'un JWT
            const token = jwt.sign({ email: user.email },(user.isAdmin? config.SECRET_KEY_ADMIN : config.SECRET_KEY), { expiresIn: '1h' });
            logger.info("Logged in Successfully");
            return {
                code: 200,
                message: "Logged in Successfully",
                jwt: token,
            }
        }
        catch(error){
            logger.warn("Authentication failed");
            throw new Error;
        }
        
    }
}