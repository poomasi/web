import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
// import 'swiper/css/pagination'
import 'swiper/swiper-bundle.css'
import styled from '@emotion/styled'
import ModalReference from '@components/modal/ModalReference.tsx'

type ModalProps = {
  type: 'swiper' | 'text'
  contents?: { image: string; text: string }[]
  content?: string
  onClose: () => void
  title: string
}

export function ModalGuide({ type, contents, content, onClose, title }: ModalProps) {
  if (type === 'swiper' && contents) {
    return (
      <ModalReference onClick={onClose}>
        <ModalReference.Header onClickClose={onClose} />
        <ModalReference.Body>
          <ModalTitle>{title}</ModalTitle>
          <StyledSwiper spaceBetween={16} slidesPerView={1} modules={[Pagination]} pagination={{ clickable: true }}>
            {contents.map((item, index) => (
              <SwiperSlide key={index}>
                <Slide>
                  <Image src={item.image} alt={`guide-step-${index + 1}`} />
                  <Text>{item.text}</Text>
                </Slide>
              </SwiperSlide>
            ))}
          </StyledSwiper>
        </ModalReference.Body>
      </ModalReference>
    )
  }

  return (
    <ModalReference onClick={onClose}>
      <ModalReference.Header onClickClose={onClose} />
      <ModalReference.Body>
        <ModalTitle>{title}</ModalTitle>
        <TextDeco>{content}</TextDeco>
      </ModalReference.Body>
    </ModalReference>
  )
}

const ModalTitle = styled.h4`
  @media (max-width: 767px) {
    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;
    padding: 5px;
  }
`

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 280px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;

  .swiper-pagination {
    bottom: -1%;
  }

  .swiper-pagination-bullet {
    background-color: #eaebed;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: #3ecdbc;
  }
`

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

const Image = styled.img`
  width: 70%;
  max-width: 240px;
  height: auto;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #28292a;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`
const TextDeco = styled.p`
  @media (max-width: 767px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
    background-color: #f7f7f7;
    border-radius: 20px;
    padding: 2rem;
    line-height: 160%;
  }
`
