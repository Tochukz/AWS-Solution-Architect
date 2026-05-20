import { Controller, Get, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AppService } from './app.service';
import { CustomThrottlerGuard } from './custom/custom.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  @Throttle({ login: {} })
  @UseGuards(CustomThrottlerGuard)
  login(@Body() body: any): string {
    throw new UnauthorizedException('Invalid credentials');
    return body
  }
}
