import { Controller, Get, Post, Request } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { User } from '@root/common/models/User';
import { LiskService } from './lisk.service';
import { SellOrder } from '@root/common/models/Orders';

@Controller('lisk')
export class LiskController {

  constructor(
    private crypto: CryptoService,
    private lisk: LiskService
  ) {}

  @Get('generate-keys')
  generate() {
    return this.crypto.generate();
  }

  @Post('enrichPass')
  enrichPass(@Request() req) {
    const passphrase: string = req.body.passphrase;
    return this.crypto.enrichPass(passphrase);
  }

  @Post('account')
  async login(@Request() req) {
    let user: User = req.body;
    user.address = this.crypto.getAddress(user.passphrase);
    return await this.lisk.account(user);
  }

  @Post('updateUser')
  async updateUser(@Request() req) {
    let user: User = req.body;
    return await this.lisk.updateAccount(user);
  }

  @Post('sell-order')
  async addSellOrder(@Request() req) {
    let { sellOrder, passphrase } = req.body;
    return await this.lisk.addSellOrder(sellOrder);
  }

  @Post('buy-order')
  async addBuyOrder(@Request() req) {
    let { buyOrder, passphrase } = req.body;
    return await this.lisk.addBuyOrder(buyOrder, passphrase);
  }

  @Get('orders')
  async getAllSellOrders() {
    return (await this.lisk.getOrderAccount()).asset.sellOrders;
  }


  @Post('addCash')
  async createUser(@Request() req) {
    let user: User = req.body;
    return await this.lisk.addCash(user);
  }
}
