import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/user/:id')
  getAllUsers(@Param('id') id: string) {
    return this.usersService.getAllUsers(id);
  }

  @Post('/user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }
}
