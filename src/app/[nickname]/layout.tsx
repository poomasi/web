import { QnaPageProvider } from "@qnaPage/QnaPageProvider.tsx";

function QnaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QnaPageProvider>{children}</QnaPageProvider>
    </>
  );
}

export default QnaLayout;
