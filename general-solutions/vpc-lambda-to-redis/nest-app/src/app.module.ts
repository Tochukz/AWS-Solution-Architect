import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerModule, type ThrottlerModuleOptions } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        const host = config.get('REDIS_HOST');
        const port = config.get('REDIS_PORT');
        const password = config.get('REDIS_PASSWORD');
        const username = config.get('REDIS_USERNAME');
        const redisEnabled = config.get('REDIS_ENABLED') === '1';
        const loginRequestLimit = config.get('LOGIN_REQUEST_LIMIT') ?? 5;

        const options: ThrottlerModuleOptions = {
          throttlers: [
            {
              name: 'login',
              ttl: 15 * 60 * 1000,
              limit: Number(loginRequestLimit),
            },
          ],
        };
        console.log({ redisEnabled, loginRequestLimit });
        console.log('Redis storage enabled:', redisEnabled);
        if (redisEnabled) {
          const redisUrl = `redis://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}`;
          options.storage = new ThrottlerStorageRedisService(redisUrl);
        }

        return options;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
