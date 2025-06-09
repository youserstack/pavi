import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // 사용되지 않는 변수는 오류 대신 경고 처리
      // "@typescript-eslint/no-explicit-any": "warn", // 'any' 타입 사용을 경고로 변경
      "react-hooks/exhaustive-deps": "warn", // useEffect 의존성 문제도 경고로 변경
      "react/no-unescaped-entities": "off", // 따옴표 관련 ESLint 오류 해제
    },
  },
];

export default eslintConfig;
