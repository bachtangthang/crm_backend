// import { Controller, Get } from '@nestjs/common';
// import { UserService } from './user.service';

// @Controller()
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Get()
//   getHello(): any {
//     return this.userService.getUsers();
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
// import FindOneParams from '../utils/findOneParams';
import UserDto from './user.dto';

@Controller('user')
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getPosts() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getPostById(@Param() { id }) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updatePost(@Param() { id }, @Body() userData: UserDto) {
    return this.userService.updateUser(id, userData);
  }

  @Post()
  createPost(@Body() userData: UserDto) {
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  deletePost(@Param() { id }) {
    return this.userService.deleteUser(id);
  }
}
