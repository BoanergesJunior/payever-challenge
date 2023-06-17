import { ImagesController } from './images.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { faker } from '@faker-js/faker';
import { Image } from './schemas/image.schema';

describe('Image services', () => {
  let imagesController: ImagesController;
  let imagesService: ImagesService;

  const userId = faker.number.int();

  const userAvatar = new Image({ userId, image64: faker.image.avatar() });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useValue: {
            getAvatar: jest.fn().mockResolvedValue(userAvatar),
            deleteAvatar: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    imagesController = module.get<ImagesController>(ImagesController);
    imagesService = module.get<ImagesService>(ImagesService);
  });

  it('Images should be defined', () => {
    expect(imagesController).toBeDefined();
    expect(imagesService).toBeDefined();
  });

  it('getAvatar should return userId and image64 successfully', async () => {
    const result = await imagesController.getAvatar(String(userId));
    expect(result).toEqual(userAvatar);
    expect(imagesService.getAvatar).toHaveBeenCalledTimes(1);
  });

  it('deleteAvatar should delete the image with the userId', async () => {
    const result = await imagesController.deleteAvatar(String(userId));
    expect(result).toEqual(true);
  });

  it('deleteAvatar should not delete the image with userId and must return false', async () => {
    const randomId = faker.number.int();

    jest.spyOn(imagesService, 'deleteAvatar').mockResolvedValueOnce(false);
    const result = await imagesController.deleteAvatar(String(randomId));

    expect(result).toEqual(false);
  });
});
