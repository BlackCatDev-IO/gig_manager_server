import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';

export class UserAlreadyExistsException extends ConflictException {
  constructor(email: string) {
    super();
    this.message = `An account with email ${email} already exists`;
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super();
    this.message = `No User Found`;
  }
}
