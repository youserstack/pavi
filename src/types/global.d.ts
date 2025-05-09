type InitialState = {
  validationError?: {
    email?: string[] | undefined;
    name?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  signupError?: string;
};

type Product = {
  _id: string;
  productId: string;
  productType: string;
  price: number;
  title: string;
  image: string;
  brand: string;
  maker: string;
  seller: string;
  description: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string | null;
};
