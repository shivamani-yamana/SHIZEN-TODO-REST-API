import { Injectable } from "@nestjs/common";
import { PassportStrategy} from "@nestjs/passport";
import { DatabaseService } from "../database/database.service";
import {Strategy,ExtractJwt} from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy (Strategy){
    constructor(
        private readonly databaseService: DatabaseService
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false ,
            secretOrKey :"Secret"
        }
        )
    }
    async validate(payload : {
        email:string
    }){
        console.log(payload)
        const user = this.databaseService.user.findFirst({where:{email:payload.email}})
        return user
    }
}
