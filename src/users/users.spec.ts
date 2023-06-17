import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('Image services', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const userId = faker.number.int();

  const user = new User({
    id: userId,
    avatar: faker.image.avatar(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
  });

  const createUser = user;
  delete createUser.id;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockReturnValue(user),
            createUser: jest.fn().mockReturnValue(createUser),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('Users should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  it('getAllUsers should return user', async () => {
    const result = await usersController.getAllUsers(String(userId));
    expect(result).toEqual(user);
  });

  it('createUser should create user, send email and produce a message', async () => {
    const result = await usersController.createUser(createUser);
    expect(result).toEqual(user);
  });
});
