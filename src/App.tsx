import React from "react";
import QueryProvider from "./providers/QueryProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes";
import ErrorModal from "@components/ErrorModal";

const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
      <ErrorModal />
    </QueryProvider>
  );
};

export default App;
