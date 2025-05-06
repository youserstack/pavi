"use client";

import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DraggableRow from "@/components/table/draggable-row"; // 드래그 가능한 테이블 row
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"; // 드래그 방향 제한
import { columns } from "@/components/table/columns"; // 테이블 열 정의
import { useId, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { tableRowSchema } from "@/lib/schemas";
import { z } from "zod";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ColumnsIcon,
  PlusIcon,
} from "lucide-react";

// dnd-kit: 드래그앤드롭 관련 설정
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";

// tanstack/react-table: 테이블 구성 관련 유틸 및 훅
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

// 드롭다운, 셀렉트 박스, 테이블 UI 컴포넌트
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({ data: initialData }: { data: z.infer<typeof tableRowSchema>[] }) {
  // 테이블 상태 관리
  const [data, setData] = useState(() => initialData); // 행 데이터
  const [rowSelection, setRowSelection] = useState({}); // 선택된 행
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); // 열 표시 여부
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // 필터 상태
  const [sorting, setSorting] = useState<SortingState>([]); // 정렬 상태
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 }); // 페이지네이션 상태

  const sortableId = useId(); // 드래그 컨텍스트 구분용 고유 ID

  // 드래그 센서 설정 (마우스, 터치, 키보드)
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  // 데이터에서 각 row의 고유 id 리스트 생성
  const dataIds = useMemo<UniqueIdentifier[]>(() => data?.map(({ id }) => id) || [], [data]);

  // 테이블 설정
  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination },
    getRowId: (row) => row.id.toString(), // 각 row의 고유 ID
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(), // 기본 행 모델
    getFilteredRowModel: getFilteredRowModel(), // 필터링된 행
    getPaginationRowModel: getPaginationRowModel(), // 페이지네이션 처리된 행
    getSortedRowModel: getSortedRowModel(), // 정렬된 행
    getFacetedRowModel: getFacetedRowModel(), // 집계된 row model
    getFacetedUniqueValues: getFacetedUniqueValues(), // 유니크 값
  });

  // 드래그 종료 시 실행되는 함수
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      // 드래그된 row의 위치를 변경
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex); // 순서 변경
      });
    }
  }

  return (
    <Tabs defaultValue="outline" className="☑️DataTable flex w-full flex-col justify-start gap-6">
      {/* 테이블 상단 위젯: 탭 버튼과 테이블 옵션 버튼 */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          보기 선택
        </Label>

        {/* 모바일: 탭 셀렉터 버튼 */}
        <Select defaultValue="outline">
          <SelectTrigger className="@4xl/main:hidden flex w-fit" id="view-selector">
            <SelectValue placeholder="보기를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">메인탭</SelectItem>
            <SelectItem value="tab-1">탭1</SelectItem>
            <SelectItem value="tab-2">탭2</SelectItem>
            <SelectItem value="tab-3">탭3</SelectItem>
          </SelectContent>
        </Select>

        {/* 데스크탑: 탭 버튼 */}
        <TabsList className="@4xl/main:flex hidden">
          <TabsTrigger value="outline">메인탭</TabsTrigger>
          <TabsTrigger value="tab-1" className="gap-1">
            탭1
            {/* <Badge variant="secondary">14</Badge> */}
          </TabsTrigger>
          <TabsTrigger value="tab-2" className="gap-1">
            탭2
            {/* <Badge variant="secondary">14</Badge> */}
          </TabsTrigger>
          <TabsTrigger value="tab-3" className="gap-1">
            탭3
            {/* <Badge variant="secondary">14</Badge> */}
          </TabsTrigger>
        </TabsList>

        {/* 기타 테이블 옵션 버튼 */}
        <div className="flex items-center gap-2">
          {/* 드랍다운 메뉴 */}
          <DropdownMenu>
            {/* 드랍다운 트리거 버튼 */}
            <DropdownMenuTrigger asChild className="/border-orange-500">
              <Button variant="outline" size="sm">
                <ColumnsIcon />
                <span className="hidden lg:inline">열 설정</span>
                <span className="lg:hidden">열</span>
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>

            {/* 드랍다운 메뉴 */}
            <DropdownMenuContent align="end" className="w-56 /border-orange-500">
              {/* 토글할 수 있는 열 목록만 필터링하여 표시 */}
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" && // accessorFn이 있는 열만 (즉, 실제 데이터에 접근 가능한 열)
                    column.getCanHide() // 숨길 수 있는 열만 (숨김 가능 설정된 열)
                )
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id} // React의 key는 리스트에서 각 아이템을 구분하기 위함
                    checked={column.getIsVisible()} // 현재 열이 보이는 상태인지 확인
                    onCheckedChange={(value) => column.toggleVisibility(!!value)} // 체크 상태가 변경되면 열 가시성 토글
                  >
                    {column.id === "type" && "유형"}
                    {column.id === "status" && "상태"}
                    {column.id === "target" && "목표"}
                    {column.id === "limit" && "한도"}
                    {column.id === "reviewer" && "검토자"}
                    {/* 열의 ID를 표시 (보통은 사용자 친화적 텍스트로 대체하는 게 좋음) */}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 섹션 추가 버튼 (기능 미구현 상태) */}
          <Button variant="outline" size="sm">
            <PlusIcon />
            <span className="hidden lg:inline">섹션 추가</span>
          </Button>
        </div>
      </div>

      {/* 테이블 탭 컨텐트: outline(메인탭) 탭 */}
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          {/* 드래그 컨텍스트: 테이블 전체를 감쌈 */}
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              {/* 테이블 헤더 */}
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              {/* 테이블 본문 (드래그 가능한 row 사용) */}
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      결과가 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between px-4">
          {/* 선택된 행 개수 */}
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            총 {table.getFilteredSelectedRowModel().rows.length}개 /{" "}
            {table.getFilteredRowModel().rows.length}개의 행이 선택됨
          </div>

          {/* 페이지 이동 및 행 수 조절 */}
          <div className="flex w-full items-center gap-8 lg:w-fit">
            {/* 페이지당 행 수 설정 */}
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page">페이지당 행 수</Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* 페이지 번호 표시 */}
            <div className="text-sm font-medium">
              {table.getState().pagination.pageIndex + 1}페이지 / 총 {table.getPageCount()}페이지
            </div>

            {/* 페이지 이동 버튼 */}
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <ChevronsLeftIcon />
              </Button>
              <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon />
              </Button>
              <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon />
              </Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* 다른 탭들 (과거 실적, 핵심 인력, 문서) - 현재는 빈 상태 */}
      <TabsContent value="tab-1" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="tab-2" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="tab-3" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
