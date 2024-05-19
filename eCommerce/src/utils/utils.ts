export const isEmailValid = (email: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regex.test(email);
};

export const isPasswordValid = (password: string) => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
};

export const isUserLoggedIn = (): boolean => {
  const accessToken = localStorage.getItem('customer');
  return !!accessToken;
};

export enum PagePaths {
  Main = '/',
  Login = '/login',
  Register = '/registration',
  NotFound = '/404',
}
