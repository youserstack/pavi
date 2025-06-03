export const brandOptions = [
  { value: "nike", label: "나이키" },
  { value: "adidas", label: "아디다스" },
  { value: "newbalance", label: "뉴발란스" },
  { value: "puma", label: "퓨마" },
  { value: "reebok", label: "리복" },
];

export const sizeOptions = [
  { value: "x-small", label: "XS" },
  { value: "small", label: "S" },
  { value: "medium", label: "M" },
  { value: "large", label: "L" },
  { value: "x-large", label: "XL" },
  { value: "2x-large", label: "2XL" },
  { value: "3x-large", label: "3XL" },
];

export const priceOptions = [
  { value: "0-1", label: "1만원 이하" },
  { value: "1-3", label: "1만원 ~ 3만원" },
  { value: "3-10", label: "3만원 ~ 10만원" },
  { value: "10-*", label: "10만원 이상" },
  //
];

export const productTypeOptions = [
  { value: "soldout", label: "품절" },
  { value: "free-shipping", label: "무료배송" },
];

export const colorOptions = [
  // 화이트 / 아이보리 / 베이지 계열
  { value: "white", label: "화이트" },
  { value: "ivory", label: "아이보리" },
  { value: "beige", label: "베이지" },
  { value: "oatmeal", label: "오트밀" },
  { value: "camel", label: "카멜" },
  { value: "sand", label: "샌드" },

  // 블랙 / 그레이 계열
  { value: "black", label: "블랙" },
  { value: "gray", label: "그레이" },
  { value: "darkgray", label: "다크그레이" },

  // 핑크 / 퍼플 계열
  { value: "pink", label: "핑크" },
  { value: "lightpink", label: "라이트핑크" },
  { value: "darkpink", label: "다크핑크" },
  { value: "rosegold", label: "로즈골드" },
  { value: "lavender", label: "라벤더" },

  // 레드 계열
  { value: "red", label: "레드" },
  { value: "burgundy", label: "버건디" },

  // 오렌지 / 옐로우 계열
  { value: "lightyellow", label: "라이트옐로우" },
  { value: "orange", label: "오렌지" },
  { value: "peach", label: "피치" },
  { value: "darkorange", label: "다크오렌지" },

  // 그린 계열
  { value: "lime", label: "라임" },
  { value: "lightgreen", label: "라이트그린" },
  { value: "green", label: "그린" },
  { value: "darkgreen", label: "다크그린" },
  { value: "mint", label: "민트" },
  { value: "olivegreen", label: "올리브그린" },
  { value: "khaki", label: "카키" },

  // 블루 계열
  { value: "skyblue", label: "스카이블루" },
  { value: "blue", label: "블루" },
  { value: "navy", label: "네이비" },
  { value: "darknavy", label: "다크네이비" },

  // 브라운 계열
  { value: "lightbrown", label: "라이트브라운" },
  { value: "brown", label: "브라운" },
  { value: "darkbrown", label: "다크브라운" },
];

export const bgColorMap: Record<string, string> = {
  // 화이트/아이보리/베이지 계열
  white: "bg-white",
  ivory: "bg-neutral-100",
  beige: "bg-neutral-200",
  oatmeal: "bg-stone-200",
  camel: "bg-amber-500",
  sand: "bg-yellow-100",

  // 블랙/그레이 계열
  black: "bg-black",
  gray: "bg-gray-400",
  darkgray: "bg-gray-700",

  // 핑크/보라 계열
  pink: "bg-pink-500",
  lightpink: "bg-pink-200",
  darkpink: "bg-pink-700",
  rosegold: "bg-rose-400",
  lavender: "bg-purple-200",

  // 레드 계열
  red: "bg-red-500",
  burgundy: "bg-red-900",

  // 오렌지/노랑 계열
  lightyellow: "bg-yellow-200",
  orange: "bg-orange-500",
  peach: "bg-orange-200",
  darkorange: "bg-orange-700",

  // 그린 계열
  lime: "bg-lime-400",
  lightgreen: "bg-green-300",
  green: "bg-green-500",
  darkgreen: "bg-green-900",
  mint: "bg-teal-200",
  olivegreen: "bg-lime-800",
  khaki: "bg-amber-800",

  // 블루 계열
  skyblue: "bg-sky-300",
  blue: "bg-blue-500",
  navy: "bg-blue-900",
  darknavy: "bg-blue-950",

  // 브라운 계열
  lightbrown: "bg-amber-300",
  brown: "bg-stone-700",
  darkbrown: "bg-stone-900",
};

export const bgLightColors = ["white", "ivory", "beige", "oatmeal", "camel", "sand", "lightyellow"];
