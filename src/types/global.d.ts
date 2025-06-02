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

type ColorId =
  | "white"
  | "ivory"
  | "beige"
  | "oatmeal"
  | "camel"
  | "sand"
  | "black"
  | "gray"
  | "darkgray"
  | "pink"
  | "lightpink"
  | "darkpink"
  | "rosegold"
  | "lavender"
  | "red"
  | "burgundy"
  | "lightyellow"
  | "orange"
  | "peach"
  | "darkorange"
  | "lime"
  | "lightgreen"
  | "green"
  | "darkgreen"
  | "mint"
  | "olivegreen"
  | "khaki"
  | "skyblue"
  | "blue"
  | "navy"
  | "darknavy"
  | "lightbrown"
  | "brown"
  | "darkbrown";
