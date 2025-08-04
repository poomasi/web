export function UsingGuideSection() {
  const introCardDataList = [
    {
      index: 1,
      content: `카카오 계정으로 간단히 로그인하면\n서비스를 바로 이용할 수 있어요.`,
    },
    {
      index: 2,
      content: `관심있는 품앗이꾼을 찾아주세요.\n언제든지 멘토에게 질문할 수 있어요.`,
    },
    {
      index: 3,
      content: `도움이 필요한 내용을 자유롭게 질문하고,\n깊이 이야기하며 답을 찾아가요.`,
    },
  ];

  return (
    <div className="w-full h-[1259px] overflow-hidden bg-white flex justify-center items-center">
      <div
        className={"h-full w-[1460px] flex flex-col justify-center gap-[110px]"}
      >
        <p className="text-[50px] font-bold text-left text-black">
          <span className="text-[50px] font-bold text-left text-black">
            품앗이 이용방법,{" "}
          </span>
          <br />
          <span className="text-[50px] font-bold text-left text-black">
            어렵지 않아요!
          </span>
        </p>
        <div className={"flex justify-between items-center "}>
          {introCardDataList.map((data) => (
            <UsingGuideCard
              key={data.index}
              index={data.index}
              content={data.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function UsingGuideCard({
  index,
  content,
}: {
  index: number;
  content: string;
}) {
  return (
    <div className="w-[470px] h-[550px] overflow-hidden rounded-[40px] bg-neutral-100 flex flex-col">
      <div className="w-[470px] h-[366px] bg-[#d9d9d9] text-[50px] font-bold text-left text-black flex justify-center items-center">
        TBD
      </div>
      <div className={"p-[28px] flex flex-col"}>
        <p className="text-xl font-bold text-left text-black">STEP 01</p>
        <p className="text-2xl text-left text-[#595959] whitespace-pre-line">
          {content}
        </p>
      </div>
    </div>
  );
}
