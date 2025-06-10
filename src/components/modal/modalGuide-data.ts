type SwiperModal = {
  title: string
  type: 'swiper'
  contents: { image: string; text: string }[]
}

type TextModal = {
  title: string
  type: 'text'
  content: string
}

type ModalInfoType = SwiperModal | TextModal

//Record<K, V>	키가 K이고, 값이 V인 객체
//'Sharing', 'Mentoring', 'Question' 이 세 개가 key가 되는 객체인데,각각의 값은 모두 ModalInfoType 타입

export const modalData: Record<'Sharing' | 'Mentoring' | 'Question', ModalInfoType> = {
  Sharing: {
    title: '이용방법',
    type: 'swiper',
    contents: [
      {
        image: '/landingPage/mobile-landing-guide01.png',
        text: '1. 카카오톡으로 간편하게 로그인해요',
      },
      {
        image: '/landingPage/mobile-landing-guide02.png',
        text: '2. 관심 있는 분야의 품앗이꾼을 찾아요',
      },
      {
        image: '/landingPage/mobile-landing-guide03.png',
        text: '3. 도움이 필요한 내용을 자유롭게 질문해요',
      },
    ],
  },
  Mentoring: {
    title: '품앗이 규칙',
    type: 'text',
    content: '품삯은 받고 있지 않아요. 대신 서로 돕고 마음을 나누는 따뜻한 공간이 될 수 있도록 과도한 질문은 자제 부탁드려요.',
  },
  Question: {
    title: '세부 안내',
    type: 'text',
    content: '품앗이꾼은 빠르게 답변드리기 위해 노력하고 있어요. 다만 일정에 따라 답변이 조금 늦어질 수 있는 점, 너그럽게 양해 부탁드려요 :D',
  },
}
