import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from '../services/login/login.service';
import { loginDto } from 'src/dto/login.dto';

@Controller('login')
export class LoginController {

    constructor(private loginService: LoginService) { }

     @Post()
        async login(@Body() login: loginDto) {
            return this.loginService.validateUser(login)

        }
    

}
