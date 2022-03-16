import { Test, TestingModule } from '@nestjs/testing';
import {
  NoQueryResultsException,
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../../error-handling/custom-exceptions';
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

    updateUser: jest.fn((updateUserDto) => ({
      ...updateUserDto,
    })),

    findAll: jest.fn(() => ({
      userList,
    })),

    userExists: jest.fn((email: string) => {
      for (const user of userList) {
        if (user.email === email) {
          return true;
        }
      }

      return false;
    }),

    findOne: jest.fn((id: string) => {
      for (const user of userList) {
        if (user.id === id) {
          return user;
        }
      }
      return null;
    }),

    deleteUser: jest.fn((id: string) => {
      return {
        id: id,
        ...createUserDto,
      };
    }),
    query: jest.fn((query: any) => {
      if (query.firstName === 'Bob') {
        return user1;
      } else {
        return null;
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
      accountCreatedDate: new Date(),
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

  it('should create a user and throw an exception if user already exists', async () => {
    const user = await controller.createUser(createUserDto);
    expect(user).toEqual({
      id: '123',
      ...createUserDto,
    });

    userList.push(user);

    expect(mockUserService.createUser).toHaveBeenCalledWith(createUserDto);

    expect(async () => {
      await controller.createUser(createUserDto);
    }).rejects.toThrow(UserAlreadyExistsException);
  });

  it('should return true if user exists', async () => {
    expect(await controller.checkIfUserExists('dave@gmail.com')).toEqual(true);
    expect(await controller.checkIfUserExists('bob@gmail.com')).toEqual(true);
    expect(await controller.checkIfUserExists('idontexist@aol.com')).toEqual(
      false,
    );

    expect(mockUserService.userExists).toHaveBeenCalled();
  });

  it('should find one user by id and throw exception if not', async () => {
    expect(await controller.findOneUser('1')).toEqual(user1);
    expect(mockUserService.findOne).toHaveBeenCalledWith('1');

    expect(async () => {
      await controller.findOneUser('nope');
    }).rejects.toThrow(UserNotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDTO: UpdateUserDto = createUserDto as UpdateUserDto;
    updateUserDTO.id = '123';
    updateUserDTO.rate = 70;

    const updatedUser = await controller.updateUser(
      updateUserDTO.id,
      updateUserDTO,
    );

    expect(updatedUser).toEqual({
      id: '123',
      firstName: 'nunya',
      lastName: 'bizzness',
      email: 'nunyabizzness@gmail.com',
      phoneNumber: null,
      rate: 70,
      accountCreatedDate: updateUserDTO.accountCreatedDate,
    });

    expect(async () => {
      await controller.findOneUser('nope');
    }).rejects.toThrow(UserNotFoundException);

    expect(mockUserService.updateUser).toHaveBeenCalledWith(updateUserDTO);
  });

  it('should delete one user by id and return deleted user', async () => {
    const newUser = await mockUserService.createUser(createUserDto);
    userList.push(newUser);

    const deletedUser = await controller.deleteUser(newUser.id);

    expect(mockUserService.deleteUser).toHaveBeenCalledWith(newUser.id);
    expect(deletedUser).toEqual(newUser);

    expect(async () => {
      await controller.findOneUser('nope');
    }).rejects.toThrow(UserNotFoundException);
  });

  it('should return results of userService.query or throw exception if no results', async () => {
    const query = { firstName: 'Bob' };

    const result = await controller.query(query);

    expect(result).toEqual(user1);

    expect(mockUserService.query).toHaveBeenCalledWith(query);

    const badQuery = { firstName: 'nope' };

    expect(async () => {
      await controller.query(badQuery);
    }).rejects.toThrow(NoQueryResultsException);
  });
});
