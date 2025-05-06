type InitialState = {
  validationError?: {
    email?: string[] | undefined;
    name?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  signupError?: string;
};
