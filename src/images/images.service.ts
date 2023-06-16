import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IImageResponse } from './images.model';
import { Image } from './schemas/image.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  async getAvatar(id: string): Promise<IImageResponse> {
    const image = await this.imageModel.findOne({ userId: Number(id) }).exec();
    if (image) {
      return { userId: image.userId, image64: image.image64 };
    }

    const response = await axios.get(
      `${process.env.REQ_RES_BASE_URL}/api/users/${id}`,
    );
    const { data } = response.data;

    const avatarUrl = data.avatar;

    const responseUrl = await axios.get(avatarUrl, {
      responseType: 'arraybuffer',
    });
    console.log(responseUrl.data);
    const image64 = Buffer.from(responseUrl.data, 'binary').toString('base64');

    const buildImage = {
      userId: Number(id),
      image64,
    };

    const newImage = new this.imageModel(buildImage);
    await newImage.save();

    return buildImage;
  }

  async deleteAvatar(id: string): Promise<boolean> {
    const { deletedCount } = await this.imageModel
      .deleteOne({ userId: Number(id) })
      .exec();
    return deletedCount === 1;
  }
}
