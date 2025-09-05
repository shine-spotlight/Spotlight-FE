import React from "react";
import QueryProvider from "./providers/QueryProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "@routes";

const App: React.FC = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
};

export default App;
