import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login-dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByCpf(loginDto.cpf);

    if (!user) {
      throw new UnauthorizedException('CPF or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('CPF or password is incorrect');
    }

    return { message: 'Login successful', user };
  }
}
