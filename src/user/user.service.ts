import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import * as escapeHTML from 'escape-html';
import * as jwt from 'jsonwebtoken';
import { loginObject } from './dto/LoginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  // Register user function
  async createUser(providedUserObject: User) {
    try {
      // Escape HTMl in user provided object's bio and groups fields
      providedUserObject.bio = escapeHTML(providedUserObject.bio);
      const cleanedGroupsArray: string[] = [];
      providedUserObject.groups.forEach((group) =>
        cleanedGroupsArray.push(escapeHTML(group)),
      );
      providedUserObject.groups = cleanedGroupsArray;
      console.log(providedUserObject.groups);
      // Hash password
      const salt = await bcrypt.genSalt(10);
      providedUserObject.password = await bcrypt.hash(
        providedUserObject.password,
        salt,
      );
      // Create new user in db
      const newUser = new this.userModel(providedUserObject);
      if (!newUser) {
        throw new HttpException('Cant create new user!', 500);
      } else {
        const result = await newUser.save();
        // Check if user has been created and return error if not
        if (result) {
          return result;
        } else {
          throw new HttpException(
            'Something went wrong when creating user!',
            500,
          );
        }
      }
    } catch (err) {
      err && console.log(err);
      throw new HttpException('Something went wrong!', 500);
    }
  }

  // Login Function
  async loginUser(providedLoginObject: loginObject) {
    try {
      const providedEmail = escapeHTML(providedLoginObject.email);
      const providedPassword = escapeHTML(providedLoginObject.password);

      // Search for user by email
      const User = await this.userModel.findOne({ email: providedEmail });
      if (!User) {
        throw new HttpException('User is not registered!', 400);
      }
      // Check if password is correct
      const passwordFromDB = User.password;
      const passwordCheckResult = await bcrypt.compare(
        providedPassword,
        passwordFromDB,
      );
      if (!passwordCheckResult) {
        throw new HttpException('Password is not correct!', 400);
      }
      // Generate jwt token
      const token = jwt.sign(providedEmail, process.env.JWT_SECRET);
      if (!token) {
        throw new HttpException(
          'Something went wrong with login service!',
          500,
        );
      }
      // Return token and user object to client
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, __v, ...userObjectWithoutPassword } = User['_doc'];
      const objectToReturn = {
        Token: token,
        User: userObjectWithoutPassword,
      };
      return objectToReturn;
    } catch (err) {
      console.log(err);
      throw new HttpException('Something went wrong!', 500);
    }
  }
}
