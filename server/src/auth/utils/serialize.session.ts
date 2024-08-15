import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: any, done: (err: Error, id?: any) => void): void {
    done(null, user.id);
  }

  async deserializeUser(
    id: any,
    done: (err: Error, user?: any) => void,
  ): Promise<void> {
    const user = await this.authService.findUser(id);
    done(null, user);
  }
}
