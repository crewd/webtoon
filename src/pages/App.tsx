import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
