import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { NewsProvider } from "./context/news/context";

function App() {
  return (
    <div className="h-screen w-full mx-auto py-2">
      <MatchesProvider>
        <NewsProvider>
          <RouterProvider router={router} />
        </NewsProvider>
      </MatchesProvider>
    </div>
  );
}

export default App;
