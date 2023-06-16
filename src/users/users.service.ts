import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {  IUserResponse } from './user.model';
import { generateNumberId } from 'src/helper';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private baseUrl = 'https://reqres.in' // colocar na env
  private users = [];

  async getAllUsers(id: string): Promise<IUserResponse> {
    const response = await axios.get(`${this.baseUrl}/api/users/${id}`)
    return response.data
  }

  createUser(createUserDto: CreateUserDto): { [key: string]: number } {
    // inserir no mongo
    // enviar email
    // rabbit event
    const { first_name, last_name, email, avatar } = createUserDto
    const newUser = {
      id: generateNumberId(),
      first_name,
      last_name,
      email,
      avatar,
    }

    this.users.push(newUser)

    return { id: newUser.id };
  }

  getAvatar(id: string): string {
    console.log(id);
    return '';
  }
  
  deleteAvatar(id: string): boolean {
    console.log(id);
    return true;
  }
}
