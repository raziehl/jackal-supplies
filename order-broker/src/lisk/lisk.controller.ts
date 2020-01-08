import { Controller, Get, Post, Request } from '@nestjs/common';
import { LiskService } from './lisk.service';
import { User } from '@root/common/models/User';

@Controller('lisk')
export class LiskController {

  constructor(
    private lisk: LiskService
  ) {}

  @Post('addCash')
  async createUser(@Request() req) {
      console.log('Cash Added')
      let user: User = req.body;
      return await this.lisk.addCash(user.passphrase);
  }

}
