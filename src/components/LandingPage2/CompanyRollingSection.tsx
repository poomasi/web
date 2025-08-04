import { useEffect, useState } from "react";
import NextImage from "next/image";

type ApiRes = {
  id: number;
  url: string;
};

export function CompanyRollingSection() {
  const [apiRes, setApiRes] = useState<null | ApiRes>(null);

  // @todo: 추후 customAxios로 변경 필요
  const fetchData = async () => {
    try {
      const res = await fetch("https://api.poomasi.kr/tech-urls");

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
    <div className="w-full h-[348px] flex justify-center items-center">
      <div className="w-[1440px] relative opacity-1 overflow-auto">
        <div className="w-full flex animate-rolling_1 gap-[200px] h-[42px] absolute top-0 mt-10 overflow-hidden">
          {apiRes?.map((apiImage) => (
            <NextImage
              key={apiImage.id}
              src={apiImage.url}
              width={22}
              height={22}
              alt={"회사 로고"}
              className={"w-auto"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
