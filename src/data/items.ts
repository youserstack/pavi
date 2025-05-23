// 레벨1
export const categoryItems = [
  {
    id: "tops",
    name: "상의",
    // 레벨2
    children: [
      { id: "round-neck", name: "라운드 티셔츠" },
      { id: "v-neck", name: "브이넥 티셔츠" },
      { id: "short-sleeve-shirts", name: "반소매 티셔츠" },
      { id: "striped-shirt", name: "스트라이프 셔츠" },
      { id: "oxford-shirt", name: "옥스퍼드 셔츠" },
      { id: "shirts-blouses", name: "셔츠/블라우스" },
    ],
  },
  {
    id: "outerwear",
    name: "아우터",
    children: [
      { id: "ma-1", name: "블루종/MA-1", children: [] },
      { id: "leather-jacket", name: "레더/라이더스 재킷", children: [] },
    ],
  },
  {
    id: "pants",
    name: "바지",
    children: [
      { id: "denim", name: "데님 팬츠", children: [] },
      { id: "slacks", name: "슬랙스", children: [] },
    ],
  },
  {
    id: "shoes",
    name: "신발",
    children: [
      {
        id: "sneakers",
        name: "운동화",
        children: [
          { id: "running", name: "러닝화" },
          { id: "court", name: "코트화" },
        ],
      },
      {
        id: "boots",
        name: "부츠",
        children: [
          { id: "chelsea", name: "첼시 부츠" },
          { id: "walker", name: "워커" },
        ],
      },
    ],
  },
  {
    id: "accessories",
    name: "악세서리",
    children: [
      {
        id: "hats",
        name: "모자",
        children: [
          { id: "cap", name: "캡" },
          { id: "beanie", name: "비니" },
        ],
      },
      {
        id: "bags",
        name: "가방",
        children: [
          { id: "backpack", name: "백팩" },
          { id: "crossbag", name: "크로스백" },
        ],
      },
    ],
  },
];

// 레벨1
export const brandItems = [
  { id: "all", name: "전체" },
  { id: "nike", name: "나이키" },
  { id: "adidas", name: "아디다스" },
  { id: "newblance", name: "뉴발란스" },
  { id: "converse", name: "컨버스" },
  { id: "puma", name: "푸마" },
  { id: "reebok", name: "리복" },
  { id: "fila", name: "휠라" },
];

export const eventItems = [{ id: "all", name: "전체 이벤트" }];

export const recommendItems = [
  { id: "today", name: "오늘의 추천" },
  { id: "style", name: "스타일 추천" },
  { id: "personal", name: "개인화 추천" },
];

export const rankingItems = [
  { id: "overall", name: "전체 랭킹" },
  { id: "category", name: "카테고리별 랭킹" },
  { id: "new", name: "신상품 랭킹" },
];

export const saleItems = [
  { id: "all", name: "전체 세일" },
  { id: "hot", name: "HOT 세일" },
  {
    id: "time-deal",
    name: "타임딜",
    children: [{ id: "test", name: "테스트", children: [] }],
  },
];

type MenuItem = {
  id: string;
  name: string;
  children?: MenuItem[];
};

export const navItems: MenuItem[] = [
  { id: "category", name: "카테고리", children: categoryItems },
  { id: "brand", name: "브랜드", children: brandItems },
  { id: "event", name: "이벤트", children: eventItems },
  { id: "recommend", name: "추천", children: recommendItems },
  { id: "ranking", name: "랭킹", children: rankingItems },
  { id: "sale", name: "세일", children: saleItems },
];
