
export class User{
  private static increment: number = 0;
  id: number ;

  name: string;

  email: string;

  charge?: string | null;

  isAdmin?: boolean | null;

  password: string;

  constructor(
    name: string,
    email: string,
    password: string,
    charge?: string | null,
    isAdmin?: boolean | null
  ) {
    this.id = User.increment;
    this.name = name;
    this.email = email;
    this.charge = charge ?? null;
    this.password = password;
    this.isAdmin = isAdmin ?? null;
    User.increment ++;

  }
}
