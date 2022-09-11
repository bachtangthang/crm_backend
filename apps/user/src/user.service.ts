// import { Injectable, Inject } from '@nestjs/common';

// @Injectable()
// export class UserService {
//   constructor(@Inject('PG_CONNECTION') private conn: any) {}

//   async getUsers() {
//     const res = await this.conn.query('SELECT * FROM users');
//     return res.rows;
//   }
// }

import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import UserDto from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getAll();
  }

  getUserById(id: number) {
    return this.userRepository.getById(id);
  }

  createUser(userData: UserDto) {
    return this.userRepository.create(userData);
  }

  updateUser(id: number, userData: UserDto) {
    return this.userRepository.update(id, userData);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
