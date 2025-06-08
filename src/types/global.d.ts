type Product = {
  id: number;
  name: string;
  link: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
};

type CategoryItem = {
  id: string;
  name: string;
  children?: CategoryItem[];
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
