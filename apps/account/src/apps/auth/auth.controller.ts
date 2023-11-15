import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request } from 'express';

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from './guards/local.guard';
import { UserEntity } from '../user/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './response/login.response';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() dto: LoginUserInput): Promise<LoginResponse> {
        return this.authService.login(dto);
    }
}