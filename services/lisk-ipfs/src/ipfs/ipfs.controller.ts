import { Controller, Post, Get, Request, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {

    constructor (
        private ipfsService: IpfsService
    ) {}

    @Get('asset')
    getAsset(@Query('cid') cid) {
      return this.ipfsService.getAsset(cid);
    }

    @Post('store')
    storeAsset(@Request() req) {
      console.log(req.body)
      return this.ipfsService.storeAsset(req);
    }

}
