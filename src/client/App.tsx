import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "./utils/trpc";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { httpBatchLink } from "@trpc/client";
import { RouterProvider } from "react-router-dom";
import { reactRoutes } from "./utils/routes";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/trpc",
          async headers() {
            return {
              authorization: "YUm",
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={reactRoutes} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
