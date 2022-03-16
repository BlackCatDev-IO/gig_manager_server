export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: number;
  accountCreatedDate: Date;
  rate?: number;
}
