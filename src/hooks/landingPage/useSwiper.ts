"use client";

import { useEffect, useRef, useState } from "react";

export function useSwiper(totalItems: number) {
  const swiperRef = useRef<HTMLDivElement>(null); //useRef를 특정 DOM 요소에 직접 연결
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const swiperElement = swiperRef.current;
    if (!swiperElement) return;
    // console.log('swiperRef.current:', swiperElement)

    const updateTotalPage = () => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPages);
      // console.log('totalPages:', totalPages)
    };

    const updatePageNation = () => {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      // const paddingLeft = parseFloat(getComputedStyle(swiperElement).paddingLeft)
      const swiperLeft = swiperElement.scrollLeft;
      const containerWidth = swiperElement.offsetWidth; //지금보이는 너비
      const scrollWidth = swiperElement.scrollWidth; // 전체 스크롤 가능한 너비
      const isAtLastPage =
        swiperLeft + containerWidth >= Math.floor(scrollWidth);

      const page = isAtLastPage
        ? totalPages
        : Math.round(swiperLeft / containerWidth) + 1;
      // console.log('page:', page)
      // console.log('isAtLastPage:', isAtLastPage)
      // console.log('totalPages:', totalPages)
      setCurrentPage(page);

      // console.log('swiperLeft', swiperLeft)
      // console.log('containerWidth', containerWidth)
      // console.log('scrollWidth', scrollWidth)
    };

    swiperElement.addEventListener("scroll", updatePageNation);
    window.addEventListener("resize", updateTotalPage);

    updateTotalPage(); //초기 페이지 수 계산

    return () => {
      swiperElement.removeEventListener("scroll", updatePageNation);
      window.removeEventListener("resize", updateTotalPage);
    }; //초기화
  }, [totalItems]);

  return { swiperRef, currentPage, totalPages };
}
