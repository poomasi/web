"use client";

import styled from "@emotion/styled";
import { useParams, useRouter } from "next/navigation";
// import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccountStore } from "@store/index.ts";
import { useToastMessageStore } from "@toast";
import { useDetailPageContext } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";
// import { useMobileStore } from "@store/useMobileStore.ts";
import { isAxiosError } from "axios";

import { AccountType, RequestApi } from "@api/index.ts";

import { TeacherIntroduce } from "@components/qnaPage/mobile/TeacherIntroduce.tsx";
import { QuestionList } from "@components/qnaPage/mobile/QuestionList.tsx";
import { QuestionField } from "@qnaPage/mobile/QuestionField.tsx";

export function MobileQnaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.nickname as string;

  const { publicId, accountType } = useAccountStore();
  const { setErrorToastMessage } = useToastMessageStore();
  // const { isMobile } = useMobileStore();
  const { pageLoading, setTeacherAccount, setPageLoading, teacherAccount } =
    useDetailPageContext();

  const [isAnswerAuthority, setIsAnswerAuthority] = useState<boolean>(false);

  const handleError = (message: string) => {
    setErrorToastMessage(message);
    router.push("/");
  };

  // 품앗이꾼 데이터 가져오는 API
  const getTeacherData = async () => {
    if (!id) {
      handleError("잘못된 접근입니다.");
      return;
    }

    try {
      const res = await RequestApi.accounts.getAccount(id);
      setTeacherAccount(res.data);
      setPageLoading(true);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        handleError("로그인 토큰이 만료되었습니다. 다시 로그인 해주세요.");
      } else {
        handleError("품앗이꾼 정보를 가져오는 데 실패했습니다.");
      }
    }
  };

  useEffect(() => {
    if (!publicId) {
      handleError("로그인을 먼저 진행해주세요.");
      return;
    }

    scroll(0, 0);
    getTeacherData();
  }, [id]);

  useEffect(() => {
    if (teacherAccount) {
      setIsAnswerAuthority(
        teacherAccount.public_id === publicId &&
          accountType === AccountType.MENTOR,
      );
    }
  }, [teacherAccount]);

  return (
    <Container>
      <PageContainer>
        <PageContent>
          {!pageLoading ? (
            <>Loading...</>
          ) : (
            <>
              <TeacherIntroduce />

              <Seperator />

              {!isAnswerAuthority && <QuestionField />}

              <QuestionList />
            </>
          )}
        </PageContent>
      </PageContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding-top: 80px;

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
  /* background-color: pink; */
`;
const PageContent = styled.div`
  width: 1320px;
  margin-bottom: 50px;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
const Seperator = styled.div`
  height: 4px;
  width: 100%;
  border-top: 1px solid #eaebed;
  margin-top: 30px;

  @media (max-width: 1024px) {
    height: 1px;
    border-top: 1px solid #eaebed;
  }
`;
