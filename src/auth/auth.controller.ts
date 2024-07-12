import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiOperation({description:"To Register a new user with email",summary:"Register a User with details."})
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
   
  @Post('login')
  @ApiOperation({description:"To Login a existing user with credentials",summary:"Login a User with credentials."})
  login(@Body() loginData : LoginUserDto){
    return this.authService.login(loginData)
  }
}
