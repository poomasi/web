"use client";

import { DetailPageContextProvider } from "@hooks/qnaPage/provider/DetailPageProvider.tsx";

interface QnaPageProviderProps {
  children: React.ReactNode;
}

export function QnaPageProvider({ children }: QnaPageProviderProps) {
  return <DetailPageContextProvider>{children}</DetailPageContextProvider>;
}
