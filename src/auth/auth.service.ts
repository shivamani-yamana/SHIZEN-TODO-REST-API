import { BadGatewayException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly dataservice:DatabaseService,
    private readonly jwtService:JwtService
  ){}

  async login(loginData:LoginUserDto){
    const {email,password}=loginData
    const user = await this.dataservice.user.findFirst({
      where:{
        email:email
      }
    })
    if (!user){
      throw new BadGatewayException("User doesn't exist with this email")
    }
    
    const validatePassword = await bcrypt.compare(password,user.password)
    if(!validatePassword){
      throw new BadGatewayException("Incorrect Password")
    }

    return {
      token:this.jwtService.sign({email:email})
    }

  }


  async register(registerData: RegisterUserDto) {
    const user = await this.dataservice.user.findFirst({where:{
      email : registerData.email
    }})
    
    if(user){
      throw new BadGatewayException('A User already exists with this email')
    }

    registerData.password = await bcrypt.hash(registerData.password,10)
    const res = await this.dataservice.user.create({data:registerData})

    return res;
  }
}
