import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { jwtSecret } from './constants';
import { LocalAuthGuard } from './guards/local.guard';

@Module({
  imports: [forwardRef(() => UserModule),
    ConfigModule,
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: jwtSecret,
    signOptions: { expiresIn: '3600s' }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalAuthGuard],
  exports: [AuthService]
})
export class AuthModule { }
