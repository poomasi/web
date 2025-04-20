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
}

export function ModalGuide({ type, contents, content }: ModalProps) {
  if (type === 'swiper' && contents) {
    return (
      <ModalReference>
        <ModalReference.Header onClickClose={() => {}} />
        <ModalReference.Body>
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
    <ModalReference>
      <ModalReference.Header onClickClose={() => {}} />
      <ModalReference.Body>
        <Text>{content}</Text>
      </ModalReference.Body>
    </ModalReference>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 340px;
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

  @media (max-width: 480px) {
    width: 85%;
  }
`

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #4e5053;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`

/*const TextWrapper = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
`*/
