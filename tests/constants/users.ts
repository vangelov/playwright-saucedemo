
export type User = {
  username: string;
  password: string;
};

export const USERS: Record<string, User> = {
  LOCKED_OUT: {
      username: 'locked_out_user',
      password: 'secret_sauce',
  },
  NON_EXISTING: {
      username: 'asdf',
      password: '123',
  },
  STANDARD: {
      username: 'standard_user',
      password: 'secret_sauce',
  },
};