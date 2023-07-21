import React from 'react'
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { MatchesProvider } from './context/matches/context';

function App() {

  return (
    <div className="h-screen w-full mx-auto py-2">
      <MatchesProvider>
        <RouterProvider router={router} />
      </MatchesProvider>
    </div>
  )
}

export default App
