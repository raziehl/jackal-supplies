import { Controller, Get, Post, Request } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { User } from '@root/common/models/User';

@Controller('lisk')
export class LiskController {

  constructor(
    private lisk: LiskService
  ) {}

  @Post('account')
  async getAccount(@Request() req) {
    const user: User = req.body;
    return await this.lisk.login(user);
  }

  @Post('addCash')
  async createUser(@Request() req) {
      let user: User = req.body;
      return await this.lisk.addCash(user);
  }

}
