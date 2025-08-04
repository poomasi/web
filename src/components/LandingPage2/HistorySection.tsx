import { useEffect, useState } from "react";

//@todo 추후 타입 리팩토링 필요
type ApiRes = {
  mentor: number;
  mentor_field: number;
  normal: number;
  qna: number;
};

export function HistorySection() {
  const [apiRes, setApiRes] = useState<null | ApiRes>(null);

  // @todo: 추후 customAxios로 변경 필요
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.poomasi.kr/activity-stats");

      const data: { data: ApiRes } = await res.json();
      setApiRes(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full h-[985px] bg-[#fcfcfc] flex justify-center items-center flex-col gap-[200px]">
      <div className={"flex justify-between w-[1464px]"}>
        <p
          className={
            "text-[50px] font-bold text-left text-black " + "w-[574px] "
          }
        >
          경험을 나누고, 함께 성장하는
          <br />
          우리는 품앗이에요.
        </p>
        <p className="text-2xl text-left text-[#595959]">
          “누구에게나 배울 점이 있다”라는 생각으로 시작했어요.조금 앞서 걸어간
          <br />
          선배들과 그 뒤를 따라 걷게 될 후배들 모두 품앗이를 통해 연결될 수
          있기를
          <br />
          바라요.
        </p>
      </div>
      <div className="w-[1464px] h-[202px] flex justify-between">
        <HistoryCount count={apiRes?.mentor ?? 0} addText={"번의 품을"} />
        <HistoryCount
          count={apiRes?.mentor_field ?? 0}
          addText={"명의 새싹님들과"}
        />
        <HistoryCount count={apiRes?.normal ?? 0} addText={"개의 분야에서"} />
        <HistoryCount count={apiRes?.qna ?? 0} addText={"명의 품앗이꾼과"} />
      </div>
    </div>
  );
}

function HistoryCount({ count, addText }: { count: number; addText: string }) {
  return (
    <div>
      <p className="text-[136px] font-medium text-center text-black">
        {count}+
      </p>
      <p className="text-2xl text-center text-[#595959]">{count + addText}</p>
    </div>
  );
}
