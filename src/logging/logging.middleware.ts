import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogger');
  use(req: any, res: any, next: () => void) {
    const { method, baseUrl } = req;

    this.logger.log(`Request: ${method} baseURL: ${baseUrl} `);
    // console.time('Request-Response time');
    // res.on('finish', () => console.timeEnd('Request-Response time'));
    next();
  }
}
