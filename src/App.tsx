import React from "react";
import QueryProvider from "./providers/QueryProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes";
import ErrorModal from "@components/ErrorModal";
import LoadingModal from "@components/LoadingModal";

const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
      <ErrorModal />
      <LoadingModal />
    </QueryProvider>
  );
};

export default App;
