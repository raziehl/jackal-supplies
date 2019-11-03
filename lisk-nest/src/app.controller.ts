import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { generate } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generate-keys')
  generate() {
    console.log('request')
    return 'gen';
  }
}
