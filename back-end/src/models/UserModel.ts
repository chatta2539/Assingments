export class User {
  public readonly id?: string;
  public readonly username: string;
  public readonly password: string;

  constructor(username: string, password: string, id?: string) {
    this.username = username;
    this.password = password;
    this.id = id;
  }
}