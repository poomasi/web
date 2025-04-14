import styled from '@emotion/styled'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { guide01, guide02, guide03 } from '@assets/images/landingPage'

const guideData = [
  {
    image: guide01,
    text: '1. 카카오톡으로 간편하게 로그인해요',
  },
  {
    image: guide02,
    text: '2. 관심 있는 분야의 품앗이꾼을 찾아요',
  },
  {
    image: guide03,
    text: '3. 도움이 필요한 내용을 자유롭게 질문해요',
  },
]

export const ModalContent = () => {
  return (
    <StyledSwiper spaceBetween={16} slidesPerView={1} pagination={{ clickable: true }}>
      {guideData.map((item, index) => (
        <SwiperSlide key={index}>
          <SlideWrapper>
            <KakaoImageWrapper>
              <img src={item.image} alt={`guide${index + 1}`} />
            </KakaoImageWrapper>
            <GuideText>{item.text}</GuideText>
          </SlideWrapper>
        </SwiperSlide>
      ))}
    </StyledSwiper>
  )
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  .swiper-pagination-bullet {
    background: #ccc;
  }
  .swiper-pagination-bullet-active {
    background: #3ecdba;
  }
`

const SlideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const KakaoImageWrapper = styled.div`
  background: #e9f8f7;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  img {
    width: 100%;
    height: auto;
  }
`

const GuideText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #333;
  text-align: center;
`
