/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '@app/common/database/database.service';
import { plainToInstance } from 'class-transformer';
import UserModel from './user.model';
import UserDto from './user.dto';

@Injectable()
class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM users
    `);
    return plainToInstance(UserModel, databaseResponse.rows);
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM users WHERE id=$1 #######################
    `,
      [id],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserModel, entity);
  }

  async create(userData: UserDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      INSERT INTO users (
        name
      ) VALUES (
        $1,
        $2
      ) RETURNING *
    `,
      [userData.name],
    );
    return plainToInstance(UserModel, databaseResponse.rows[0]);
  }

  async update(id: number, userData: UserDto) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      UPDATE users
      SET name = $2
      WHERE id = $1
      RETURNING *
    `,
      [id, userData.name],
    );
    const entity = databaseResponse.rows[0];
    if (!entity) {
      throw new NotFoundException();
    }
    return plainToInstance(UserModel, entity);
  }

  async delete(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `DELETE FROM posts WHERE id=$1`,
      [id],
    );
    if (databaseResponse.rowCount === 0) {
      throw new NotFoundException();
    }
  }
}

export default UserRepository;
