import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class LoginUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(6,20)
    @IsString()
    password:string
}
