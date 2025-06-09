import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import 'swiper/css/pagination'
import "swiper/swiper-bundle.css";
import styled from "@emotion/styled";
import ModalReference from "@components/common/modal/ModalReference.tsx";
import { modalData } from "@components/common/modal/modalGuide-data";

type GuideContent = { image: StaticImageData; text: string };

// type ModalProps =
// 	| {
// 			type: "swiper";
// 			content: GuideContent[];
// 			onClose: () => void;
// 			title: string;
// 	  }
// 	| {
// 			type: "web-text";
// 			content: GuideContent[];
// 			onClose: () => void;
// 			title: string;
// 	  }
// 	| {
// 			type: "text";
// 			content: string;
// 			onClose: () => void;
// 			title: string;
// 	  };
type GuideModalProps = {
	modalKey: keyof typeof modalData;
	onClose: () => void;
	isMobile: boolean; // 모바일 환경 여부 prop
};

export function ModalGuide({ modalKey, onClose, isMobile }: GuideModalProps) {
	const modal = modalData[modalKey];

	// 모바일: 스와이프
	if (modal.type === "swiper" && isMobile) {
		return (
			<ModalReference onClick={onClose}>
				<ModalReference.Header onClickClose={onClose} />
				<ModalReference.Body>
					<ModalTitle>{modal.title}</ModalTitle>
					<StyledSwiper
						spaceBetween={16}
						slidesPerView={1}
						modules={[Pagination]}
						pagination={{ clickable: true }}>
						{modal.content.map((item, i) => (
							<SwiperSlide key={i}>
								<Slide>
									<NextImage
										src={item.image}
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
				</ModalReference.Body>
			</ModalReference>
		);
	}

	// 웹: 이미지 그리드
	if (modal.type === "web-text" && !isMobile) {
		return (
			<ModalReference onClick={onClose}>
				<ModalReference.Header onClickClose={onClose} />
				<ModalReference.Body>
					<ModalTitle>{modal.title}</ModalTitle>
					<GuideList>
						{modal.content.map((item, i) => (
							<GuideItem key={i}>
								<GuideImg
									src={item.image}
									alt=""
								/>
								<GuideText>{item.text}</GuideText>
							</GuideItem>
						))}
					</GuideList>
				</ModalReference.Body>
			</ModalReference>
		);
	}

	// 텍스트 전용 (모바일/웹 공통)
	if (modal.type === "text") {
		return (
			<ModalReference onClick={onClose}>
				<ModalReference.Header onClickClose={onClose} />
				<ModalReference.Body>
					<ModalTitle>{modal.title}</ModalTitle>
					<GuideInfoText>{modal.content}</GuideInfoText>
				</ModalReference.Body>
			</ModalReference>
		);
	}

	// 예외: fallback 처리
	return null;

	// if (type === "swiper" && content) {
	// 	return (
	// 		<ModalReference onClick={onClose}>
	// 			<ModalReference.Header onClickClose={onClose} />
	// 			<ModalReference.Body>
	// 				<ModalTitle>{title}</ModalTitle>
	// 				<StyledSwiper
	// 					spaceBetween={16}
	// 					slidesPerView={1}
	// 					modules={[Pagination]}
	// 					pagination={{ clickable: true }}>
	// 					{content.map((item, index) => (
	// 						<SwiperSlide key={index}>
	// 							<Slide>
	// 								<Image
	// 									src={item.image}
	// 									alt={`guide-step-${index + 1}`}
	// 								/>
	// 								<Text>{item.text}</Text>
	// 							</Slide>
	// 						</SwiperSlide>
	// 					))}
	// 				</StyledSwiper>
	// 			</ModalReference.Body>
	// 		</ModalReference>
	// 	);
	// }

	// return (
	// 	<ModalReference onClick={onClose}>
	// 		<ModalReference.Header onClickClose={onClose} />
	// 		<ModalReference.Body>
	// 			<ModalTitle>{title}</ModalTitle>
	// 			<TextDeco>{content}</TextDeco>
	// 		</ModalReference.Body>
	// 	</ModalReference>
	// );
}

const ModalTitle = styled.h4`
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
`;

const Image = styled.img`
	width: 70%;
	max-width: 240px;
	height: auto;
	margin-bottom: 1rem;

	@media (max-width: 1024px) {
		width: 100%;
	}
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
const TextDeco = styled.p`
	@media (max-width: 1024px) {
		font-size: 0.875rem;
		margin-bottom: 1rem;
		margin-top: 1rem;
		background-color: #f7f7f7;
		border-radius: 20px;
		padding: 2rem;
		line-height: 160%;
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

const GuideImg = styled.img`
	width: 322px;
	height: 246px;
	border-radius: 16px;

	@media (max-width: 1320px) {
		width: 246px;
		height: 186px;
	}
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
