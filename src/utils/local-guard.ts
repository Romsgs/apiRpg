import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import logger from './logger';
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    logger.info('inside LocalAuthGUard.activate');
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
