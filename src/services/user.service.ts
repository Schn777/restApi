//import { UserModel } from '../models/user.model';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import RegistrationDTO from '../payloads/dto/register.dto';
import EditUserDto from '../payloads/dto/edit.user.dto';
import { hashPassword, verifyPassword } from '../utils/security.utils';
import EditPwdDto from '../payloads/dto/edit.pwd.dto';
import LoginDTO from '../payloads/dto/login.dto';
import JsonData from './jsonServices';
import Regex from '../regex/regex';

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
      console.error("error get user",error );
      throw new Error("error get user");
    }   
  };
  public static async createUser(registerDto : RegistrationDTO): Promise<String | null>{
    try{
      if(!Regex.validateUser(registerDto.email)){
        throw new Error("Email no valid");
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
      console.log("Error while create a user", error)
      throw new Error("Error while create a user");
    }
  };
  public static async updateUser(editUserDto : EditUserDto):Promise<EditUserDto | null>{
    // try{
    //   const user = await this.getUserByEmail(editUserDto.emailToBeUpdated);
    //   if(user){
    //     user.name = !editUserDto.name?user.name:editUserDto.name;
    //     user.email = user.email;
    //     user.charge = !editUserDto.charge?user.charge:editUserDto.charge;
    //     user.password = user.password;
    //     user.isAdmin = editUserDto.charge=="gestionnaire"?true:false
    //     await user.save();
    //   };
    //   return editUserDto;
    // }
    // catch(error){
    //   console.log("error while updating user ", error);
    //   return null;
    // }
    return null
  }
  public static async updateUserPwd(editPwdDto : EditPwdDto){
    // try{
    //   const user = await this.getUserByEmail(editPwdDto.email);
    //   if(user){
    //     const match = await verifyPassword(editPwdDto.currentPassword,user.password);
    //     if(match){
    //         user.password = await hashPassword(editPwdDto.newPasssword);
    //     }
    //     await user.save();
    //   }
    // }
    // catch(error){
    //   console.log("error while updating user's password ", error);
    //   return null;
    // }
    return null
  }
  public static async deletedUser(loginDto : LoginDTO){
    
  }
}