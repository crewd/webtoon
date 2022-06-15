import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "../components/AppLayout";
import Home from "./Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Home />
      </AppLayout>
    </QueryClientProvider>
  );
}

export default App;
