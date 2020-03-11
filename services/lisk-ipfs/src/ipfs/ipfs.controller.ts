import { Controller, Post, Get, Request, Param, Query, UseInterceptors, UploadedFile, Response } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { pipe } from 'rxjs';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {

    constructor (
        private ipfsService: IpfsService
    ) {}

    @Get('asset/:cid')
    async getAsset(@Param('cid') cid) {
      return await this.ipfsService.getAsset(cid);
    }

    @Post('store')
    async storeAsset(@Request() req) {
      const buffer = Buffer.from(req.body.data);
      return (await this.ipfsService.storeAsset(buffer))
    }

}
