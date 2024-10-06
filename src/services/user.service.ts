import { User } from '../models/user.model';
import RegistrationDTO from '../payloads/dto/register.dto';
import { hashPassword } from '../utils/security.utils';
import JsonData from './jsonServices';
import Regex from '../regex/regex';
import logger from '../utils/logger';

export class UserService {
  private static fileName = 'user.json';
  
  public static async getAllUsers(): Promise<User[] | Error> {
    try{
      return await JsonData.readJson(this.fileName)
    }
    catch(error){
      throw new Error("Error while retreive all users");
    }
  }
  public static async getUserByEmail(emailUser : string) : Promise <User | Error> {
    try{
      if(!Regex.validateUser(emailUser)){
        throw new Error("Email no valid");
      }
      const result  = await this.getAllUsers();
      if(result instanceof Error){
        throw new Error("User doesn't exists")
      }
      const user = result.filter((u)=> u.email == emailUser)
      
      return user[0] 
    }
    catch (error){
      logger.info("error get user",error );
      throw new Error("error get user");
    }   
  };
  public static async createUser(registerDto : RegistrationDTO): Promise<String | null>{
    try{
      if(!Regex.validateUser(registerDto.email) || (registerDto.charge !== "gestionnaire" && registerDto.charge !=="employe")){
        throw new Error("Email or charge no valid");
      }
      const hashPwd = await hashPassword(registerDto.password.trim());
      const user = new User(registerDto.name, registerDto.email,
                           hashPwd,
                           registerDto.charge,registerDto.charge=="gestionnaire"?true:false,
                          );
      JsonData.writeJson(this.fileName,[user]);
      return user.name;
    }
    catch(error){
      logger.info("Error while create a user", error)
      throw new Error("Error while create a user");
    }
  };
  
}