import { useEffect, useRef, useState } from 'react'

export function useSwiper(totalItems: number) {
  const swiperRef = useRef<HTMLDivElement>(null) //실제로 스크롤이 가능한 DOM 요소, 이 코드가 실행되고 나면 scrollRef.current는 <div>...</div> 그 요소 자체가 된다.
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const updateTotalPageNumber = () => {
    const swiperElement = swiperRef.current
    if (!swiperElement) return

    const swiperElementWidth = swiperElement.offsetWidth //화면너비
    const swiperWidth = swiperElement.scrollWidth //전체 콘텐츠 의 총 너비 ex)품앗이꾼 리스트

    const pages = Math.ceil(swiperWidth / swiperElementWidth) // 스와이프할 전체 페이지 수
    setTotalPages(pages)
  }

  const updatePageNationNumber = () => {
    const swiperElement = swiperRef.current
    if (!swiperElement) return

    const swiperLeft = swiperElement.scrollLeft
    const swiperElementWidth = swiperElement.offsetWidth
    const page = Math.round(swiperLeft / swiperElementWidth) + 1
    setCurrentPage(page) //페이지네이션에 표기되는 페이지번호
  }

  useEffect(() => {
    const swiperElement = swiperRef.current
    if (!swiperElement) return

    swiperElement.addEventListener('scroll', updatePageNationNumber)
    window.addEventListener('resize', updateTotalPageNumber)

    updateTotalPageNumber() //초기 페이지 수 계산

    return () => {
      swiperElement.removeEventListener('scroll', updatePageNationNumber)
      window.removeEventListener('resize', updateTotalPageNumber)
    } //초기화
  }, [totalItems, swiperRef])

  return { swiperRef, currentPage, totalPages }
}
