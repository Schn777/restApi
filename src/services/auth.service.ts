import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import RegistrationDTO from '../payloads/dto/register.dto';
import LoginDTO from '../payloads/dto/login.dto';
import { User } from '../interfaces/user.interface';
import { hashPassword, verifyPassword } from '../utils/security.utils';
import AuthenticationResponseObject from '../payloads/response/authResponseObject.vm';


export class AuthService {
    
    private static users: User[] = []; // Un tableau pour stocker des utilisateurs fictifs
    public static SECRET_KEY = '7bFEnV8PM1Z+reWc3Cil/6YiOAxbpfOwF2E4P3CCFmbZkCheXMmr90xJa7xJYL2s'; // Utilisée pour signer les JWT (garder cette clé sécurisée)
    private static idCount : number = 0;
    
    static async register(registrationDto: RegistrationDTO) : Promise<AuthenticationResponseObject> {
        try {
            this.users.push({ 
                username: registrationDto.username , 
                password: await hashPassword(registrationDto.password.trim()),
                id: this.idCount++,
                name: registrationDto.name
            });
            const token = jwt.sign({ username: registrationDto.username }, this.SECRET_KEY, { expiresIn: '1h' });
            return {
                code: 200,
                jwt: token,
                message: "Successfully Registererd."
            }
        } catch (e) {
            return {
                code: 400,
                jwt: "",
                message: e as string,
            };
        }
    }

    static async authenticate(loginDto: LoginDTO) : Promise<AuthenticationResponseObject> {
        const user = this.users.find(u => u.username === loginDto.username.trim());

        if (!user) {
            return {code : 400, message: 'Utilisateur non trouvé', jwt:""}
        }
        
        const isValidPassword = await verifyPassword(loginDto.password.trim(), user.password);
        if (!isValidPassword) {
            return {code : 400, message: 'Mot de passe incorrect', jwt: ""}
        }
    
        // Génération d'un JWT
        const token = jwt.sign({ username: user.username }, this.SECRET_KEY, { expiresIn: '1h' });
        return {
            code: 200,
            message: "Logged in Successfully",
            jwt: token,
        }
    }
}