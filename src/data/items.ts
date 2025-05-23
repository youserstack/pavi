export const categoryItems = [
  {
    id: "1",
    name: "상의",
    children: [
      {
        id: "1",
        name: "반소매 티셔츠",
        children: [
          { id: "001001001", name: "라운드 티셔츠" },
          { id: "001001002", name: "브이넥 티셔츠" },
        ],
      },
      {
        id: "2",
        name: "셔츠/블라우스",
        children: [
          { id: "001002001", name: "스트라이프 셔츠" },
          { id: "001002002", name: "옥스퍼드 셔츠" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "아우터",
    children: [
      {
        id: "1",
        name: "블루종/MA-1",
        children: [],
      },
      {
        id: "2",
        name: "레더/라이더스 재킷",
        children: [],
      },
    ],
  },
  {
    id: "3",
    name: "바지",
    children: [
      {
        id: "1",
        name: "데님 팬츠",
        children: [],
      },
      {
        id: "2",
        name: "슬랙스",
        children: [],
      },
    ],
  },
  {
    id: "4",
    name: "신발",
    children: [
      {
        id: "1",
        name: "운동화",
        children: [
          { id: "1", name: "러닝화" },
          { id: "2", name: "코트화" },
        ],
      },
      {
        id: "2",
        name: "부츠",
        children: [
          { id: "1", name: "첼시 부츠" },
          { id: "2", name: "워커" },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "악세서리",
    children: [
      {
        id: "1",
        name: "모자",
        children: [
          { id: "1", name: "캡" },
          { id: "2", name: "비니" },
        ],
      },
      {
        id: "2",
        name: "가방",
        children: [
          { id: "1", name: "백팩" },
          { id: "2", name: "크로스백" },
        ],
      },
    ],
  },
];

const brandItems = [
  {
    id: "1",
    name: "상의",
    children: [
      {
        id: "1",
        name: "반소매 티셔츠",
        children: [
          { id: "001001001", name: "라운드 티셔츠" },
          { id: "001001002", name: "브이넥 티셔츠" },
        ],
      },
      {
        id: "2",
        name: "셔츠/블라우스",
        children: [
          { id: "001002001", name: "스트라이프 셔츠" },
          { id: "001002002", name: "옥스퍼드 셔츠" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "아우터",
    children: [
      {
        id: "1",
        name: "블루종/MA-1",
        children: [],
      },
      {
        id: "2",
        name: "레더/라이더스 재킷",
        children: [],
      },
    ],
  },
];

const eventItems = [
  //
  { id: "1", name: "이벤트" },
];

export const navItems = [
  //
  { id: "1", name: "카테고리", children: categoryItems },
  { id: "2", name: "브랜드", children: brandItems },
  { id: "3", name: "이벤트", children: eventItems },
];
