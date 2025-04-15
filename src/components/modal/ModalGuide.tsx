import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import styled from '@emotion/styled'

type ModalProps = {
  type: 'swiper' | 'text'
  contents?: { image: string; text: string }[]
  content?: string
}

export function ModalGuide({ type, contents, content }: ModalProps) {
  if (type === 'swiper' && contents) {
    return (
      <StyledSwiper spaceBetween={16} slidesPerView={1} pagination={{ clickable: true }}>
        {contents.map((item, index) => (
          <SwiperSlide key={index}>
            <Slide>
              <Image src={item.image} alt={`guide-step-${index + 1}`} />
              <Text>{item.text}</Text>
            </Slide>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    )
  }

  return (
    <TextWrapper>
      <Text>{content}</Text>
    </TextWrapper>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 360px;
  margin: 0 auto;

  .swiper-pagination-bullet {
    background-color: #ccc;
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
  padding: 16px;
`

const Image = styled.img`
  width: 70%;
  max-width: 240px;
  height: auto;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    width: 85%;
  }
`

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #333;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`

const TextWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
`
