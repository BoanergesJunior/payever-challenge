import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('api')
export class ImagesController {
  constructor(private imageService: ImagesService) {}

  @Get('/user/:id/avatar')
  getAvatar(@Param('id') id: string) {
    return this.imageService.getAvatar(id);
  }

  @Delete('/user/:id/avatar')
  deleteAvatar(@Param('id') id: string) {
    return this.imageService.deleteAvatar(id);
  }
}
