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
        ...createUserDto,
      };
    }),

    update: jest.fn((id, updateUserDto) => ({
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

  it('should create a user', () => {
    expect(controller.createUser(createUserDto)).toEqual({
      firstName: 'nunya',
      lastName: 'bizzness',
      email: 'nunyabizzness@gmail.com',
      phoneNumber: null,
      rate: 60,
    });

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should find all users', () => {
    expect(controller.findAllUsers()).toEqual({ userList });

    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should return true if user exists', () => {
    expect(controller.checkIfUserExists('dave@gmail.com')).toEqual(true);
    expect(controller.checkIfUserExists('bob@gmail.com')).toEqual(true);
    expect(controller.checkIfUserExists('idontexist@aol.com')).toEqual(false);

    expect(mockUserService.userExists).toHaveBeenCalled();
  });

  it('should find one user by id', () => {
    expect(controller.findOneUser('1')).toEqual(user1);
    expect(mockUserService.findOne).toHaveBeenCalledWith('1');
  });

  it('should update a user', () => {
    const updateUserDTO: UpdateUserDto = createUserDto as UpdateUserDto;
    updateUserDTO.id = '1234';
    updateUserDTO.rate = 70;

    expect(controller.updateUser(updateUserDTO.id, updateUserDTO)).toEqual({
      id: '1234',
      firstName: 'nunya',
      lastName: 'bizzness',
      email: 'nunyabizzness@gmail.com',
      phoneNumber: null,
      rate: 70,
    });

    expect(mockUserService.update).toHaveBeenCalledWith(
      updateUserDTO.id,
      updateUserDTO,
    );
  });

  it('should delete one user by id and return deleted user', () => {
    expect(controller.remove('1')).toEqual(user1);
    expect(mockUserService.remove).toHaveBeenCalledWith('1');
  });
});
