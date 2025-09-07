"use client";

import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import React, { useState } from "react";

// src/components/books/bookListData.ts
export const bookListData = [
  {
    theme: "성장을 고민하는 모든 개발자를 위하여",
    books: [
      {
        title: "객체지향의 사실과 오해",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998139766.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001628109",
      },
      {
        title: "실용주의 프로그래머",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263363.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033128",
      },
      {
        title: "개발자가 반드시 정복해야 할 객체 지향과 디자인 패턴",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788969090010.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001062523",
      },
      {
        title: "해커와 화가",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788968480713.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001057496",
      },
      {
        title: "Clean Code(클린 코드)",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966260959.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001032980",
      },
      {
        title: "HTTP 완벽 가이드",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966261208.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033001",
      },
      {
        title: "클린 아키텍처: 소프트웨어 구조와 설계의 원칙",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966262472.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033082",
      },
    ],
  },
  {
    theme: "웹 프론트엔드의 정석",
    books: [
      {
        title: "모던 자바스크립트 Deep Dive",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158392239.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001766445",
      },
      {
        title: "You Don’t Know JS Yet",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791169211888.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000211817154",
      },
      {
        title: "이펙티브 타입스크립트",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263134.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033114",
      },
      {
        title: "우아한 타입스크립트 with 리액트",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791169211567.jpg",
        kyoboUrl:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791169211567.jpg",
      },
      {
        title: "프론트엔드 성능 최적화 가이드",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263745.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000200178292",
      },
      {
        title: "나는 네이버 프런트엔드 개발자입니다",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791192987118.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000201490012",
      },
      {
        title: "리액트를 다루는 기술",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791160508796.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001792882",
      },
    ],
  },
  {
    theme: "인프라, 아키텍처 그 사이 어딘가",
    books: [
      {
        title: "데이터 중심 애플리케이션 설계",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158390983.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001766328",
      },
      {
        title: "가상 면접 사례로 배우는 대규모 시스템 설계 기초",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966263158.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033116",
      },
      {
        title: "컴퓨터 밑바닥의 비밀",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791140708819.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000212650856",
      },
      {
        title: "Real MySQL 8.0 (1권)",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158392703.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001766482",
      },
      {
        title: "리눅스 그냥 재미로",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788984310469.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001306449",
      },
      {
        title: "이벤트 소싱과 마이크로서비스 아키텍처",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161758589.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000213805962",
      },
      {
        title: "시작하세요! 도커/쿠버네티스",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791158396169.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000216911094",
      },
    ],
  },
  {
    theme: "자바 스프링 공화국",
    books: [
      {
        title: "토비의 스프링 3.1 Vol 1: 스프링의 이해와 원리",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788960773417.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000000935358",
      },
      {
        title: "스프링 인 액션",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791190665186.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001942493",
      },
      {
        title: "이펙티브 자바",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966262281.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001033066",
      },
      {
        title: "개발자가 반드시 알아야 할 자바 성능 튜닝 이야기",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788966260928.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001032977",
      },
      {
        title: "스프링 입문을 위한 자바 객체 지향의 원리와 이해",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9788998139940.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001628116",
      },
      {
        title: "모던 자바 인 액션",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791162242025.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000001810171",
      },
      {
        title: "Kotlin in Action: 2/e",
        image:
          "https://contents.kyobobook.co.kr/sih/fit-in/458x0/pdt/9791161759692.jpg",
        kyoboUrl: "https://product.kyobobook.co.kr/detail/S000215768644",
      },
    ],
  },
];

function BookCard({
  title,
  image,
  rank,
  kyoboUrl,
}: {
  title: string;
  image: string;
  rank: number;
  kyoboUrl: string;
}) {
  const [hovered, setHovered] = useState(false);
  const showRank = rank <= 3;

  const handleClick = () => {
    window.open(kyoboUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <BookCardContainer
      hovered={hovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick} // ✅ 카드 클릭 시 링크 열림
    >
      <BookImageWrapper>
        <BookImage src={image} alt={title} hovered={hovered} />
        <BookOverlay hovered={hovered}>{title}</BookOverlay>
        {showRank && <RankBadge rank={rank}>{rank}위</RankBadge>}
      </BookImageWrapper>
    </BookCardContainer>
  );
}

function BookSection({ theme, books }: { theme: string; books: any[] }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <SectionTitle>{theme}</SectionTitle>
      <BookScrollRow className="custom-scrollbar book-scroll-row">
        {books.map((book, idx) => (
          <BookCard key={idx} {...book} rank={idx + 1} />
        ))}
      </BookScrollRow>
    </section>
  );
}

export default function BooksPage() {
  return (
    <>
      <Global
        styles={css`
          .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #3ecdba #eee;
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 10px;
            background: #eee;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #3ecdba 0%, #3ecdba 100%);
            border-radius: 8px;
          }
        `}
      />
      <Container>
        <PageContainer>
          <PageContent>
            <PageContentTitle>품앗이 테마별 추천도서 BEST 7</PageContentTitle>

            {bookListData.map((section) => (
              <BookSection key={section.theme} {...section} />
            ))}
          </PageContent>
        </PageContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 30px;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 5% 0 5%;
`;

const PageContent = styled.div`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto 50px auto;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const PageContentTitle = styled.div`
  width: 100%;
  max-width: 1320px;
  font-size: 2rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto 50px auto;

  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const BookCardContainer = styled.div<{ hovered: boolean }>`
  width: 200px;
  min-width: 200px;
  height: 300px;
  margin-right: 20px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition:
    transform 0.18s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.18s;
  cursor: pointer;
  align-items: center;
  justify-items: center;
  z-index: ${(props) => (props.hovered ? 2 : 1)};

  @media (max-width: 600px) {
    height: 250px;
    width: 160px;
    min-width: 160px;
    margin-right: 16px;
  }
`;

const BookImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BookImage = styled.img<{ hovered: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition:
    border-radius 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) => (props.hovered ? "scale(1.08)" : "scale(1.01)")};
`;

const BookOverlay = styled.div<{ hovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.hovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)"};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.hovered ? 1 : 0)};
  transition:
    background 0.2s,
    opacity 0.2s;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: 1px;
  text-align: center;
  padding: 16px;
  pointer-events: none;
  word-break: keep-all;
  overflow-wrap: break-word;
  white-space: normal;
  box-sizing: border-box;

  @media (max-width: 600px) {
    font-size: 16px;
    padding: 12px;
  }
`;

const RankBadge = styled.div<{ rank: number }>`
  position: absolute;
  top: 14px;
  left: 14px;
  background: ${(props) => {
    const colors = [
      "linear-gradient(90deg, #FFD700 0%, #FFB300 100%)", // 1위: 금색
      "linear-gradient(90deg, #C0C0C0 0%, #B0B0B0 100%)", // 2위: 은색
      "linear-gradient(90deg, #CD7F32 0%, #B87333 100%)", // 3위: 동색
    ];
    return (
      colors[props.rank - 1] ||
      "linear-gradient(90deg, #FFD700 0%, #FFB300 100%)"
    );
  }};
  color: #fff;
  border-radius: 999px;
  padding: 7px 18px;
  font-weight: 800;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  z-index: 2;
  letter-spacing: 1px;
  border: 2px solid #fff2;
  text-shadow: 0 1px 4px #0006;

  @media (max-width: 600px) {
    top: 10px;
    left: 10px;
    padding: 5px 12px;
    font-size: 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 20px;
  color: #181818;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 8px #0001;
  padding-left: 4px;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const BookScrollRow = styled.div`
  display: flex;
  overflow-x: auto;
  min-width: 100%;
  white-space: nowrap;
  padding: 18px 24px 12px 24px;
  scrollbar-width: thin;
  background:
    linear-gradient(135deg, #e2c9a0 0%, #c9a063 100%),
    url('data:image/svg+xml;utf8,<svg width="800" height="120" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="120" fill="none"/><ellipse cx="100" cy="60" rx="60" ry="18" fill="%23e2c9a0" opacity="0.18"/><ellipse cx="300" cy="80" rx="40" ry="12" fill="%23bfa06a" opacity="0.13"/><ellipse cx="600" cy="50" rx="70" ry="20" fill="%23fff" opacity="0.07"/><ellipse cx="700" cy="90" rx="30" ry="8" fill="%23bfa06a" opacity="0.10"/><path d="M0 100 Q200 120 400 100 T800 100 V120 H0Z" fill="%23c9a063"/><path d="M0 110 Q200 130 400 110 T800 110" stroke="%23bfa06a" stroke-width="2" fill="none" opacity="0.25"/><path d="M40 20 Q80 40 120 20 T200 30 T300 10 T400 40 T800 20" stroke="%23bfa06a" stroke-width="1.5" fill="none" opacity="0.18"/><circle cx="180" cy="60" r="2.5" fill="%23bfa06a" opacity="0.18"/><circle cx="420" cy="80" r="1.5" fill="%23bfa06a" opacity="0.13"/><circle cx="650" cy="70" r="2" fill="%23fff" opacity="0.10"/></svg>'),
    url('data:image/svg+xml;utf8,<svg width="800" height="120" viewBox="0 0 800 120" fill="none" xmlns="http://www.w3.org/2000/svg"><filter id="n" x="0" y="0" width="800" height="120"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="t"/><feColorMatrix type="saturate" values="0.2"/><feComponentTransfer><feFuncA type="linear" slope="0.04"/></feComponentTransfer></filter><rect width="800" height="120" fill="%23fff" opacity="0"/><rect width="800" height="120" filter="url(%23n)"/></svg>');
  background-repeat: repeat-x;
  background-size: auto 100%;
  box-shadow:
    0 14px 0 0 #bfa06a,
    0 22px 32px 0 #bfa06a55,
    0 0px 32px 0 #fff6 inset;
  border-bottom: 10px solid #a67c38;
  border-radius: 22px;

  @media (max-width: 600px) {
    padding: 14px 20px 10px 20px;
    border-radius: 18px;
    border-bottom: 8px solid #a67c38;
  }
`;
