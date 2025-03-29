export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
}