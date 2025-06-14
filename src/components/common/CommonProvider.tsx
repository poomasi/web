"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { globalTheme } from "@styles/global-theme.ts";
import { ThemeProvider } from "@mui/material";
import { GlobalStyle } from "@styles/GlobalStyle.tsx";
import { Toast } from "@components/toast/Toast.tsx";
import { useEffect } from "react";
import { useMobileStore } from "@store/useMobileStore.ts";

interface CommonLayoutProps {
  children: React.ReactNode;
}

export function CommonProvider({ children }: CommonLayoutProps) {
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

  const { setIsMobile } = useMobileStore();
  const sizeCheckEvent = () => {
    setIsMobile(window.innerWidth <= 1024);
  };

  useEffect(() => {
    sizeCheckEvent();
    window.addEventListener("resize", sizeCheckEvent);

    return () => {
      window.removeEventListener("resize", sizeCheckEvent);
    };
  }, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        {children}
        <Toast />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
