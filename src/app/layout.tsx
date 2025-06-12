"use client";

import { Footer } from "@components/common/Footer/Footer";
import { Header } from "@components/common/Header/Header";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log("Query Error Details:", {
        error,
        queryKey: query.queryKey,
        queryHash: query.queryHash,
        state: query.state,
      });
    },
  }),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; //타입명시
}) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Footer />
      </body>
    </html>
  );
}
