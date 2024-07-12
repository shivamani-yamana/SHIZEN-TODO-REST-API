import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class RegisterUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(2,20)
    name:string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email:string
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(6,20)
    password:string
}
