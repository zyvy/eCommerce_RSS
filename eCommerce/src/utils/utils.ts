export const isEmailValid = (email: string) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
  return regex.test(email);
};

export const isPasswordValid = (password: string) => {
  console.log(password);
  const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(.+)$/;
  return regex.test(password);
};
