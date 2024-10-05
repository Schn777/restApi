import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import EditUserDto from '../payloads/dto/edit.user.dto';


export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserService.getAllUsers();
    res.json(users);
  }
  
  public async updateUser(req: Request, res: Response) {
      const {email, name, charge} = req.body
      const user = UserService.updateUser({emailToBeUpdated : email,name:name,charge:charge});
      res.json(user);
  }
}