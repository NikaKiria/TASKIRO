import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(providedUserObject: object) {
    // Create new user in db
    const newUser = new this.userModel({
      providedUserObject,
    });
    if (!newUser) {
      throw new HttpException('Somethng Went Wrong!', 500);
    } else {
      const result = await newUser.save();
      console.log(result);
    }
  }
}
