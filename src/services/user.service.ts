import { User } from '../models/user.model';
import RegistrationDTO from '../payloads/dto/register.dto';
import { hashPassword } from '../utils/security.utils';
import JsonData from './jsonServices';
import Regex from '../regex/regex';
import logger from '../utils/logger';
import UserModel from '../models/mongo_schema/user.schema';

export class UserService {
  private static fileName = 'user.json';
  
  public static async getAllUsers(version:any): Promise<User[] | Error> {
    try{
      if(version == "1"){
        return await JsonData.readJson(this.fileName);
      }
      else{
        return await UserModel.find({});
      }
      
    }
    catch(error){
      throw new Error("Error while retreive all users");
    }
  }
  public static async getUserByEmail(version:any, emailUser : string) : Promise <any> {
    try{
      if(!Regex.validateUser(emailUser)){
        throw new Error("Email no valid");
      }
      if(version == "2"){
        return await UserModel.findOne({email: emailUser});
      }
      else{
        const result  = await this.getAllUsers(version);
        if(result instanceof Error){
          throw new Error("User doesn't exists")
        }
        const user = result.filter((u)=> u.email == emailUser)
        
        return user[0]
      }
    }
    catch (error){
      logger.info("error get user",error );
      throw new Error("error get user");
    }   
  };
  public static async createUser(version:any, registerDto : RegistrationDTO): Promise<String | null>{
    try{
      if(!Regex.validateUser(registerDto.email) || (registerDto.charge !== "gestionnaire" && registerDto.charge !=="employe")){
        throw new Error("Email or charge no valid");
      }
      const hashPwd = await hashPassword(registerDto.password.trim());
      const user = new User(registerDto.name, registerDto.email,
                           hashPwd,
                           registerDto.charge,registerDto.charge=="gestionnaire"?true:false,
                          );
      if(version == "1"){
        JsonData.writeJson(this.fileName,[user]);
      }
      else{
        await UserModel.create(user);
      }
      return user.name;
    }
    catch(error){
      logger.info("Error while create a user", error)
      throw new Error("Error while create a user");
    }
  };
  
}