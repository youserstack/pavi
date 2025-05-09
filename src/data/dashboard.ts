import { ChartConfig } from "@/components/ui/chart";

export const chartData = [
  { month: "1월", desktop: 186, mobile: 80 },
  { month: "2월", desktop: 305, mobile: 200 },
  { month: "3월", desktop: 237, mobile: 120 },
  { month: "4월", desktop: 73, mobile: 190 },
  { month: "5월", desktop: 209, mobile: 130 },
  { month: "6월", desktop: 214, mobile: 140 },
];

export const chartConfig = {
  desktop: { label: "데스크탑", color: "var(--primary)" },
  mobile: { label: "모바일", color: "var(--primary)" },
} satisfies ChartConfig;
