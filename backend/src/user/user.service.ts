import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { IResLogin } from './interfaces/res.login.user.interface';
import { User } from './models/user.model';
import { compare, hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;

    const hasUser = await this.userModel.findOne({ email });

    if (hasUser) {
      throw new HttpException(`User by email: ${email} exist`, HttpStatus.BAD_REQUEST);
    }

    const newUser = new this.userModel();
    Object.assign(newUser, dto);
    const hashPassword = await hash(password, 9);
    newUser.password = hashPassword;

    return await newUser.save();
  }

  async loginUser(dto: LoginUserDto): Promise<IResLogin> {
    const { email, password } = dto;

    const hasUser = await this.userModel.findOne({ email });

    if (!hasUser) {
      throw new HttpException(`User by email: ${email} dont exist`, HttpStatus.BAD_REQUEST);
    }

    const validPass = await compare(password, hasUser.password);

    if (!validPass) {
      throw new HttpException(`Password is not valid`, HttpStatus.BAD_REQUEST);
    }

    return {
      email,
      token: this.generateToken(hasUser.id),
    };
  }

  private generateToken(data: any): string {
    return this.jwtService.sign({ data });
  }

  async updateUser(userId: string, dto: UpdateUserDto): Promise<string> {
    const { password } = dto;

    const hasUser = await this.userModel.findOne({ id: userId });

    if (!hasUser) {
      throw new HttpException(`User by userId: ${userId} dont exist`, HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await hash(password, 9);

    const data: UpdateUserDto = {};

    Object.assign(data, dto);
    data.password = hashPassword;

    await this.userModel.findOneAndUpdate({ id: userId }, data);
    return 'updated';
  }

  async getAllUserOrUserById(userId?: string): Promise<User | User[]> {
    if (userId) {
      return await this.userModel.findById(userId);
    }
    return await this.userModel.find();
  }

  async delUserById(userId: string) {
    return await this.userModel.deleteOne({ id: userId });
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
