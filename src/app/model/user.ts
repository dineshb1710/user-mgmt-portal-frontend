export class User {

  public id: number;
  public userId: string;
  public firstName: string;
  public lastName: string;
  public username: string;
  public password: string;
  public email: string;
  public profileImageUrl: string;

  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joiningDate: Date;

  public role: string;
  public authorities: [];

  public isActive: boolean;
  public isLocked: boolean;

  constructor() {
    this.firstName = '';
    this.lastName = '';
    this.username = '';
    this.email = '';
    this.isActive = false;
    this.isLocked = false;
    this.password = '';
    this.authorities = [];
  }
}
