import React from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { MatchesProvider } from "./context/matches/context";
import { NewsProvider } from "./context/news/context";
import { SportProvider } from ".//context/sport/context";
import { TeamProvider } from "./context/teams/context";

function App() {
  return (
    <div className="h-screen w-full mx-auto py-2">
      <MatchesProvider>
        <NewsProvider>
          <SportProvider>
            <TeamProvider>
              <RouterProvider router={router} />
            </TeamProvider>
          </SportProvider>
        </NewsProvider>
      </MatchesProvider>
    </div>
  );
}

export default App;
