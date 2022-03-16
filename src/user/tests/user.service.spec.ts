import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeMongoConnection,
  rootMongooseTestModule,
} from '../../test-utils/test.utils';

import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserSchema } from '../schema/user.schema';
import { UserService } from '../user.service';

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(), // in memory MongoDB server
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    module.useLogger(new Logger());

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create and return a new user', async () => {
    const mockUserDave: CreateUserDto = {
      firstName: 'Dave',
      lastName: 'Daverson',
      email: 'dave@aol.com',
      accountCreatedDate: new Date(),
    };

    const newUser = await userService.createUser(mockUserDave);

    expect(newUser).toMatchObject(mockUserDave);
    expect(newUser.companies).toEqual([]);
    expect(newUser.jobs).toEqual([]);
    expect(newUser._id != null);
    expect(typeof newUser._id === 'string');
  });

  it('should return all users', async () => {
    await userService.createUser(mockUserDave);
    await userService.createUser(mockUserBarb);
    await userService.createUser(mockUserBob);

    const userList = await userService.findAll();

    expect(userList.length).toEqual(3);
    expect(userList[0]).toMatchObject(mockUserDave);
    expect(userList[1]).toMatchObject(mockUserBarb);
    expect(userList[2]).toMatchObject(mockUserBob);
  });

  it('should find user by _id', async () => {
    const dave = await userService.createUser(mockUserDave);
    await userService.createUser(mockUserBarb);
    await userService.createUser(mockUserBob);

    const mongoGeneratedID = dave._id.toString();

    const daveFromDb = await userService.findOne(mongoGeneratedID);

    expect(daveFromDb).toMatchObject(mockUserDave);
    expect(daveFromDb.id).toEqual(mongoGeneratedID.valueOf());
  });

  it('should update User', async () => {
    const bob = await userService.createUser(mockUserBob);

    const updateParams: UpdateUserDto = {
      id: bob.id.toString(),
      phoneNumber: 5559874565,
    };

    const updatedUser = await userService.updateUser(updateParams);

    expect(updatedUser.phoneNumber).toEqual(5559874565);
  });

  it('should remove User', async () => {
    const dave = await userService.createUser(mockUserDave);
    await userService.createUser(mockUserBob);
    await userService.createUser(mockUserBarb);

    const totalUsers = await (await userService.findAll()).length;

    expect(totalUsers).toEqual(3);

    const deletedDave = await userService.deleteUser(dave.id.toString());
    const newTotal = await (await userService.findAll()).length;

    expect(deletedDave._id).toEqual(dave._id);
    expect(newTotal).toEqual(2);
  });

  it('should confirm if user exists', async () => {
    const barb = await userService.createUser(mockUserBarb);

    const barbExists = await userService.userExists(barb.email);
    const doIExist = await userService.userExists('idontexist@aol.com');

    expect(barbExists).toEqual(true);
    expect(doIExist).toEqual(false);
  });

  it('should return results of query', async () => {
    const deb = await userService.createUser(mockUserDeb);

    const query = { firstName: 'Deb' };
    const result = await userService.query(query);

    expect(result[0]._id.toString()).toEqual(deb._id.toString());
  });

  afterEach(async () => {
    await closeMongoConnection();
  });
});

const mockUserDave: CreateUserDto = {
  firstName: 'Dave',
  lastName: 'Daverson',
  email: 'dave@aol.com',
  accountCreatedDate: new Date(),
};

const mockUserBarb: CreateUserDto = {
  firstName: 'Barb',
  lastName: 'Barberson',
  email: 'barb@aol.com',
  accountCreatedDate: new Date(),
};

const mockUserBob: CreateUserDto = {
  firstName: 'Bob',
  lastName: 'Boberson',
  email: 'bob@aol.com',
  accountCreatedDate: new Date(),
};

const mockUserDeb: CreateUserDto = {
  firstName: 'Deb',
  lastName: 'Debberrson',
  email: 'deb@aol.com',
  accountCreatedDate: new Date(),
};
