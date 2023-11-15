import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcryptjs'
import { LoginResponse } from './response/login.response';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService) { }


  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (!user)
      throw new UnauthorizedException('User with such email was not found');

    const isCorrectPassword = compareSync(password, user.password);
    if (!isCorrectPassword)
      throw new UnauthorizedException('Wrong password');

    return { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }

  }



  async login(payload: LoginUserInput): Promise<LoginResponse> {
    const user = await this.userService.findUserByEmail(payload.email.toString());
    return {
      access_token: this.jwtService.sign({ email: payload.email }),
      user
    }
  }
}
