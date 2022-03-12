import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';

describe('UserController', () => {
  let controller: UserController;
  let createUserDto: CreateUserDto;
  let userList: User[];
  let user1: User;
  let user2: User;

  const mockUserService = {
    createUser: jest.fn((createUserDto) => {
      return {
        id: '123',
        ...createUserDto,
      };
    }),

    update: jest.fn((updateUserDto) => ({
      ...updateUserDto,
    })),

    findAll: jest.fn(() => ({
      userList,
    })),

    userExists: jest.fn((email: string) => {
      if (email === 'bob@gmail.com' || email === 'dave@gmail.com') {
        return true;
      } else {
        return false;
      }
    }),

    findOne: jest.fn((id: string) => {
      for (const user of userList) {
        if (user.id === id) {
          return user;
        }
      }
    }),

    remove: jest.fn((id: string) => {
      for (const user of userList) {
        if (user.id === id) {
          return user;
        }
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);

    createUserDto = {
      firstName: 'nunya',
      lastName: 'bizzness',
      email: 'nunyabizzness@gmail.com',
      phoneNumber: null,
      rate: 60,
    };

    user1 = {
      id: '1',
      firstName: 'bob',
      lastName: 'Boberson',
      email: 'bob@gmail.com',
    };

    user2 = {
      id: '2',
      firstName: 'Dave',
      lastName: 'Daverson',
      email: 'dave@gmail.com',
    };
    userList = [user1, user2];
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    expect(await controller.createUser(createUserDto)).toEqual({
      id: '123',
      ...createUserDto,
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should return true if user exists', async () => {
    expect(await controller.checkIfUserExists('dave@gmail.com')).toEqual(true);
    expect(await controller.checkIfUserExists('bob@gmail.com')).toEqual(true);
    expect(await controller.checkIfUserExists('idontexist@aol.com')).toEqual(
      false,
    );

    expect(mockUserService.userExists).toHaveBeenCalled();
  });

  it('should find one user by id', async () => {
    expect(await controller.findOneUser('1')).toEqual(user1);
    expect(mockUserService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', async () => {
    const updateUserDTO: UpdateUserDto = createUserDto as UpdateUserDto;
    updateUserDTO.id = '123';
    updateUserDTO.rate = 70;

    const update = await controller.updateUser(updateUserDTO.id, updateUserDTO);
    console.log(update);

    expect(
      await controller.updateUser(updateUserDTO.id, updateUserDTO),
    ).toEqual({
      id: '123',
      firstName: 'nunya',
      lastName: 'bizzness',
      email: 'nunyabizzness@gmail.com',
      phoneNumber: null,
      rate: 70,
    });

    expect(mockUserService.update).toHaveBeenCalledWith(updateUserDTO);
  });

  it('should delete one user by id and return deleted user', () => {
    expect(controller.remove('1')).toEqual(user1);
    expect(mockUserService.remove).toHaveBeenCalledWith('1');
  });
});
