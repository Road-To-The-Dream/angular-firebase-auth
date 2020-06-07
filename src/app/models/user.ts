export class User {
  id: number;
  name: string;
  email: string;

  setUser(user) {
    this.name = user.displayName;
    this.email = user.email;
  }
}
