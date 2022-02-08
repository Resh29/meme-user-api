import { ReturnUserDto } from './user/user-return.dto';
import {
  generateAccessToken,
  verifyAccessToken,
} from './../helpers/generateAccessToken';
import { SALT, SECRET } from './user/user.options';
import {
  generateHashString,
  compareHashPassword,
} from './../helpers/createHashPassword';
import { UserLoginDto } from './user/user-login.dto';
import { User, UserDocument } from './user-schemas/user.schema';
import { UserDto } from './user/user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  getUserDataObject(): string {
    return 'User data';
  }

  async createNewUser(userDto: UserDto): Promise<any> {
    const isUserExist = await this.userModel.findOne({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      email: userDto.email,
    });
    if (isUserExist) {
      throw new HttpException('USER_ALREADY_EXIST', HttpStatus.CONFLICT);
    } else {
      const hashPassword = await generateHashString({
        data: userDto.password,
        salt: SALT,
      });
      const token = generateAccessToken({ email: userDto.email }, SECRET);
      const user = { ...userDto, password: hashPassword, token };
      const newUser = new this.userModel(user);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Unreachable code error
      const result = await newUser.save();
      return {
        name: result.name,
        token: result.token,
        memesCollection: result.memesCollection,
        id: result._id,
      };
    }
  }
  async login(loginUserDto: UserLoginDto, token: string): Promise<any> {
    try {
      if (token) {
        const userEmail = verifyAccessToken(token, {});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        if (userEmail.email) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          const user = await this.userModel.findOne({ email: userEmail.email });
          const result = {
            email: user.email,
            id: user._id,
            memesCollection: user.memesCollection,
          };
          return result;
        } else {
          return;
        }
      } else {
        const user: User = await this.userModel.findOne({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: Unreachable code error
          email: loginUserDto.email,
        });
        if (user) {
          if (compareHashPassword(loginUserDto.password, user.password)) {
            const result: ReturnUserDto = {
              name: user.name,
              token: user.token,
              memesCollection: user.memesCollection,
              id: user._id,
            };
            return result;
          } else {
            throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
          }
        } else {
          throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
        }
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
