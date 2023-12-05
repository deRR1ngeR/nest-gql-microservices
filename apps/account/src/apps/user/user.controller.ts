import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('getUserById')
  async getUserById(@Payload() id: number) {
    console.log(id);
    return await this.userService.findUserById(id);
  }
}
