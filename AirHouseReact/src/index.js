import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contexts/ContextProvider";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Suspense } from "react";
import Loading from "./components/Loading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <GoogleOAuthProvider clientId={"226922731987-fis2kgm2cmj7h8l57bs4tds2ph2e702b.apps.googleusercontent.com"}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </ContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
