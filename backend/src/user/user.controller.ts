import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { UserDec } from './decorators/user.decorator';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { IResLogin } from './interfaces/res.login.user.interface';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('get/all')
  async getAllUser(): Promise<User[]> {
    return (await this.userService.getAllUserOrUserById()) as User[];
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return (await this.userService.getAllUserOrUserById(userId)) as User;
  }

  @Post('create')
  async register(@Body() dto: CreateUserDto): Promise<User> {
    return await this.userService.registerUser(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<IResLogin> {
    return await this.userService.loginUser(dto);
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async update(@UserDec('id') userId: string, @Body() dto: UpdateUserDto): Promise<string> {
    return await this.userService.updateUser(userId, dto);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') userId: string) {
    return await this.userService.delUserById(userId);
  }

  @Get('token/verify/:token')
  verifyToken(@Param('token') token: string) {
    return this.userService.verifyToken(token);
  }
}
