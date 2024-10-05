import jwt from 'jsonwebtoken';
import RegistrationDTO from '../payloads/dto/register.dto';
import LoginDTO from '../payloads/dto/login.dto';
import { User } from '../models/user.model';
import { hashPassword, verifyPassword } from '../utils/security.utils';
import AuthenticationResponseObject from '../payloads/response/authResponseObject.vm';
import { config } from "../config/config";
import { UserService } from './user.service';

export class AuthService {
    
    static async register(registrationDto: RegistrationDTO) : Promise<AuthenticationResponseObject> {
        try {
           
            await UserService.createUser(registrationDto);
            const token = jwt.sign({ username: registrationDto.email }, config.SECRET_KEY, { expiresIn: '1h' });
            return {
                code: 200,
                jwt: token,
                message: "Successfully Registererd."
            }
        } catch (e) {
            throw new Error(""+ e)
        }
    }

    static async authenticate(loginDto: LoginDTO) : Promise<AuthenticationResponseObject> {
        try{
            const result  = await UserService.getUserByEmail(loginDto.email);

            if (result instanceof Error) {
                return {code : 400, message: 'Utilisateur non trouvé', jwt:""}
            }
            const user : User = result;
            
            const isValidPassword = await verifyPassword(loginDto.password.trim(), user.password);
            if (!isValidPassword) {
                return {code : 400, message: 'Mot de passe incorrect', jwt: ""}
            }
        
            // Génération d'un JWT
            const token = jwt.sign({ email: user.email },(user.isAdmin? config.SECRET_KEY_ADMIN : config.SECRET_KEY), { expiresIn: '1h' });
            return {
                code: 200,
                message: "Logged in Successfully",
                jwt: token,
            }
        }
        catch(error){
            throw new Error
        }
        
    }
}