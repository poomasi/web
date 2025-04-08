import { useEffect, useRef, useState } from 'react'

export function useSwiper(totalItems: number) {
  const swiperRef = useRef<HTMLDivElement>(null) //실제로 스크롤이 가능한 DOM 요소, 이 코드가 실행되고 나면 scrollRef.current는 <div>...</div> 그 요소 자체가 된다.
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 3

  useEffect(() => {
    const swiperElement = swiperRef.current
    if (!swiperElement) return

    const updateTotalPageNumber = () => {
      const pages = Math.ceil(totalItems / itemsPerPage)
      setTotalPages(pages)
    }

    const updatePageNationNumber = () => {
      const swiperLeft = swiperElement.scrollLeft
      const containerWidth = swiperElement.offsetWidth
      const page = Math.round(swiperLeft / containerWidth) + 1
      setCurrentPage(page)
      console.log('containerWidth', containerWidth)
    }

    swiperElement.addEventListener('scroll', updatePageNationNumber)
    window.addEventListener('resize', updateTotalPageNumber)

    updateTotalPageNumber() //초기 페이지 수 계산

    return () => {
      swiperElement.removeEventListener('scroll', updatePageNationNumber)
      window.removeEventListener('resize', updateTotalPageNumber)
    } //초기화
  }, [totalItems])

  return { swiperRef, currentPage, totalPages }
}
