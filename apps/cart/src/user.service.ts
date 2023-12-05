import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { User } from 'libs/db/typeorm/typeorm/user.entity';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly authService: ClientProxy,
  ) {}

  async getUserById(id: number): Promise<User> {
    return this.authService
      .send('getUserById', id)
      .pipe(
        catchError((error) =>
          throwError(() => new RpcException(error.response)),
        ),
      )
      .toPromise();
  }
}
