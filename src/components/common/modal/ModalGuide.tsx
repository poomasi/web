import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import ModalReference from "@components/common/modal/ModalReference.tsx";
import { modalData } from "@components/common/modal/modalGuide-data";
<<<<<<< HEAD

// dynamic import (SSR 비활성화)
//Swiper 관련 모듈을 초기 번들에서 제거하고, 클라이언트 측에서만 로드되도록 최적화
const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false },
);

type GuideModalProps = {
  type: keyof typeof modalData;
  // title: string;
  // content: string | { image: StaticImageData; text: string }[];
  onClose: () => void;
=======
import type { StaticImageData } from "next/image";
import NextImage from "next/image";
import { useEffect } from "react";

// dynamic import (SSR 비활성화)
const SlickSlider = dynamic(
	() => import("react-slick").then((mod) => mod.default),
	{
		ssr: false,
	}
);

type GuideModalProps = {
	type: keyof typeof modalData; //MobileInstructions 등등
	onClose: () => void;
>>>>>>> next.js
};

const sliderSettings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
};

export function ModalGuide({ onClose, type }: GuideModalProps) {
<<<<<<< HEAD
  const modal = modalData[type];

  if (!modal) return null;

  // 모바일: 스와이프
  if (modal.type === "swiper") {
    return (
      <ModalReference onClick={onClose}>
        <ModalReference.Header onClickClose={onClose} />
        <ModalReference.Body>
          <BodyPadding>
            <ModalTitle>{modal.title}</ModalTitle>
            <StyledSwiper
              spaceBetween={16}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
            >
              {Array.isArray(modal.content) &&
                modal.content.map((item, i) => (
                  <SwiperSlide key={i}>
                    <Slide>
                      <Image
                        src={item.image.src}
                        alt={`guide-step-${i + 1}`}
                        width={240}
                        height={180}
                        style={{
                          width: "70%",
                          maxWidth: "240px",
                          height: "auto",
                          marginBottom: "1rem",
                          borderRadius: "16px",
                        }}
                      />
                      <Text>{item.text}</Text>
                    </Slide>
                  </SwiperSlide>
                ))}
            </StyledSwiper>
          </BodyPadding>
        </ModalReference.Body>
      </ModalReference>
    );
  }

  // 텍스트 전용 (모바일/웹 공통)
  // if (type === "Guideline" || type === "DetailGuide") {
  if (modal.type === "text") {
    const textContent = modal.content as string;
=======
	useEffect(() => {
		// 모달이 열릴 때
		document.body.style.overflow = "hidden";
		return () => {
			// 모달이 닫힐 때
			document.body.style.overflow = "auto";
		};
	}, []);
	//swiper 등등
	const modal = modalData[type];
	console.log("modal.type:", modal.type);
	console.log("modal:", modal);

	// console.log("🔥 모달 타입 확인:", modal.type);

	// Swiper가 실제로 mount된 후 update를 보장

	// 모바일: 스와이프
	if (modal.type === "swiper") {
		return (
			<ModalReference onClick={onClose}>
				<ModalReference.Header onClickClose={onClose} />
				<ModalReference.Body>
					<BodyPadding>
						<ModalTitle>{modal.title}</ModalTitle>
						<div style={{ width: 320, height: 320, margin: "0 auto" }}>
							<SlickSlider {...sliderSettings}>
								{Array.isArray(modal.content) &&
									modal.content.map((item, i) => (
										<div key={i}>
											<Slide>
												<NextImage
													src={item.image}
													alt={`guide-step-${i + 1}`}
													width={240}
													height={180}
													style={{
														width: "100%",
														height: "180px",
														objectFit: "contain",
														borderRadius: "16px",
													}}
												/>
												<Text>{item.text}</Text>
											</Slide>
										</div>
									))}
							</SlickSlider>
						</div>
					</BodyPadding>
				</ModalReference.Body>
			</ModalReference>
		);
	}
>>>>>>> next.js

    return (
      <ModalReference onClick={onClose}>
        <ModalReference.Header onClickClose={onClose} />
        <ModalReference.Body>
          <BodyPadding>
            <ModalTitle>{modal.title}</ModalTitle>
            <GuideInfoText>{textContent}</GuideInfoText>
          </BodyPadding>
        </ModalReference.Body>
      </ModalReference>
    );
  }

  return null;
}

const ModalTitle = styled.h4`
<<<<<<< HEAD
  color: #0e0e0e;
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 54px */
  margin-bottom: 16px;
  @media (max-width: 1024px) {
    font-size: 1.125rem;
    font-weight: 700;
    text-align: center;
    padding: 5px;
  }
`;

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
`;

const Slide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-height: 200px;
`;

const Image = styled.img`
  width: 70%;
  max-width: 240px;
  height: auto;
  margin-bottom: 1rem;

  @media (max-width: 1024px) {
    width: 100%;
  }
=======
	color: #0e0e0e;
	text-align: center;
	font-size: 32px;
	font-style: normal;
	font-weight: 700;
	line-height: 150%; /* 54px */
	margin-bottom: 16px;
	@media (max-width: 1024px) {
		font-size: 1.125rem;
		font-weight: 700;
		text-align: center;
		padding: 5px;
	}
`;

const Slide = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	height: 100%;
	gap: 1rem;
	background: transparent;
>>>>>>> next.js
`;

const Text = styled.p`
  font-size: 16px;
  text-align: center;
  line-height: 1.5;
  color: #28292a;

  @media (max-width: 1024px) {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
`;

const GuideList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 14px;
  margin: 0;
  padding-bottom: 60px;

  @media (max-width: 1320px) {
    padding-bottom: 30px;
  }
`;

const GuideItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  gap: 24px;
`;

const GuideText = styled.div`
  color: #4e5053;

  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */

  @media (max-width: 1320px) {
    font-size: 14px;
    font-weight: 700;
  }
`;
const GuideInfoText = styled.div`
  font-size: 1.375rem;
  text-align: center;
  color: #333;
  padding: 2rem;
  border-radius: 16px;
  background: #f7f7f7;
  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;

const BodyPadding = styled.div`
<<<<<<< HEAD
  padding: 1rem 2rem;
=======
	padding: 1rem 2rem;
	height: 100%;
	box-sizing: border-box;
>>>>>>> next.js
`;
