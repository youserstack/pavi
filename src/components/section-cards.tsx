import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    title: "총 수익",
    value: "₩1,250.00",
    change: "+12.5%",
    trend: "이번 달 상승 추세",
    subtext: "최근 6개월 방문자 수",
    icon: <TrendingUpIcon className="size-4" />,
    badgeIcon: <TrendingUpIcon className="size-3" />,
    trendType: "up",
  },
  {
    title: "신규 고객",
    value: "1,234명",
    change: "-20%",
    trend: "이번 기간 20% 감소",
    subtext: "유입 경로 점검 필요",
    icon: <TrendingDownIcon className="size-4" />,
    badgeIcon: <TrendingDownIcon className="size-3" />,
    trendType: "down",
  },
  {
    title: "활성 계정",
    value: "45,678개",
    change: "+12.5%",
    trend: "높은 사용자 유지율",
    subtext: "목표 대비 높은 참여율",
    icon: <TrendingUpIcon className="size-4" />,
    badgeIcon: <TrendingUpIcon className="size-3" />,
    trendType: "up",
  },
  {
    title: "성장률",
    value: "4.5%",
    change: "+4.5%",
    trend: "안정적인 성과",
    subtext: "성장 목표 달성",
    icon: <TrendingUpIcon className="size-4" />,
    badgeIcon: <TrendingUpIcon className="size-3" />,
    trendType: "up",
  },
];

export function SectionCards() {
  return (
    <div
      className="☑️SectionCards
      grid grid-cols-1 gap-4 px-4 
      @xl/main:grid-cols-2 
      @5xl/main:grid-cols-4 
      *:data-[slot=card]:shadow-xs 
      *:data-[slot=card]:bg-gradient-to-t 
      *:data-[slot=card]:from-primary/5 
      *:data-[slot=card]:to-card 
      dark:*:data-[slot=card]:bg-card lg:px-6"
    >
      {items.map((item, index) => (
        <Card key={index} className="@container/card">
          <CardHeader className="relative">
            <CardDescription>{item.title}</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {item.value}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {item.badgeIcon}
                {item.change}
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {item.trend} {item.icon}
            </div>
            <div className="text-muted-foreground">{item.subtext}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
