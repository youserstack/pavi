"use client";

import { CheckCircle2Icon, LoaderIcon, MoreVerticalIcon, TrendingUpIcon } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import DragHandle from "@/components/table/drag-handle";
import { chartConfig, chartData } from "@/data/dashboard";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { tableRowSchema } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const columns: ColumnDef<z.infer<typeof tableRowSchema>>[] = [
  {
    // 드래그 핸들 (순서 변경용)
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    // 체크박스 (row 선택용)
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    // 헤더 컬럼 (Sheet 열기용 링크 포함)
    accessorKey: "header",
    header: "제목",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  },
  {
    // 섹션 타입 뱃지
    accessorKey: "type",
    header: "유형",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    // 상태 뱃지 (완료: 체크 아이콘 / 그 외: 로딩 아이콘)
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => (
      <Badge variant="outline" className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3">
        {row.original.status === "완료" ? (
          <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
        ) : (
          <LoaderIcon />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    // 목표값 입력 필드 (인라인 폼)
    accessorKey: "target",
    header: () => <div className="w-full text-right">목표</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "완료",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          목표
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  {
    // 제한값 입력 필드 (인라인 폼)
    accessorKey: "limit",
    header: () => <div className="w-full text-right">한도</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "완료",
            error: "Error",
          });
        }}
      >
        <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
          한도
        </Label>
        <Input
          className="h-8 w-16 border-transparent bg-transparent text-right shadow-none hover:bg-input/30 focus-visible:border focus-visible:bg-background"
          defaultValue={row.original.limit}
          id={`${row.original.id}-limit`}
        />
      </form>
    ),
  },
  {
    // 검토자 지정 (없을 경우 셀렉트 표시)
    accessorKey: "reviewer",
    header: "검토자",
    cell: ({ row }) => {
      // 검토자 지정된 경우
      if (row.original.reviewer) return row.original.reviewer;
      // 검토자 미지정된 경우
      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            검토자
          </Label>
          <Select>
            <SelectTrigger className="h-8 w-40" id={`${row.original.id}-reviewer`}>
              <SelectValue placeholder="검토자 지정" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="이유진">이유진</SelectItem>
              <SelectItem value="강현수">강현수</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    },
  },
  {
    // 드롭다운 메뉴 (Edit, Copy, Delete 등)
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
            size="icon"
          >
            <MoreVerticalIcon />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>수정</DropdownMenuItem>
          <DropdownMenuItem>사본 만들기</DropdownMenuItem>
          <DropdownMenuItem>즐겨찾기</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>삭제</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Header 셀을 클릭했을 때 우측 Sheet 열기
function TableCellViewer({ item }: { item: z.infer<typeof tableRowSchema> }) {
  const isMobile = useIsMobile();

  return (
    <Sheet>
      <SheetTrigger className="☑️SheetTrigger" asChild>
        <Button variant="link" className="w-fit px-0 text-left text-foreground">
          {item.header}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col p-6">
        <SheetHeader className="gap-1 p-0">
          <SheetTitle>{item.header}</SheetTitle>
          <SheetDescription>최근 6개월간 총 방문자 수 표시</SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
          {/* PC에서만 그래프 + 설명 노출 */}
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart accessibilityLayer data={chartData} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />

              <div className="grid gap-2">
                <div className="flex gap-2 font-medium leading-none">
                  이번 달 5.2% 상승 <TrendingUpIcon className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  최근 6개월간 총 방문자 수를 표시합니다. 이 문장은 레이아웃을 테스트하기 위한
                  임의의 텍스트입니다. 여러 줄로 구성되어 있으며 줄바꿈되어야 합니다.
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* 편집용 폼 */}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">한글</Label>
              <Input id="header" defaultValue={item.header} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">유형</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="목차">목차</SelectItem>
                    <SelectItem value="요약본">요약본</SelectItem>
                    <SelectItem value="기술 접근">기술 접근</SelectItem>
                    <SelectItem value="디자인">디자인</SelectItem>
                    <SelectItem value="역량">역량</SelectItem>
                    <SelectItem value="핵심 문서">핵심 문서</SelectItem>
                    <SelectItem value="서술문">서술문</SelectItem>
                    <SelectItem value="표지">표지</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="status">상태</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="상태를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="완료">완료</SelectItem>
                    <SelectItem value="진행중">진행중</SelectItem>
                    <SelectItem value="미정">미정</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">목표</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">한도</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">검토자</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="검토자를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="이유진">이유진</SelectItem>
                  <SelectItem value="강현수">강현수</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>

        <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0  p-0">
          <Button className="w-full">수정</Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              완료
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
