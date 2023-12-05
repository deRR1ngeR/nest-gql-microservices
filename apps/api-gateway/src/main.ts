import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        //error logs
        new transports.File({
          filename: `logs/error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
        }),
        //all level logs
        new transports.File({
          filename: `logs/combined.log`,
          format: format.combine(format.timestamp(), format.json()),
        }),
        // print log
        // new transports.Console({
        //   format: format.combine(
        //     format.cli(),
        //     format.splat(),
        //     format.timestamp(),
        //     format.printf((info) => {
        //       return `${info.timestamp} ${info.level}: ${info.message}`;
        //     }),
        //   ),
        // }),
      ],
    }),
  });
  const config = await app.get(ConfigService);
  const port = config.get<number>('API_PORT');
  await app.listen(port || 3000);
}
bootstrap();
