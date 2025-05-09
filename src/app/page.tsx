import { CarouselSize } from "@/components/carousel-size";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <section>
        <CarouselSize />
      </section>

      <section className="hidden">
        <div
          className="relative overflow-hidden 
          before:absolute 
          before:top-0 before:start-1/2 
          before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] 
          before:grayscale
          dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')] 
          darK:before:invert
          before:bg-no-repeat 
          before:bg-top 
          before:size-full 
          before:-z-1 
          before:transform 
          before:-translate-x-1/2"
        >
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
            {/* 배너 */}
            <div className="flex justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-x-2 p-2 px-3 rounded-full transition text-xs
                border focus:outline-hidden 
                bg-white border-gray-200  text-gray-600 
                hover:border-gray-300 focus:border-gray-300 
                dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 
                dark:hover:border-neutral-600 dark:focus:border-neutral-600"
              >
                인기 상품 모아보기
                <span className="flex items-center gap-x-1 text-blue-600 dark:text-blue-500">
                  <span className="border-s ps-2 border-gray-200 dark:border-neutral-700">
                    지금 확인
                  </span>
                  <ChevronRight />
                </span>
              </a>
            </div>

            {/* 제목 */}
            <div className="mt-5 max-w-xl text-center mx-auto">
              <h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl text-gray-800 dark:text-neutral-200">
                지금 가장 인기 있는 쇼핑, 여기서 시작하세요
              </h1>
            </div>

            {/* 설명 */}
            <div className="mt-5 max-w-3xl text-center mx-auto">
              <p className="text-lg text-gray-600 dark:text-neutral-400">
                수천 개의 상품을 한눈에! 믿고 살 수 있는 종합 쇼핑 플랫폼, 지금 둘러보세요.
              </p>
            </div>

            {/* 버튼 */}
            <div className="mt-8 gap-3 flex justify-center">
              {/* <a
                href="#"
                className="inline-flex justify-center items-center gap-x-3 py-3 px-6
                text-sm text-center font-medium text-white
                border border-transparent rounded-full
                bg-linear-to-tl from-blue-600 to-violet-600
                shadow-lg shadow-transparent hover:shadow-blue-700/50 focus:shadow-blue-700/50
                focus:outline-hidden
                "
              >
                시작하기
                <ChevronRight className="size-4" />
              </a> */}

              <a
                href="#"
                className="inline-flex justify-center items-center gap-x-3 py-3 px-6
                text-sm text-center font-medium text-white
                /border /border-transparent rounded-full
                bg-linear-to-br from-amber-500 to-orange-500
                shadow-lg shadow-transparent hover:shadow-amber-400/50 focus:shadow-amber-400/50
                focus:outline-hidden
                "
              >
                시작하기
                <ChevronRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
