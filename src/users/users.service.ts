import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { IUserResponse } from './user.model';
import { generateNumberId, producer, sendEmail } from '../helpers';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getAllUsers(id: string): Promise<IUserResponse> {
    try {
      const response = await axios.get(
        `${process.env.REQ_RES_BASE_URL}/api/users/${id}`,
      );
      const { data } = response.data;
      return data;
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<{ [key: string]: number }> {
    const { first_name, last_name, email, avatar } = createUserDto;
    const messageProducer = await producer();

    const newUser = new this.userModel({
      id: generateNumberId(),
      first_name,
      last_name,
      email,
      avatar,
    });

    await sendEmail(email);

    messageProducer.sendToQueue('users', Buffer.from(JSON.stringify(newUser)));

    await newUser.save();

    return { id: newUser.id };
  }
}
