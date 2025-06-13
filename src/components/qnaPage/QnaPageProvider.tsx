"use client";

import { DetailPageContextProvider } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";
import { useEffect, useState } from "react";

interface QnaPageProviderProps {
  children: React.ReactNode;
}

export function QnaPageProvider({ children }: QnaPageProviderProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <DetailPageContextProvider>{children}</DetailPageContextProvider>
  ) : null;
}
