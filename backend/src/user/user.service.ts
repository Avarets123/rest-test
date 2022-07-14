import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { IResLogin } from './interfaces/res.login.user.interface';
import { User } from './models/user.model';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<User> {
    const { email, password } = dto;

    const hasUser = await this.userRepository.findOne({ email });

    if (hasUser) {
      throw new HttpException(`User by email: ${email} exist`, HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    Object.assign(newUser, dto);
    const hashPassword = await hash(password, 9);
    newUser.password = hashPassword;

    return await newUser.save();
  }

  async loginUser(dto: LoginUserDto): Promise<IResLogin> {
    const { email, password } = dto;

    const hasUser = await this.userRepository.findOne({ email });

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
}
