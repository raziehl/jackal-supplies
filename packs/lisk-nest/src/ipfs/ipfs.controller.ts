import { Controller, Post, Get, Request, Param } from '@nestjs/common';
import { IpfsService } from './ipfs.service';

@Controller('ipfs')
export class IpfsController {

    constructor (
        private ipfsService: IpfsService
    ) {}

    @Get('asset')
    getAsset(@Param('cid') cid) {
        return this.ipfsService.getAsset(cid);
    }

    @Post('store')
    storeAsset(@Request() req) {
        const asset = req.body;
        return this.ipfsService.storeAsset(asset);
    }

}
